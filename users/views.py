from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, ProfileSerializer
from rest_framework.exceptions import AuthenticationFailed
import jwt
import re
import datetime
from django.contrib.auth.models import User
from .models import Profile, SavedPosts
from rest_framework.authtoken.views import Token
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# Password cheker function
def password_check(password):
    """
    Verify the strength of 'password'
    Returns a dict indicating the wrong criteria
    A password is considered strong if:
        8 characters length or more
        1 digit or more
        1 symbol or more
        1 uppercase letter or more
        1 lowercase letter or more
    """

    # calculating the length
    length_error = len(password) < 8

    # searching for digits
    digit_error = re.search(r"\d", password) is None

    # searching for uppercase
    uppercase_error = re.search(r"[A-Z]", password) is None

    # searching for lowercase
    lowercase_error = re.search(r"[a-z]", password) is None

    # searching for symbols
    symbol_error = re.search(r"[ !#$%&'()*+,-./[\\\]^_`{|}~"+r'"]', password) is None

    # overall result
    password_ok = not ( length_error or digit_error or uppercase_error or lowercase_error or symbol_error )

    return {
        'password_ok' : password_ok,
        'length_error' : length_error,
        'digit_error' : digit_error,
        'uppercase_error' : uppercase_error,
        'lowercase_error' : lowercase_error,
        'symbol_error' : symbol_error,
    }


# Custom Token
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Create your views here.
# Register view hwre
class RegisterView(APIView):
    def post(self, request):
        Password = request.data['password']
        
        try:
            if password_check(Password)["password_ok"]:
                user = User.objects.create(
                    email=request.data['email'],
                    username=request.data['username'],
                    password=make_password(Password)
                )
                Token.objects.create(user=user)
                return Response("sucess")
            elif password_check(Password)["length_error"]:
                return Response("length_error")
            elif password_check(Password)["digit_error"]:
                return Response("digit_error")
            elif password_check(Password)["uppercase_error"]:
                return Response("uppercase_error")
            elif password_check(Password)["lowercase_error"]:
                return Response("lowercase_error")
            elif password_check(Password)["symbol_error"]:
                return Response("symbol_error")
            else:
                return Response("not strong enough password")

        except Exception as e:
            return Response(str(e))


# Login view hwre
class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(username=email).first()
        token_ = Token.objects.filter(user=user).first()
        print(user.password)
        print(user)
        if user is None:
            raise AuthenticationFailed('User not found!')

        if user.password != password:
            raise AuthenticationFailed('Incorrect password!!!!!!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256').decode('utf-8')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.set_cookie(key='user_cookie', value=token_, httponly=True)
        response.data = {
            'jwt': token,
            'username': user.username,
        }
        return response


# User view hwre
class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithm=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        # token_ = Token.objects.filter(user=user).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)


# Logout view hwre
class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.delete_cookie('user_cookie')
        response.data = {
            'message': 'success'
        }
        return response


# Profile view hwre
class ProfileView(APIView):
    def post(self, request):

        profile = Profile.objects.filter(user=request.data["id"]).first()
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)


class UpdateUserView(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def post(self, request):
        user = get_object_or_404(User, id=request.data['profileID'])
        profile = get_object_or_404(Profile, id=request.data['profileID'])

        user.first_name = request.data['name']
        user.email = request.data['email']
        user.username = request.data['username']
        user.save()

        profile.first_name = request.data['name']
        try:
            profile.image = request.data['profileImg']
        except:
            pass
        profile.description = request.data['bio']
        profile.address = request.data['location']
        profile.work = request.data['work']
        profile.education = request.data['education']
        profile.save()

        response = Response()
        response.data = {
            'message': 'success'
        }
        return response


# Req user view here
class ReqUserView(APIView):
    def get(self, request, pk):
        profile = Profile.objects.filter(user=pk).first()
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)


# Get Followers
class FollowesView(APIView):
    def post(self, request):
        followerID = request.data["followerID"]
        userID = request.data["userID"]

        userProfile = get_object_or_404(Profile, id=userID)

        userProfile.save()
        if userProfile.Following.filter(id=followerID).exists():
            userProfile.Following.remove(followerID)
        else:
            userProfile.Following.add(followerID)

        response = Response()
        response.data = {
            'message': 'success'
        }
        return response


# Save post view
class SavePostView(APIView):
    def post(self, request):
        # All datas
        post_id = request.data["postId"]
        Author = request.data["Author"]
        pubDate = request.data["pubDate"]
        Title = request.data["Title"]
        whenPublished = request.data["whenPublished"]
        profileID = request.data["profileID"]

        # name for saved posts
        name = f"{post_id}{Author}{pubDate}{profileID}{Title}{whenPublished}"

        # make a new saved post
        SavedPosts.objects.create(
            name=name,
            post_id=post_id,
            Author=Author,
            title=Title,
            pubDate=whenPublished
        )
        # Add to profile
        user = get_object_or_404(Profile, id=profileID)
        post = get_object_or_404(SavedPosts, name=name)
        user.saved_posts.add(post)

        return Response("saved")

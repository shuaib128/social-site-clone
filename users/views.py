from django.shortcuts import get_object_or_404, render
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, ProfileSerializer
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime
from django.contrib.auth.models import User
from .models import Profile
from rest_framework.authtoken.views import Token
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


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
#Register view hwre
class RegisterView(APIView):
    def post(self, request):
        print(request.data)

        user = User.objects.create(
            email=request.data['email'],
            username=request.data['username'],
            password = make_password(request.data['password'])
        )
        Token.objects.create(user=user)
        return Response(user)


#Login view hwre
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


#User view hwre
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


#Logout view hwre
class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.delete_cookie('user_cookie')
        response.data = {
            'message': 'success'
        }
        return response


#Profile view hwre
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
        profile.image = request.data['profileImg']
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


#Req user view here
class ReqUserView(APIView):
    def get(self, request, pk):
        profile = Profile.objects.filter(user=pk).first()
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)


#Get Followers
class FollowesView(APIView):
    def post(self, request):
        followerID = request.data["followerID"]
        userID = request.data["userID"]

        userProfile = get_object_or_404(Profile, id=userID)

        userProfile.save()
        if userProfile.Followes.filter(id=followerID).exists():
            userProfile.Followes.remove(followerID)
        else:
            userProfile.Followes.add(followerID)
        
        response = Response()
        response.data = {
            'message': 'success'
        }
        return response


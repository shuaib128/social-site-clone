from django.shortcuts import get_object_or_404
from .models import (
    Post, Image, Comments, Replyes, Category
)
from rest_framework import generics
from .serializers import (
    PostSereileizer, CommentsSerilizer, ReplyesSerilizer
)
from rest_framework.permissions import (
    SAFE_METHODS, 
    BasePermission,
)
from rest_framework.views import APIView
import datetime
from django.contrib.auth.models import User
from users.models import Profile
from rest_framework.response import Response
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from uuid import uuid4
from rest_framework import filters
from django.core.paginator import Paginator


# Create your views here.
#Custom permissions
class PostUserWritePermission(BasePermission):
    message = 'Editing posts is restricted to the author only.'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.auhtor == request.user


# Posts Api View
class PostViewSet(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def post(self, request, format=None):
        posts = Post.objects.all()
        paginator = Paginator(posts, 10)
        page_number = request.data["pagenum"]

        if page_number:
            if int(page_number) <= paginator.num_pages:
                obj_list = paginator.get_page(page_number)
                serilizer = PostSereileizer(obj_list, many=True)
                return Response(serilizer.data)


#Post detail view
class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [PostUserWritePermission]
    queryset = Post.objects.all()
    serializer_class = PostSereileizer


#Create New Post
class PostCreateView(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def post(self, request, format=None):
        date_time_key = str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M"))
        radon_title = str(uuid4())
        images_id = ()

        title = request.data['title']
        description = request.data['description']
        auhtor = get_object_or_404(User, username=request.data['Author'])
        ProfileItems = get_object_or_404(Profile, id=request.data['Profile'])
        
        try:
            #get images and save as objects
            image_keys = list(request.data)[-int(request.data["imglength"]):]
            for i in image_keys:
                Image.objects.create(
                    name = f'{title} {radon_title} {auhtor} {date_time_key}',
                    image = request.data[i]
                )

            #get images and extract ID
            for i in image_keys:
                image = Image.objects.filter(name=f'{title} {radon_title} {auhtor} {date_time_key}')
                images_id = (tuple(image.values_list('id', flat=True)))
                break
        except:
            pass

        
        #create new post objects
        post = Post()
        post.title = title
        post.description = description
        post.auhtor = auhtor
        post.ProfileItems = ProfileItems
        post.post_category_str = request.data['Catagory']
        try:
            post.cover_image = request.data['coverImg']
            print(request.data['coverImg'])
        except:
            pass
        post.save()

        #add images to post
        if images_id:
            for i in images_id:
                post.images.add(i)

        #Add category to post
        category_string = request.data['Catagory']
        comma_separated_category = category_string.split(",")

        for cat in comma_separated_category:
            if Category.objects.filter(name=cat).exists():
                pass
            else:
                Category.objects.create(
                    name = cat
                )
            post.post_category.add(get_object_or_404(Category, name=cat))
        

        response = Response()
        response.data = {
            'responce': 'created'
        }
        return response


#Post update
class PostUpdateView(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def post(self, request, pk, format=None):
        post = get_object_or_404(Post, id=pk)

        date_time_key = str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M"))
        radon_title = str(uuid4())
        images_id = ()

        deletedImgID = request.data['deletedImgIDs']
        if deletedImgID:
            deletedImgID = deletedImgID.split(',')
            for img in deletedImgID:
                post.images.remove(get_object_or_404(Image, id=img))
            
        title = request.data['title']
        description = request.data['description']
        auhtor = get_object_or_404(User, username=request.data['Author'])

        try:
            #get images and save as objects       
            image_keys = list(request.data)[-int(request.data["imglength"]):]
            for i in image_keys:
                Image.objects.create(
                    name = f'{title} {radon_title} {auhtor} {date_time_key}',
                    image = request.data[i]
                )

            #get images and extract ID
            for i in image_keys:
                image = Image.objects.filter(name=f'{title} {radon_title} {auhtor} {date_time_key}')
                images_id = (tuple(image.values_list('id', flat=True)))
                break
        except:
            pass
        

        title = title
        description = description

        try:
            coverImg = request.data['coverImg']
        except:
            pass

        post.title = title
        post.description = description
        post.post_category_str = request.data['Catagory']
        try:
            post.cover_image = coverImg
        except:
            pass
        post.save()

        #add images to post
        if images_id:
            for i in images_id:
                post.images.add(i)


        #Add category to post
        category_string = request.data['Catagory']
        comma_separated_category = category_string.split(",")

        for cat in comma_separated_category:
            if Category.objects.filter(name=cat).exists():
                pass
            else:
                Category.objects.create(
                    name = cat
                )
            post.post_category.add(get_object_or_404(Category, name=cat))

        response = Response()
        response.data = {
            'data': 'data'
        }
        return response


#Delete post
class DeletePostView(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def post(self, request, pk, format=None):
        post = Post.objects.get(id=pk)
        post.delete()

        posts = Post.objects.all()

        serilizer = PostSereileizer(posts, many=True)
        return Response(serilizer.data)


#DashbordView
class DashbordView(APIView):
    def post(self, request):
        #get the posts filtered by username
        prof = user=request.data['name']
        posts = Post.objects.filter(ProfileItems__user__username=prof)

        serilizer = PostSereileizer(posts, many=True)
        return Response(serilizer.data)


#Like dislike View
class LikeDislikeView(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def post(self, request, pk, format=None):
        profileID = request.data["profileID"]
        post = get_object_or_404(Post, id=pk)

        post.save()
        likedOrNot = False
        likedorNotIcon = ''

        if post.likes.filter(id=profileID).exists():
            likedOrNot = False
            likedorNotIcon = '<svg className="crayons-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"></path></svg>'
            post.likes.remove(get_object_or_404(User, id=profileID))
        else:
            likedOrNot = True
            likedorNotIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" class="crayons-icon"> <path d="M2.821 12.794a6.5 6.5 0 017.413-10.24h-.002L5.99 6.798l1.414 1.414 4.242-4.242a6.5 6.5 0 019.193 9.192L12 22l-9.192-9.192.013-.014z"></path> </svg>'
            post.likes.add(profileID)


        response = Response()
        response.data = {
            'likedOrNot': likedOrNot,
            'likes': post.likes.all().count(),
            'likedorNotIcon': likedorNotIcon
        }
        return response
        

#Comment View
class CommentsView(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def post(self, request, pk, format=None):
        radon_title = str(uuid4())

        post = get_object_or_404(Post, id=pk)
        user = get_object_or_404(User, id=request.data['userID'])
        profile = get_object_or_404(Profile, id=request.data['userID'])
        date_time_key = str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M"))
        comment_description = request.data["comment"]

        Comments.objects.create(
            name = f'{comment_description} {profile} {date_time_key} {radon_title}',
            users = user,
            ProfileItems = profile,
            description = comment_description
        )
        comment_id = Comments.objects.filter(name=f'{comment_description} {profile} {date_time_key} {radon_title}')
        comment_id = tuple(comment_id.values_list('id', flat=True))[0]
        
        post.save()
        post.comments.add(comment_id)

        responce_comment = Comments.objects.filter(id=comment_id).first()
        serilizer = CommentsSerilizer(responce_comment)
        
        return Response(serilizer.data)


#ReplyView
class ReplesView(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def post(self, request, pk, format=None):
        radon_title = str(uuid4())

        comment = get_object_or_404(Comments, id=request.data["commentID"])
        user = get_object_or_404(User, id=request.data['userID'])
        profile = get_object_or_404(Profile, id=request.data['userID'])
        date_time_key = str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M"))
        comment_description = request.data["reply"]

        Replyes.objects.create(
            name = f'{comment_description} {profile} {date_time_key} {radon_title}',
            users = user,
            ProfileItems = profile,
            description = comment_description
        )
        reply_id = Replyes.objects.filter(name=f'{comment_description} {profile} {date_time_key} {radon_title}')
        reply_id = tuple(reply_id.values_list('id', flat=True))[0]
        
        comment.save()
        comment.replyes.add(reply_id)

        responce_reply = Replyes.objects.filter(id=reply_id).first()
        serilizer = ReplyesSerilizer(responce_reply)
        
        return Response(serilizer.data)


#Search Querys
class SearchApiView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSereileizer
    filter_backends = [filters.SearchFilter]
    search_fields = [
            "title", 
            "description", 
            "pub_date", 
            "last_edited", 
            "auhtor__username"
        ]


#Get matched posts by the user
class FilterByUserPostView(APIView):
    def get(self, request, pk):
        posts = Post.objects.filter(auhtor__id=pk)
        
        serilizer = PostSereileizer(posts, many=True)
        return Response(serilizer.data)




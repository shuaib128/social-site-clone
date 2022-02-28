from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.permissions import (
    SAFE_METHODS, 
    BasePermission,
)
from rest_framework import generics
from .serializers import VideoSerializer
from .models import Videos
from django.shortcuts import get_object_or_404
from users.models import Profile
from django.contrib.auth.models import User


# Create your views here.
#Custom permissions
class PostUserWritePermission(BasePermission):
    message = 'Editing posts is restricted to the author only.'
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.auhtor == request.user

#Video View
class VideoView(generics.ListCreateAPIView, PostUserWritePermission):
    permission_classes = [PostUserWritePermission]
    queryset = Videos.objects.all()
    serializer_class = VideoSerializer


#Post detail view
class VideoDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [PostUserWritePermission]
    queryset = Videos.objects.all()
    serializer_class = VideoSerializer


#Create New video Post
class VideoCreateView(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def post(self, request, format=None):
        title = request.data['title']
        description = request.data['description']
        auhtor = get_object_or_404(User, username=request.data['Author'])
        ProfileItems = get_object_or_404(Profile, id=request.data['Profile'])

        
        # create new post objects
        post = Videos()
        post.title = title
        # post.description = description
        post.auhtor = auhtor
        post.ProfileItems = ProfileItems
        try:
            post.thumbnail = request.data['coverImg']
        except:
            pass
        #add video to post
        post.video = request.data['coverVideo']
        post.save()

        response = Response()
        response.data = {
            'data': 'data'
        }
        return response


#Update video post
class VideoUpdateView(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def post(self, request, pk, format=None):
        title = request.data['title']
        description = request.data['description']
        auhtor = get_object_or_404(User, username=request.data['Author'])
        ProfileItems = get_object_or_404(Profile, id=request.data['Profile'])
        video = get_object_or_404(Videos, id=pk)
        
        video.title = title
        # post.description = description
        video.auhtor = auhtor
        video.ProfileItems = ProfileItems
        try:
            video.thumbnail = request.data['coverImg']
        except:
            pass
        #add video to post
        try:
            video.video = request.data['coverVideo']
        except:
            pass
        video.save()

        response = Response()
        response.data = {
            'data': 'data'
        }
        return response


#Delete post
class DeleteVideoView(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def post(self, request, pk, format=None):
        post = Videos.objects.get(id=pk)
        post.delete()

        posts = Videos.objects.all()

        serilizer = VideoSerializer(posts, many=True)
        return Response(serilizer.data)


#Dashbord video view
class DashbordVideoView(APIView):
    def post(self, request):
        #get the posts filtered by username
        prof = request.data['name']
        posts = Videos.objects.filter(ProfileItems__user__username=prof)

        serilizer = VideoSerializer(posts, many=True)
        return Response(serilizer.data)



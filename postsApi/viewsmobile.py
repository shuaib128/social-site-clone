from rest_framework.views import APIView
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
import datetime
from uuid import uuid4
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from users.models import Profile
from .models import Post, Image
from rest_framework.response import Response


# Create New Post
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

        post = Post()
        post.title = title
        post.description = description
        post.auhtor = auhtor
        post.ProfileItems = ProfileItems
        try:
            post.cover_image = request.data['coverImg']
        except Exception:
            print(str(Exception))
        post.save()

        response = Response()
        response.data = {
            'data': 'data'
        }
        return response

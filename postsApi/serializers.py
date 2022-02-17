from django.db.models import fields
from rest_framework import serializers
from .models import Post, Image, Comments, Replyes
from django.contrib.auth.models import User
from users.models import Profile


# Post Serelizer
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            'id',
            'user',
            'first_name',
            'last_name',
            'description',
            'work',
            'education',
            'image',
            'joined_date',
            'address',
        )

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = (
            'id',
            'image'
        )


class LikedUsersSerilizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username'
        )

class CommentUsersSerilizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username'
        )


class ReplyesSerilizer(serializers.ModelSerializer):
    users = CommentUsersSerilizer(required=True)
    ProfileItems = ProfileSerializer(required=True)
    class Meta:
        model = Replyes
        fields = (
            'id',
            'description',
            'pub_date',
            'last_edited',
            'users',
            'ProfileItems'
        )


class CommentsSerilizer(serializers.ModelSerializer):
    ProfileItems = ProfileSerializer(required=True)
    users = CommentUsersSerilizer(required=True)
    replyes = ReplyesSerilizer(many=True)
    class Meta:
        model = Comments
        fields = (
            'id',
            'description',
            'pub_date',
            'last_edited',
            'users',
            'ProfileItems',
            'replyes'
        )


class PostSereileizer(serializers.ModelSerializer):
    Author = serializers.CharField(source='auhtor', read_only=True)
    ProfileItems = ProfileSerializer(required=True)
    images = ImageSerializer(many=True)
    # likes = LikedUsersSerilizer(many=True)
    comments = CommentsSerilizer(many=True)

    class Meta:
        fields = (
            'id',
            'title',
            'description',
            'cover_image',
            'images',
            'pub_date',
            'last_edited',
            'get_readtime',
            'Author',
            'whenpublished',
            'ProfileItems',
            'likes',
            'comments'
        )
        model = Post

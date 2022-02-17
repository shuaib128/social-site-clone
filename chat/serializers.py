from rest_framework import serializers
from .models import ChatBlock, Chatroom
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username'
        )


class ChatBlockSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)
    class Meta:
        model = ChatBlock
        fields = (
            'id',
            'user',
            'text',
            'chat_image'
        )


class ChatRoomSerializer(serializers.ModelSerializer):
    block = ChatBlockSerializer(many=True)
    class Meta:
        model = ChatBlock
        fields = (
            'id',
            'text',
            'chat_image',
            'block'
        )
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, SavedPosts

#User Serileizer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email','password']

        extra_kwargs = {
            'password': {'write_only': True}
        }

        def create(self, validated_data):
            password = validated_data.pop('password', None)
            instance = self.Meta.model(**validated_data)
            if password is not None:
                instance.set_password(password)
            instance.save()
            return instance

#Saved post
class SavedPostSerilizer(serializers.ModelSerializer):
    class Meta:
        model = SavedPosts
        fields = [
            "post_id"
        ]

#Profile Serilizer
class ProfileSerializer(serializers.ModelSerializer):
    saved_posts = SavedPostSerilizer(many=True)

    class Meta:
        model = Profile
        fields = [
            'id',
            'user',
            'first_name',
            'last_name',
            'image',
            'description',
            'work',
            'education',
            'address',
            'joined_date',
            'Following',
            'saved_posts'
        ]

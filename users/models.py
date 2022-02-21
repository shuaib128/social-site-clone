from statistics import mode
from unicodedata import name
from django.db import models
from django.contrib.auth.models import User
from chat.models import Chatroom


#Saved Posts
class SavedPosts(models.Model):
    name = models.CharField(max_length=150, blank=True)

# User Profile
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    description = models.TextField(default="Description")
    work = models.CharField(max_length=150, blank=True)
    education = models.CharField(max_length=150, blank=True)
    image = models.ImageField(null=True, blank=True, upload_to='media/profileImage',)
    joined_date = models.DateTimeField(auto_now_add= True)
    address = models.CharField(max_length=150, blank=True)
    Following = models.ManyToManyField(User, related_name='flowwers', null=True, blank=True,)
    Chats = models.ManyToManyField(Chatroom, related_name='chat', null=True, blank=True,)
    saved_posts = models.ManyToManyField(SavedPosts, related_name='SavedPosts', null=True, blank=True,)

    def __str__(self):
        return f"{self.user} Profile"
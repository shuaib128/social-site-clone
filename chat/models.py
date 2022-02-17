from django.db import models
from django.contrib.auth.models import User
from PIL import Image as IMG

# Create your models here.
class ChatBlock(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=0)
    text = models.CharField(max_length=150, null=True, blank=True)
    chat_image = models.ImageField(null=True, blank=True, upload_to='media/chat_image',)
    pub_date = models.DateTimeField(auto_now_add= True)

    def __str__(self):
        return str(str(self.user) + '_' + str(self.text) + str(self.pub_date))


class Chatroom(models.Model):
    name = models.CharField(max_length=150, blank=True)
    block = models.ManyToManyField(
        ChatBlock, related_name='ChatBlock', null=True, blank=True
    )

    def __str__(self):
        return str(self.name)
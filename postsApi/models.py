from django.db import models
from django.conf import settings
from django.utils import timezone
import readtime
from PIL import Image as IMG
import math
from django.contrib.auth.models import User
from users.models import Profile


# Create your models here.
# Images Files
class Image(models.Model):
    name = models.CharField(max_length=1000, default="Image Name")
    image = models.ImageField(null=True, blank=True, upload_to='media/postsImage',)

    def __str__(self):
        return str(self.name)

    def save(self, *args, **kwargs):
        super(Image, self).save(*args, **kwargs)

        img = IMG.open(self.image.path)

        if img.height > 300 or img.width > 300:
            new_img = (700, 700)
            img.thumbnail(new_img)
            img.save(self.image.path)


class Replyes(models.Model):
    name = models.CharField(max_length=1000, default="Image Name")
    users = models.ForeignKey(User, on_delete=models.CASCADE, default=0)
    ProfileItems = models.ForeignKey(Profile, on_delete=models.CASCADE)
    description = models.TextField(default="Body")
    pub_date = models.DateTimeField(auto_now_add= True)
    last_edited= models.DateTimeField(auto_now= True)

    def __str__(self):
        return str(self.name)

    class Meta:
        ordering = ['-pub_date',]


class Comments(models.Model):
    name = models.CharField(max_length=1000, default="Image Name")
    users = models.ForeignKey(User, on_delete=models.CASCADE, default=0)
    ProfileItems = models.ForeignKey(Profile, on_delete=models.CASCADE)
    description = models.TextField(default="Body")
    pub_date = models.DateTimeField(auto_now_add= True)
    last_edited= models.DateTimeField(auto_now= True)
    replyes = models.ManyToManyField(Replyes, related_name='Replyes', null=True, blank=True)

    class Meta:
        ordering = ['-pub_date',]
    
    def __str__(self):
        return str(self.name)
    

#Posts Model
class AutoDateTimeField(models.DateTimeField):
    def pre_save(self, model_instance, add):
        return timezone.now()


class Post(models.Model):
    title = models.CharField(max_length=1000, default="Post Title")
    description = models.TextField(default="Body")
    cover_image = models.ImageField(null=True, blank=True, upload_to='media/postsImage',)
    images = models.ManyToManyField(Image, related_name='images', null=True, blank=True,)
    pub_date = models.DateTimeField(auto_now_add= True)
    last_edited= models.DateTimeField(auto_now= True)
    auhtor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=0)
    ProfileItems = models.ForeignKey(Profile, on_delete=models.CASCADE)
    likes = models.ManyToManyField(User, related_name='likes', null=True, blank=True,)
    comments = models.ManyToManyField(Comments, related_name='Comments', null=True, blank=True,)

    class Meta:
        ordering = ['-pub_date',]

    #Get reading Time
    def get_readtime(self):
        return readtime.of_text(self.description).text

    #Get time afetr post
    def whenpublished(self):
        now = timezone.now()
        diff= now - self.pub_date

        if diff.days == 0 and diff.seconds >= 0 and diff.seconds < 60:
            seconds= diff.seconds           
            if seconds == 1:
                return str(seconds) +  "second ago"          
            else:
                return str(seconds) + " seconds ago"

        if diff.days == 0 and diff.seconds >= 60 and diff.seconds < 3600:
            minutes= math.floor(diff.seconds/60)

            if minutes == 1:
                return str(minutes) + " minute ago"           
            else:
                return str(minutes) + " minutes ago"

        if diff.days == 0 and diff.seconds >= 3600 and diff.seconds < 86400:
            hours= math.floor(diff.seconds/3600)

            if hours == 1:
                return str(hours) + " hour ago"
            else:
                return str(hours) + " hours ago"

        # 1 day to 30 days
        if diff.days >= 1 and diff.days < 30:
            days= diff.days
        
            if days == 1:
                return str(days) + " day ago"
            else:
                return str(days) + " days ago"

        if diff.days >= 30 and diff.days < 365:
            months= math.floor(diff.days/30)           

            if months == 1:
                return str(months) + " month ago"
            else:
                return str(months) + " months ago"


        if diff.days >= 365:
            years= math.floor(diff.days/365)
            if years == 1:
                return str(years) + " year ago"
            else:
                return str(years) + " years ago"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        super(Post, self).save(*args, **kwargs)

        img = IMG.open(self.cover_image.path)

        if img.height > 300 or img.width > 300:
            new_img = (700, 700)
            img.thumbnail(new_img)
            img.save(self.cover_image.path)
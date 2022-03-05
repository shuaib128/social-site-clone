from django.db import models
from django.conf import settings
from django.core.validators import FileExtensionValidator
from PIL import Image as IMG
from django.utils import timezone
from users.models import Profile
from django.contrib.auth.models import User
import math

# Create your models here.
class Videos(models.Model):
    title = models.CharField(max_length=1000, default="Video Title")
    description = models.TextField(default="Body")
    thumbnail = models.ImageField(null=True, blank=True, upload_to='media/VideoThumbnail',)
    video = models.FileField(
        upload_to='videos', null=True, blank=True,
        validators=[
            FileExtensionValidator(allowed_extensions=['MOV','avi','mp4','webm','mkv'])
        ]
    )
    auhtor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=0)
    ProfileItems = models.ForeignKey(Profile, on_delete=models.CASCADE)
    pub_date = models.DateTimeField(auto_now_add= True)
    last_edited= models.DateTimeField(auto_now= True)

    def __str__(self):
        return self.title

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

    def save(self, *args, **kwargs):
        super(Videos, self).save(*args, **kwargs)

        img = IMG.open(self.thumbnail.path)

        if img.height > 300 or img.width > 300:
            new_img = (700, 700)
            img.thumbnail(new_img)
            img.save(self.thumbnail.path)
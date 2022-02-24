from django.contrib import admin
from .models import Post, Image, Comments, Replyes, Category

# Register your models here.
admin.site.register(Post)
admin.site.register(Image)
admin.site.register(Comments)
admin.site.register(Replyes)
admin.site.register(Category)

from django.urls import path
from django.urls.conf import include
from .viewsmobile import (
    PostCreateView
)

urlpatterns = [
    path('new/post/', PostCreateView.as_view(), name='PostCreateView')
]
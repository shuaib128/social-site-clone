from django.urls import path
from .views import (
    DeleteVideoView, VideoView, VideoCreateView, DashbordVideoView, VideoDetail,
    VideoUpdateView, DeleteVideoView
)


urlpatterns = [
    path('', VideoView.as_view(), name='VideoView'),
    path('<int:pk>/', VideoDetail.as_view(), name='VideoDetail'),
    path('new_video/', VideoCreateView.as_view(), name='VideoCreateView'),
    path('dashbord/', DashbordVideoView.as_view(), name='DashbordVideoView'),
    path('update_video/<int:pk>/', VideoUpdateView.as_view(), name='VideoUpdateView'),
    path('delete_video/<int:pk>/', DeleteVideoView.as_view(), name='DeleteVideoView'),
]
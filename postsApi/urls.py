from django.urls import path
from django.urls.conf import include
from .views import (
    PostViewSet, PostDetail, PostCreateView, DashbordView, PostUpdateView, 
    DeletePostView, LikeDislikeView, CommentsView, ReplesView, SearchApiView,
    FilterByUserPostView
)

urlpatterns = [
    path('<int:pk>/', PostDetail.as_view(), name='detailcreate'),
    path('new_post/', PostCreateView.as_view(), name='PostUpdateView'),
    path('update_post/<int:pk>/', PostUpdateView.as_view(), name='PostUpdateView'),
    path('delete_post/<int:pk>/', DeletePostView.as_view(), name='DeletesPost'),
    path('like_dislike/<int:pk>/', LikeDislikeView.as_view(), name='LikeDislikeView'),
    path('post/search/', SearchApiView.as_view(), name='SearchApiView'),
    path('post_user/<int:pk>/', FilterByUserPostView.as_view(), name='FilterByUserPostView'),
    path('comments/<int:pk>/', CommentsView.as_view(), name='CommentsView'),
    path('replyes/<int:pk>/', ReplesView.as_view(), name='ReplesView'),
    path('dashbord/', DashbordView.as_view(), name='DashbordView'),
    path('', PostViewSet.as_view(), name='listcreate'),
]
from users.models import Profile
from django.urls import path
from .views import (RegisterView, LoginView, UserView, LogoutView,
    ProfileView, UpdateUserView, ReqUserView, FollowesView, MyTokenObtainPairView,
    SavePostView
)

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view()),
    path('profile', ProfileView.as_view()),
    path('update_user/', UpdateUserView.as_view()),
    path('followes/', FollowesView.as_view(), name='FollowesView'),
    path('req/user/<int:pk>/', ReqUserView.as_view()),
    path('save/', SavePostView.as_view()),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

from django.urls import path
from .views import (
    ChatroomCreateView, ChatItemsView
)

urlpatterns = [
    path('chat_room_create/', ChatroomCreateView.as_view(), name='ChatroomCreateView'),
    path('chats/', ChatItemsView.as_view(), name='ChatItemsView'),
]
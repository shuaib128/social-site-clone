from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Chatroom, ChatBlock
from users.models import Profile
from django.shortcuts import get_object_or_404
from .serializers import ChatRoomSerializer

# Create your views here.
class ChatroomCreateView(APIView):
    def post(self, request):
        username = request.data["userid"]
        message_user = request.data["another_userid"]
        name_array = [username, message_user]
        name_array = sorted(name_array, reverse=False)

        chatroom_name = f"{name_array[0]}_{name_array[1]}"
        
        if(len(Chatroom.objects.filter(name=chatroom_name)) == 0):
            Chatroom.objects.create(
                name = chatroom_name
            )
            chatroom = get_object_or_404(Chatroom, name=chatroom_name)
            user1 = get_object_or_404(Profile, id=username)
            user2 = get_object_or_404(Profile, id=message_user)

            user1.Chats.add(chatroom)
            user2.Chats.add(chatroom)
        
        return Response(chatroom_name)


class ChatItemsView(APIView):
    def post(self, request):
        chat_room = request.data["chat_room"]
        chatroom = get_object_or_404(Chatroom, name=chat_room)

        serilizer = ChatRoomSerializer(chatroom)
        return Response(serilizer.data)
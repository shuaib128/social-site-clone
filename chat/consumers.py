import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import ChatBlock, Chatroom
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        name = text_data_json['name']
        user_ID = text_data_json['userID']
        message_type = text_data_json['type']

        if message_type == "chat_message":
            # Send message to room group
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'name': name
                }
            )

            target_user = get_object_or_404(User, id=user_ID)
            chat_block = ChatBlock.objects.create(
                user=target_user,
                text=message
            )

            chatroom = get_object_or_404(Chatroom, name=text_data_json['room'])
            chatroom.block.add(chat_block)

        if message_type == "image_message":
            # Send message to room group
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'name': name
                }
            )

            # target_user = get_object_or_404(User, id=user_ID)
            # chat_block = ChatBlock.objects.create(
            #     user = target_user,
            #     text = message
            # )

            # chatroom = get_object_or_404(Chatroom, name=text_data_json['room'])
            # chatroom.block.add(chat_block)

    # Receive message from room group

    def chat_message(self, event):
        message = event['message']
        name = event['name']
        msg_type = event['type']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message,
            'name': name,
            'msg_type': msg_type
        }))

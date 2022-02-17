import React, { useState, useEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket"
import { BackendHost } from '../Api/BackendHost';
import axios from 'axios';
import Message from '../components/MessageComponents/Message';
import {
    Image
} from 'lucide-react';

const ChatRoom = (props) => {
    const [room, setroom] = useState(
        window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
    )
    const [messages, setmessages] = useState([])
    const [value, setvalue] = useState()
    const [coverimage, setCoverimage] = useState(null);

    const client = new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/' + room + '/')

    const sendMessage = (e) => {
        client.send(JSON.stringify({
            type: "chat_message",
            message: value,
            name: props.username,
            userID: props.profileID,
            room: room
        }))
        setvalue('')
        document.querySelector(".message_input").value = ''
        e.preventDefault();
    }


    const sendImage = (e) => {
        // client.send(message: coverimage.image)
    }

    useEffect(() => {
        axios.post(`${BackendHost}/api/chats/chats/`, {
            chat_room: room
        })
            .then((res) => {
                for (const msg in res.data.block) {
                    if (res.data.block[msg].text !== null) {
                        setmessages(message => [...message, {
                            msg: res.data.block[msg].text,
                            name: res.data.block[msg].user.username,
                            type: "chat_message"
                        }]);
                    }
                    if (res.data.block[msg].chat_image !== null) {
                        setmessages(message => [...message, {
                            msg: res.data.block[msg].chat_image,
                            name: res.data.block[msg].user.username,
                            type: "image"
                        }]);
                    }
                }
            })
    }, [])

    useEffect(() => {
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data)

            if (dataFromServer) {
                setmessages(message => [...message, {
                    msg: dataFromServer.message,
                    name: dataFromServer.name,
                    type: dataFromServer.msg_type
                }]);
            }
        }
    }, [])

    const uploadCover = (e) => {
        setCoverimage({
            image: e.target.files[0],
        });

        var prevImgSec = document.querySelector('.sendmsgimg')
        const file = e.target.files

        //get file images and show them in the prev_imgs section
        const reader = new FileReader()
        reader.addEventListener("load", function () {
            prevImgSec.src = this.result
        })
        reader.readAsDataURL(file[0])
        document.querySelector('.sendMessageSec').style.display = 'block'
    }


    return (
        <div className="posts_arcade posts_arcade_chat">
            <div className="posts_main_chat">
                <div className='messages'>
                    <Message
                        messages={messages}
                        username={props.username}
                    />

                    <div className='sendMessageSec'>
                        <img className='sendmsgimg' src="" alt="" />
                        <button onClick={sendImage}>
                            Send
                        </button>
                    </div>

                    <div className='Sendmsgform'>
                        <form noValidate onSubmit={sendMessage}>
                            <input
                                onChange={e => setvalue(e.target.value)}
                                className='message_input'
                                placeholder="Message.."
                            />
                        </form>

                        {/* <Image color="black" size={25} /> */}
                        <input type="file" className='cover_image_btn'
                            accept="image/*"
                            onChange={uploadCover}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatRoom

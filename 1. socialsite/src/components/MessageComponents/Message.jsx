import React from 'react'
import { BackendHost } from '../../Api/BackendHost'

const Message = (props) => {
    return (
        <>
            <div className="chats_rooms">
                Hey
            </div>

            <div className="messages_">
                {props.messages && props.messages.map((message, index) => (
                    <div key={index} 
                        className={message.name === props.username ? "div_block div_user" : "div_block div_to"}
                    >
                        {message.type === "chat_message" ?
                            <p className={message.name === props.username ? "msg msg_text_user" : " msg msg_text_to"}>
                                {message.msg}
                            </p>
                            :
                            <span></span>
                        }
                        {message.type === "image" ?
                            <img className='msg' src={BackendHost + message.msg} alt='img' />
                            :
                            <span></span>
                        }
                    </div>
                ))}
            </div>
        </>
    )
}

export default Message

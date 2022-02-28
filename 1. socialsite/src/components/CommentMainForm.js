import React, { useState } from 'react'
import { ServerHost } from './ServerHost';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BackendHost } from '../Api/BackendHost';

const CommentMainForm = (props) => {
    const [comment, setComment] = useState('')
    const postID = props.post.id
    const userID = props.profileData.id

    const { id } = useParams()

    const NewComment = (e) => {
        e.preventDefault()

        //store and send all comment
        URL = `${BackendHost}/api/posts/comments/${id}/`
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        let formData = new FormData();
        formData.append('comment', comment);
        formData.append('userID', userID);
        formData.append('postID', postID);

        //Set loading
        document.querySelector(`.comment_btn`).innerHTML =
            `
            <div class="loader"></div>
        `

        //Send data with axios
        axios
            .post(URL, formData, config,)
            .then(res => {
                props.setComments([...props.comments, res.data])
                document.querySelector(`.comment_btn`).innerHTML = "Comment"
                document.querySelector(`.comment_form`).value = ""
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <p style={{ fontSize: '25px', fontWeight: 600 }}>
                Discution ({props.post.comments.length})
            </p>

            <div className="comment_reply">
                <form onSubmit={NewComment}>
                    <div className="comment">
                        <img alt='image_server' src={ServerHost + props.profileData.image} />
                        <textarea required placeholder="Add a discutation" className="comment_form"
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="comment_btn">Comment</button>
                    <button className="comment_btn cancel_btn">Cancel</button>
                </form>
            </div>
        </>
    )
}

export default CommentMainForm

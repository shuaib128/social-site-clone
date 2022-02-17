import React, {useState} from 'react'
import CommentMainForm from './CommentMainForm'
import UserComments from './UserComments'
import { Link } from 'react-router-dom'

const CommentSection = (props) => {
    const [comments, setComments] = useState(props.post.comments)

    return (
        <div className="comment_section">
            {props.username && props.username !== undefined ?
                <CommentMainForm post={props.post} profileData={props.profileData}
                    setComments={setComments} comments={comments}
                />:
                <p className="createaccount_a">
                    Login or Create an account. <Link to="/register">Create Account</Link>
                </p>
            }           

            <div className="comments">
                <div className="comments_reply">
                    {comments && comments.map((comment) => {
                        return(
                            <UserComments key={comment.id} comment={comment}
                                profileData={props.profileData}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CommentSection

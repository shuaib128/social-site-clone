import React from 'react'
import { BackendHost } from '../Api/BackendHost';
import { Link } from 'react-router-dom';

const ReplySection = (props) => {
    return (
        <div className="reply_sec">
            <div style={{ marginTop: 0 }} className="user_comment">
                <Link to={"/user/profile/" + props.reply.ProfileItems.id}>
                    <img
                        src={
                            props.reply.ProfileItems.image.includes(BackendHost) ?
                                props.reply.ProfileItems.image :
                                `${BackendHost}${props.reply.ProfileItems.image}`
                        }
                        alt="imjk"
                    />
                </Link>

                <div className="actual_comment">
                    <div className="comment_user_nme">
                        <div style={{ display: 'flex' }}>
                            <p className="comment_user_name">{props.reply.users.user_name}</p>
                            <p className="comment_user_date">{props.reply.pub_date}</p>
                        </div>

                        <p className="user_cmt">{props.reply.description}</p>
                    </div>

                    <div className="comment_like_reply">
                        <div className="comment_like">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-labelledby="aaginjmkkh80t1s0n6ke7k0ofas63pf1" className="crayons-icon reaction-icon not-reacted"><title id="aaginjmkkh80t1s0n6ke7k0ofas63pf1">Like comment:</title><path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"></path></svg>
                            <p>1 like</p>
                        </div>

                        <div className="comment_like">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-labelledby="a3zgbvwh80d7d394kqen3swanybxl0h5" className="crayons-icon reaction-icon not-reacted"><title id="a3zgbvwh80d7d394kqen3swanybxl0h5">Comment button</title><path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path></svg>
                            <p>Reply</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReplySection

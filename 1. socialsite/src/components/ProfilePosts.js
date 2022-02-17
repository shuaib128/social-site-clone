import React, {Fragment, useRef, useState, useEffect} from 'react'
import Glide from 'react-glidejs';
import 'react-glidejs/dist/index.css';
import { Link } from 'react-router-dom';
import { ServerHost } from './ServerHost';

const ProfilePosts = (props) => {
    const gliderRef = useRef(null);

    return (
        <>
        {props.posts && props.posts.map((post, index) => {
            if(post.Author === props.username){
            return(
                <div className="post_">                   
                    {post.images.length !== 0 ?
                        <div className="post_img">
                            <Glide
                                ref={gliderRef}
                                throttle={0}
                                customSlideAnimation={{
                                    timeout: 500,
                                    classNames: 'fade',
                                }}
                                type="slider"
                                slideClassName="slider__frame"
                                focusAt="center"
                            >
                                {post.images.map((image, index) => {
                                    return(
                                        <Fragment>
                                            <img src={ServerHost + image.image} />
                                        </Fragment>
                                    )
                                })}
                            </Glide>
                        </div>
                        :
                        <div></div>
                    }
                    <div className="post_bottom">
                        <div className="profile_post">
                            <img src={ServerHost + post.ProfileItems.image} />
                            <p className="profile_name">
                                {post.Author}
                                <span style={{display: 'block', color:'#64707d', fontSize:'13px', marginTop: '3px'}}>
                                    {post.pub_date} ({post.whenpublished})
                                </span>
                            </p>
                        </div>
    
                        <div className="post_title_tags">
                            <p className="post_title">
                                <Link to={'/post/'+post.id}>{post.title}</Link>
                            </p>
                            
                            <ul className="tags">
                                <li className="tag_">#react</li>
                                <li className="tag_">#javascript</li>
                                <li className="tag_">#pwa</li>
                                <li className="tag_">#node</li>
                            </ul>
    
                            <div className="post_bottom_">
                                <div className="post_bottom_right">
                                    <div className="like" style={{marginRight: '7px'}}>
                                        <p>{post.likes.length} <span className="like_com">reactions</span></p>
                                    </div>
                                    <div className="like">
                                        <svg className="crayons-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path></svg>
                                        <p>{post.comments.length} <span className="like_com">comments</span></p>
                                    </div>
                                </div>
    
                                <div className="post_bottom_left">
                                    <p>{post.get_readtime} readimg</p>
                                    <Link to={'/edit/' + post.id}>Manage</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        })}
        </>
    )
}

export default ProfilePosts

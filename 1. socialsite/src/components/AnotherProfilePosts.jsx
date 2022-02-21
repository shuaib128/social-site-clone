import React, {Fragment, useRef} from 'react'
import Glide from 'react-glidejs';
import 'react-glidejs/dist/index.css';
import { Link } from 'react-router-dom';
import { ServerHost } from './ServerHost';

const ProfilePosts = (props) => {
    const gliderRef = useRef(null);

    return (
        <>
        {props.posts && props.posts.map((post, index) => {
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
                                            <img alt='image_server' src={ServerHost + image.image} />
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
                            <img alt='image_server' src={ServerHost + post.ProfileItems.image} />
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
                                        <svg className="crayons-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"></path></svg>
                                        <p>{post.likes.length} <span className="like_com">reactions</span></p>
                                    </div>
                                    <div className="like">
                                        <svg className="crayons-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path></svg>
                                        <p>{post.comments.length} <span className="like_com">comments</span></p>
                                    </div>
                                </div>
    
                                <div className="post_bottom_left">
                                    <p>{post.get_readtime} readimg</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })}
        </>
    )
}

export default ProfilePosts

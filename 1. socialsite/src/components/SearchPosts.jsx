import React from 'react'
import { Link } from "react-router-dom";
import Post from '../components/Post'
import BlogLeftSec from '../components/BlogLeftSec'
import BlogRightSec from '../components/BlogRightSec'

const PostsArcade = (props) => {
    return (
        <>
            <div className="posts_arcade">
                <div className="posts_main">
                    <BlogLeftSec />

                    <div className="posts_middle">
                        <div className="type_post">
                            <p style={{ fontSize: '24px', marginBottom: '14px', marginTop: '12px', }}>Posts</p>
                            <ul className="types_posts">
                                <li><Link to="/">Posts</Link></li>
                                <li><a href="#">Videos</a></li>
                                <li><a href="#">Lives</a></li>
                                <li><a href="#">Podcasts</a></li>
                            </ul>
                        </div>

                        <div className="posts_">
                            <Post profileData={props.profileData} posts={props.posts} username={props.username}
                                profileID={props.profileID} setPost={props.setPost}
                            />
                        </div>
                    </div>

                    <BlogRightSec />
                </div>
            </div>
        </>
    )
}

export default PostsArcade

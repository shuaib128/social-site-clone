import React, { useState } from 'react'
import { BackendHost } from '../Api/BackendHost';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DetailsPostRight = (props) => {
    const [posts, setPosts] = useState(() => {
        axios.get(`${BackendHost}/api/posts/post_user/${props.post.ProfileItems.id}/`)
          .then(res => setPosts(res.data))
    });
    if (!posts) return "Loading...";
    if (!posts) return "Error!";

    return (
        <div className="details_post_right">
            <div className="background_details"></div>

            <div className="details_right_side_down">
                <div className="detail_side_profile">
                    <Link to={"/user/profile/" + props.post.ProfileItems.id}>
                        <img src={props.post.ProfileItems.image} />
                    </Link>
                    <p className="detail_side_profile_name">{props.post.Author}</p>
                </div>

                <button className='details_side_follow_btn'>Follow</button>
                <p className="side_detail_des">{props.post.ProfileItems.description}</p>

                <div className="details_profile_details">
                    <div className='details_profile_detail'>
                        <p className="detail_lavel">LOCATION</p>
                        <p className="detail_val">{props.post.ProfileItems.address}</p>
                    </div>

                    <div className='details_profile_detail'>
                        <p className="detail_lavel">WORK</p>
                        <p className="detail_val">{props.post.ProfileItems.work}</p>
                    </div>

                    <div className='details_profile_detail'>
                        <p className="detail_lavel">EDUCATION</p>
                        <p className="detail_val">{props.post.ProfileItems.education}</p>
                    </div>

                    <div className='details_profile_detail'>
                        <p className="detail_lavel">JOINED</p>
                        <p className="detail_val">{props.post.ProfileItems.joined_date}</p>
                    </div>
                </div>
            </div>


            <div className="more_from_users">
                <p style={{fontSize: '22px', marginBottom: '30px'}}>More from <a style={{color: '#3b49df', fontWeight: 600}} href="#">{props.post.Author}</a></p>

                <div className="more_posts_from_user">
                    {posts && posts.map((post) => (
                        <div className="more_post_from_user">
                            <Link  target="_blank" rel="noopener noreferrer" to={'/post/'+post.id}>
                                {post.title}
                            </Link>
                            <ul className="tags_detail">
                                <li>html</li>
                                <li>webdev</li>
                                <li>javascrict</li>
                                <li>css</li>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DetailsPostRight

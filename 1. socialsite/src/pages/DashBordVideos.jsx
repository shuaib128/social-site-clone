import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BackendHost } from '../Api/BackendHost';
import axios from 'axios';
import ReqToMakeAnaccount from '../components/ReqToMakeAnaccount';
import DashBordVideosComponents from '../components/DashbordVideos/DashBordVideosComponents';

const DashBordVideos = (props) => {
    const [posts, setPost] = useState(() => {
        axios.defaults.withCredentials = 'include'
        axios.post(`${BackendHost}/api/posts/dashbord/`, {
            name: props.username
        })
            .then((res) => {
                setPost(res.data);
            })
    });

    //Video Req axois
    const [Videos, setVideos] = useState(() => {
        axios.defaults.withCredentials = 'include'
        axios.post(`${BackendHost}/api/videos/dashbord/`, {
            name: props.username
        })
            .then((res) => {
                setVideos(res.data);
            })
    });

    if (!posts && props.username === undefined) {
        return (
            <ReqToMakeAnaccount />
        )
    }
    if (!posts) return "Error!";
    if (!Videos) return "Error!";
    let postNum = Object.keys(posts).length
    let vidNum = Object.keys(Videos).length


    return (
        <div className="posts_arcade">
            <div className="profile_main profile_main_video">
                <div className="profile_posts_archive">
                    <div className="profile_posts_archive_left">
                        <ul className="prfile_post_types">
                            <li className="pfole_type_detail active">Posts<span>{postNum}</span></li>
                            <Link to="/dashbord/videos">
                                <li className="pfole_type_detail">Videos <span>{vidNum}</span></li>
                            </Link>
                            <li className="pfole_type_detail">Lives <span>1</span></li>
                            <li className="pfole_type_detail">Podcasts <span>5</span></li>
                        </ul>
                    </div>

                    <div className="profile_posts_archive_right">
                        <div className="profile_post_filter">
                            <p style={{ fontSize: '25px' }}>Posts</p>
                            <select name="selectbycate" id="selectcat">
                                <option value="volvo">Recent Post</option>
                                <option value="volvo">Most Viewed</option>
                                <option value="saab">Most Reaction</option>
                                <option value="opel">Most Comment</option>
                            </select>
                        </div>

                        <div className="right_bottom_section">
                            <div className="frofile_posts">
                                <DashBordVideosComponents
                                    Videos={Videos}
                                />
                            </div>

                            <div className="profile_video_sec">
                                <p>videos</p>
                            </div>

                            <div className="profile_lives_sec">
                                <p>Lives</p>
                            </div>

                            <div className="profile_podcast_sec">
                                <p>podcasts</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBordVideos

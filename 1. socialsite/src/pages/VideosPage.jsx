import React, {useState} from 'react'
import axios from 'axios';
import { BackendHost } from '../Api/BackendHost';

const VideosPage = () => {
      //Get all posts
    const [Videos, setVideos] = useState(() => {
        axios.get(`${BackendHost}/api/videos/`)
        .then(res => setVideos(res.data))
    });

    return (
        <div className="posts_arcade">
            <div className="posts_main_videos">
                {Videos && Videos.map((video, index) => (
                    <div className="video_view" key={index}>
                        <div className="video">
                            <video 
                                controls 
                                controlsList="nodownload" 
                                poster={video.thumbnail}
                            >
                                <source src={video.video} type="video/mp4"/>
                            </video>
                        </div>

                        <div className="down_video_view">
                            <img 
                                className="video_profile_img"
                                src={video.ProfileItems.image} 
                                alt="" 
                            />

                            <div className="title_profile">
                                <p className="video_title">{video.title}</p>
                                <p className="video_username">{video.auhtor.user_name}</p>
                                <p className="video_post_time">{video.whenpublished}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VideosPage

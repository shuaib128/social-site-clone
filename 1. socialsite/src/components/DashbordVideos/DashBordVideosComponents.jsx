import React from 'react'
import { BackendHost } from '../../Api/BackendHost';
import { Link } from 'react-router-dom';

const DashBordVideosComponents = (props) => {
    return (
        <div className="dashBord_videos">
            {props.Videos && props.Videos.map((video, index) => (
                <div className="video_view" key={index}>
                    <div className="video">
                        <video 
                            controls 
                            controlsList="nodownload" 
                            poster={BackendHost + video.thumbnail}
                        >
                            <source src={BackendHost + video.video} type="video/mp4"/>
                        </video>
                    </div>

                    <div className="down_video_view">
                        <div>
                            <img 
                                className="video_profile_img"
                                src={BackendHost + video.ProfileItems.image} 
                                alt="" 
                            />

                            <div className="title_profile">
                                <p className="video_title">{video.title}</p>
                            </div>
                        </div>

                        <div>
                            <Link 
                                className="vid_manage_button" 
                                to={"/dashbord/videos/edit/" + video.id}>
                                Manage
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DashBordVideosComponents

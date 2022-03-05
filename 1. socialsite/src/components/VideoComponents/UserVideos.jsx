import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BackendHost } from '../../Api/BackendHost';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';

const UserVideos = (props) => {
    const [Videos, setVideos] = useState(() => {
        axios.get(`${BackendHost}/api/videos/video_user/${props.author && props.author.id}/`)
            .then(res => setVideos(res.data))
    });
    console.log(props.video_id);

    return (
        <div className='similler_videos'>
            {Videos && Videos.map((video, index) => {
                if (video.id !== props.video_id) {
                    return (
                        <Link to={`/videos/${video.id}`} target="_blank">
                            <div className="video_simmler" key={index}>
                                <img src={BackendHost + video.thumbnail} alt="d" />

                                <div className="similler_video_description">
                                    <p className="vid_title">{video.title}</p>

                                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                                        <Typography variant="body2" gutterBottom color={"#606060"}>
                                            30k views
                                        </Typography>
                                        <Typography variant="body2" gutterBottom color={"#606060"}
                                            style={{ marginLeft: 10 }}
                                        >
                                            {video.whenpublished}
                                        </Typography>
                                    </Box>
                                </div>
                            </div>
                        </Link>
                    )
                }
            })}
        </div>
    )
}

export default UserVideos
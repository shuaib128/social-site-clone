import React, { useState } from 'react'
import axios from 'axios';
import Video_ from '../components/VideoComponents/Video';
import VideoDescription from '../components/VideoComponents/VideoDescription';
import { useParams } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import { BackendHost } from '../Api/BackendHost';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';

const VideoDetail = () => {
    const { id } = useParams()
    const [Video, setVideo] = useState(() => {
        axios.get(`${BackendHost}/api/videos/${id}/`)
            .then((res) => {
                setVideo(res.data);
            })
    })
    if (!Video) return "Loading...";
    if (!Video) return "Error!";
    console.log(Video);

    return (
        <Container maxWidth="lg">
            <Box sx={{ flexGrow: 1 }} className="video_section">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={8} className="video_sections" style={{
                        width: "65%",
                    }}>
                        <Video_
                            Video={Video}
                        />
                        <VideoDescription
                            Video={Video}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} className="video_sections" style={{
                        width: "35%",
                    }}>
                        <h1>hey</h1>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default VideoDetail
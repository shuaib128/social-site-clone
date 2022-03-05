import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BackendHost } from '../Api/BackendHost';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const VideosPage = () => {
    //Get all posts
    const [Videos, setVideos] = useState(() => {
        axios.get(`${BackendHost}/api/videos/`)
            .then(res => setVideos(res.data))
    });

    return (
        <Container maxWidth="lg">
            <Box sx={{ flexGrow: 1 }} className="video_section">
                <Grid container spacing={2}>
                    {Videos && Videos.map((video, index) => (
                        <Grid item xs={12} sm={4} md={3} height="330px" key={index}
                            style={{
                                cursor: 'pointer'
                            }}
                        >
                            <Paper elevation={0} style={{ height: "180px" }}>
                                <Link to={`videos/${video.id}`}>
                                    <img className='video_img' src={video.thumbnail} />
                                </Link>
                            </Paper>

                            <Paper elevation={0} style={{ marginTop: 15, display: "flex" }}>
                                <Avatar alt="Remy Sharp" src={video.ProfileItems.image} />
                                <Paper elevation={0} style={{ marginLeft: 12 }}>
                                    <Typography fontWeight={500} variant="subtitle1" gutterBottom component="div">
                                        {video.title}
                                    </Typography>
                                    <Typography variant="caption" display="block" gutterBottom style={{ marginTop: 10 }}>
                                        {video.auhtor.username}
                                    </Typography>
                                    <Typography variant="caption" display="block" gutterBottom>
                                        {video.whenpublished}
                                    </Typography>
                                </Paper>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    )
}

export default VideosPage

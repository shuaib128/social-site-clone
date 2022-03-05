import React from 'react'
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const VideoDescription = (props) => {
    return (
        <Box>
            <Box sx={{
                display: "flex", flexDirection: "row",
                justifyContent: 'space-between', alignItems: 'center',
                marginTop: "20px"
            }}>
                <Box sx={{ display: "flex", flexDirection: "row" }} style={{
                    alignItems: 'center'
                }}>
                    <Avatar
                        alt="Remy Sharp"
                        src={props.Video.ProfileItems.image}
                        sx={{ width: 50, height: 50 }}
                    />
                    <Box style={{ marginLeft: "17px" }}>
                        <Typography variant="subtitle1" gutterBottom component="div" fontWeight="500" margin="0px">
                            {props.Video.auhtor.username}
                        </Typography>
                        <Typography variant="caption" display="block" gutterBottom style={{
                            margin: 0,
                            color: '#606060'
                        }}>
                            3.75M subscribers
                        </Typography>
                    </Box>
                </Box>

                <Button variant="contained" style={{ backgroundColor: "#c00" }}>
                    subscribe
                </Button>
            </Box>
            <Typography variant="body2" gutterBottom style={{
                marginLeft: "65px",
                marginTop: "20px"
            }}>
                {props.Video.description}
            </Typography>
            <Button variant="text" style={{
                color: "#606060",
                marginLeft: "57px",
            }}>
                show more
            </Button>
        </Box>
    )
}

export default VideoDescription
import React from 'react'
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import ViderInteractionComponents from './ViderInteractionComponents';

const Video_ = (props) => {
    return (
        <>
            <video
                controls
                controlsList="nodownload"
                autoPlay
                poster={props.Video.thumbnail}
            >
                <source src={props.Video.video} type="video/mp4" />
            </video>

            <Box style={{ marginTop: 10, borderBottom: "1px solid rgb(0 0 0 / 10%)", paddingBottom: '10px' }}>
                <Typography variant="h6" gutterBottom component="div">
                    {props.Video.title}
                </Typography>

                <Box sx={{
                    display: "flex", flexDirection: "row",
                    justifyContent: 'space-between', alignItems: 'center',
                    marginTop: "10px"
                }}>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography variant="body2" gutterBottom color={"#606060"}>
                            30,238,977 views
                        </Typography>
                        <Typography variant="body2" gutterBottom color={"#606060"}
                            style={{ marginLeft: 10 }}
                        >
                            {props.Video.pub_date.slice(0, 10)}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }}
                        style={{ marginLeft: 20 }}
                    >
                        <ViderInteractionComponents
                            icon={ThumbUpOutlinedIcon}
                            text={`${414}k`}
                        />

                        <ViderInteractionComponents
                            icon={ThumbDownOffAltOutlinedIcon}
                            text={`${24}k`}
                        />

                        <ViderInteractionComponents
                            icon={ShareOutlinedIcon}
                            text="share"
                        />

                        <ViderInteractionComponents
                            icon={ContentCutOutlinedIcon}
                            text="clip"
                        />

                        <ViderInteractionComponents
                            icon={SaveAltOutlinedIcon}
                            text="save"
                        />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Video_
import React from 'react'
import { Box } from '@mui/material';
import { Typography } from '@mui/material';

const ViderInteractionComponents = (props) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "row", marginRight: "20px", cursor: 'pointer' }}>
            <props.icon />
            <Typography variant="button" display="block" gutterBottom
                style={{ marginLeft: 7 }}
            >
                {props.text}
            </Typography>
        </Box>
    )
}

export default ViderInteractionComponents
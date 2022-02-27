import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const PostDetailLoading = () => {
    return (
        <div className='loadding-main'>
            <div style={{ height: '70%', width: "70%" }}>
                <Skeleton width="100%" height='30vh' />
                <div style={{marginTop: "10px"}}>
                    <Skeleton width="100%" height='70vh' />
                </div>
            </div>

            <div style={{ height: '100%', width: "28%", marginLeft: '2%' }}>
                <Skeleton width="100%" height='80vh' />
            </div>
        </div>
    )
}

export default PostDetailLoading
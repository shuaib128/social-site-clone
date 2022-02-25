import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const PostDetailLoading = () => {
    return (
        <div>
            <Skeleton width="80%" height={200} />
        </div>
    )
}

export default PostDetailLoading
import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const DashbordLoaadingComponnents = () => {
    return (
        <div className='loadding-main'>
            <div style={{
                width: "30%", height: "90vh"
            }}>
                <Skeleton width="100%" height='100%' />
            </div>

            <div style={{
                width: "68%", height: "90vh", marginLeft: "2%"
            }}>
                <div>
                    <Skeleton width="100%" height={200} />
                </div>
                <div style={{ marginTop: 10 }}>
                    <Skeleton width="100%" height={200} />
                </div>
                <div style={{ marginTop: 10 }}>
                    <Skeleton width="100%" height={200} />
                </div>
            </div>
        </div>
    )
}

export default DashbordLoaadingComponnents
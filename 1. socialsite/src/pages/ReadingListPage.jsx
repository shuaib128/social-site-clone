import React from 'react'
import { BackendHost } from '../Api/BackendHost'
import axios from 'axios'

const ReadingListPage = (props) => {
    if (!props.profileData.saved_posts) return "Loading...";
    if (!props.profileData.saved_posts) return "Error!";
    props.profileData.saved_posts.map((post) => {
        console.log(post.post_id);
    }) 
    return (
        <div className='posts_arcade'>
            <div
                className='profile_main'
                style={{
                    paddingTop: "25px", minHeight: '100vh'
                }}
            >
                <div className="listing_page_right">

                </div>

                <div className="reading_list">

                </div>
            </div>
        </div>
    )
}

export default ReadingListPage
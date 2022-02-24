import React from 'react'
import { Link } from 'react-router-dom';

const ReadingListPage = (props) => {
    return (
        <div className='posts_arcade'>
            <div className='profile_main reading_list_main'>
                <div className="listing_page_right">

                </div>

                <div className="reading_list">
                    {props.profileData.saved_posts && props.profileData.saved_posts.map((post, index) => {
                        return (
                            <div key={index} className="list">
                                <Link to={'/post/' + post.post_id}>
                                    <h3>{post.title}</h3>
                                </Link>
                                <div className="list_bottom">
                                    <p className="list_author">{post.Author}</p>
                                    <p className="date_publist_reading">{post.pubDate}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ReadingListPage
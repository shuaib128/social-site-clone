import React, { Fragment, useRef } from 'react'
import Glide from 'react-glidejs';
import 'react-glidejs/dist/index.css';
import CommentSection from './CommentSection';
import { Link } from 'react-router-dom';

const DetailsPostMiddle = (props) => {
    const gliderRef = useRef(null);

    return (
        <div className="details_post_middle">
            {props.post.images.length !== 0 ?
                <Glide
                    ref={gliderRef}
                    throttle={0}
                    customSlideAnimation={{
                        timeout: 500,
                        classNames: 'fade',
                    }}
                    type="slider"
                    slideClassName="slider__frame"
                    focusAt="center"
                >

                    {props.post.images.map((image, index) => {
                        return (
                            <Fragment>
                                <img src={image.image} />
                            </Fragment>
                        )
                    })}
                </Glide>
                :
                <div></div>
            }

            <div className="details_down">
                <h1 className="detail_post_title">{props.post.title}</h1>

                <ul className="tags_detail">
                    <li>html</li>
                    <li>webdev</li>
                    <li>javascrict</li>
                    <li>css</li>
                </ul>

                <div className="detail_profile_data">
                    <Link to={"/user/profile/" + props.post.ProfileItems.id}>
                        <img src={props.post.ProfileItems.image} />
                    </Link>

                    <p className="post_detail_user_name">{props.post.Author}</p>
                    <div className='post_detail_user_name_date'>
                        <p className="post_date_details">{props.post.pub_date}</p>
                        <p className="read_time_details">{props.post.get_readtime}</p>
                    </div>
                </div>

                <p className="details_post_sec">{props.post.description}</p>

                <CommentSection
                    post={props.post}
                    profileData={props.profileData}
                    username={props.username}
                />
            </div>
        </div>
    )
}

export default DetailsPostMiddle

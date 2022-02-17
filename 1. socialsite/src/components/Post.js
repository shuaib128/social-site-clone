import React from 'react'
import { Link } from 'react-router-dom';
import { BackendHost } from '../Api/BackendHost';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useHistory } from 'react-router-dom';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Post = (props) => {
    const history = useHistory()

    
    //Like dislike function
    const likeHandler = (postID) => {
        if(props.profileID === undefined){
            alert("You need to log in or create an account to like or comment")
            history.push("/login")
        }
        //Set liked user data by fetch
        fetch(`${BackendHost}/api/posts/like_dislike/${postID}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                profileID: props.profileID
            })
        })
        .then(response => response.json())
        .then(data => {
            document.querySelector(`.like${postID}`).querySelector(".num_of_likes").innerHTML = `${data.likes}`
            document.querySelector(`.like${postID}`).querySelector(".like_svg").innerHTML = `${data.likedorNotIcon}`
        })
        .catch((err) => console.log(err))
    }


    return (
        <>
        {props.posts && props.posts.map((post, index) => {
            return(
            <div className="post_" key={post.id}>
                {post.cover_image !== null ?
                    <div className="post_img">
                        <LazyLoadImage
                            alt={post.id}
                            // effect="blur"
                            src={post.cover_image}
                        />
                    </div>
                    :
                    <div></div>
                }

                <div className="post_bottom">
                    <div className="profile_post">
                        <Link to={"/user/profile/" + post.ProfileItems.id}>
                            <img src={post.ProfileItems.image} alt="post_image" />
                        </Link>
                        <p className="profile_name">
                            {post.Author}
                            <span 
                                style={{display: 'block', color:'#64707d', fontSize:'13px', marginTop: '3px'}}>
                                    {post.pub_date} ({post.whenpublished})
                            </span>
                        </p>
                    </div>

                    <div className="post_title_tags">
                        <p className="post_title">
                            <Link to={'/post/'+post.id}>{post.title}</Link>
                        </p>
                        <ul className="tags">
                            <li className="tag_">#react</li>
                            <li className="tag_">#javascript</li>
                            <li className="tag_">#pwa</li>
                            <li className="tag_">#node</li>
                        </ul>

                        <div className="post_bottom_">
                            <div className="post_bottom_right">
                                <div className={"like " + "like"+post.id} style={{marginRight: '7px'}} 
                                    onClick={() => likeHandler(post.id)}
                                >
                                    <div className="like_svg">
                                        {!post.likes.includes(props.profileID) ?
                                            <svg className="crayons-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"></path></svg>
                                           :<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" class="crayons-icon">
                                                <path d="M2.821 12.794a6.5 6.5 0 017.413-10.24h-.002L5.99 6.798l1.414 1.414 4.242-4.242a6.5 6.5 0 019.193 9.192L12 22l-9.192-9.192.013-.014z"></path>
                                            </svg>
                                        }
                                    </div>
                                    <p className="num_of_likes">{post.likes.length}</p>
                                </div>
                                <div className="like">
                                    <svg className="crayons-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path></svg>
                                    <p>{post.comments.length}</p>
                                </div>
                            </div>

                            <div className="post_bottom_left">
                                <p>{post.get_readtime} read</p>
                                <a href="#">Save</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
        })}
        </>
    )
}

export default Post

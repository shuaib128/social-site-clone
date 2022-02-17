import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Redirect} from "react-router-dom";
import { BackendHost } from '../../Api/BackendHost';

const DashbordVideoEditPageComponent = () => {
    //Get perametar and fetch post data
    const { id } = useParams()
    const [redirect, setRedirect] = useState(false);
    const [post, setPost] = useState(() => {
        axios.get(`${BackendHost}/api/videos/${id}/`)
          .then(res => setPost(res.data))
    });
    if (!post) return "Loading...";
    if (!post) return "Error!";


    const sendDeleteReq = () => {
        fetch(`${BackendHost}/api/videos/delete_video/${id}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })

        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to="/dashbord/videos"/>;
    }

    if(document.querySelector('.profile_detail_box').classList.contains('appire')){
        document.querySelector('.profile_detail_box').classList.toggle('appire')
    }

    
    return (
        <div className='posts_arcade'>
            <div className="profile_main modify_main">
                <div className="post_ post_modify">
                    <div className="post_bottom modyfy_post_bottom">
                        <div className="post_title_tags">
                            <p className="post_title">{post.title}</p>
                            <ul className="tags">
                                <li className="tag_">#react</li>
                                <li className="tag_">#javascript</li>
                                <li className="tag_">#pwa</li>
                                <li className="tag_">#node</li>
                            </ul>

                            <div className="post_bottom_ modify_post_bottom_">
                                <Link className='edit_' to={'/edit/video/' + post.id}>Edit</Link>
                                <a onClick={sendDeleteReq} className="Delete_">Delete</a>
                                <a className="edit_" href="#">Pin to profile</a>
                                <a className="edit_" href="#">Stats</a>
                                <a className="edit_" href="#">Archive</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashbordVideoEditPageComponent

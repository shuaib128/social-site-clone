import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { BackendHost } from '../Api/BackendHost';
import axios from 'axios';

const Header = (props) => {
    const [searchInput, setsearchInput] = useState("")

    const search = (e) => {
        e.preventDefault()

        props.setsearchDataInput(searchInput)
    }


    //Logout function
    const logout = () => {
        localStorage.removeItem("accestoken");

        props.setName('')
        props.setSserProfileImage('')
        props.setUserEmail('')
        props.setProfileID('')
        document.querySelector('.profile_detail_box').classList.toggle('appire')
    }

    const profileApper = () => {
        document.querySelector('.profile_detail_box').classList.toggle('appire')
    }

    //Load latest posts and go top
    const getLatestPost = () => {
        window.scrollTo(0, 0)

        axios.get(`${BackendHost}/api/posts/`).then((res) => props.setPost(res.data));
    }

    return (
        <>
            <div className="nav_section">
                <div className="nav_left">
                    <div className="logo_block" onClick={getLatestPost}>
                        <p><Link to="/">DEVZ</Link></p>
                    </div>
                    <form className="search_form__" onSubmit={search}>
                        <input
                            required
                            type="search"
                            id="search_blog"
                            placeholder="Search.."
                            onChange={e => setsearchInput(e.target.value)}
                        />
                    </form>
                </div>

                <div className="nav_right">
                    {props.username && props.username !== undefined ? <p className="user_name user_name_name">{props.username}</p>
                        : <div className="logIN_reg">
                            <p className="user_name"><Link to="/login">login</Link></p>
                            <p className="user_name"><Link to="/register">Register</Link></p>
                        </div>
                    }
                    <Link to="/new_post" className="write_post_btn">
                        Write a post
                    </Link>
                    <Link to="/new_video" className="write_post_btn video_post_button">
                        Post video
                    </Link>
                    <a className="message_btn" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="aaljmscfy2fv8sj0tsdlcoehqlaelnvy" className="crayons-icon"><title id="aaljmscfy2fv8sj0tsdlcoehqlaelnvy">Connect</title>
                            <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10H2l2.929-2.929A9.969 9.969 0 012 12zm4.828 8H12a8 8 0 10-8-8c0 2.152.851 4.165 2.343 5.657l1.414 1.414-.929.929zM8 13h8a4 4 0 11-8 0z"></path>
                        </svg>
                    </a>
                    <a className="notifications_btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-labelledby="a6k5lv1oldq9vyohzugxyg5ivm41g2f4" className="crayons-icon"><title id="a6k5lv1oldq9vyohzugxyg5ivm41g2f4">Notifications</title>
                            <path d="M20 17h2v2H2v-2h2v-7a8 8 0 1116 0v7zm-2 0v-7a6 6 0 10-12 0v7h12zm-9 4h6v2H9v-2z"></path>
                        </svg>
                    </a>
                    {props.username !== null ?
                        <img onClick={profileApper} className="profile_btn" src={BackendHost + props.userProfileImage} /> :
                        <img onClick={profileApper} className="profile_btn" src="" />
                    }
                    <div className="profile_detail_box">
                        <Link className="tp_profile_detail" to='/dashbord'>Dashboard</Link>
                        <a href="modify.html" className="profile_detail">Reading List</a>
                        <Link className="profile_detail" to='/settings'>Settings</Link>
                        <Link className="tp_profile_detail" to="/register" onClick={logout}>LogOut</Link>
                        <Link to="/new_post" className="write_post_btn">Write a post</Link>
                        <Link to="/new_video" className="write_post_btn video_post_button">
                            Post video
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header

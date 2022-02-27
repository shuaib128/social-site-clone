import React, { useState } from 'react';
import { Redirect, Link } from "react-router-dom";
import { BackendHost } from '../Api/BackendHost';
import jwt_decode from "jwt-decode";

const Login = (props) => {
    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        document.querySelector(".login_loading").style.display = "block"
        document.querySelector(".logIn_form_div").style.display = "none"

        const response = await fetch(`${BackendHost}/api/user/token/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                username,
                password
            })
        });
        const content = await response.json();

        if (content.access) {
            const content_decoded = jwt_decode(content.access)
            localStorage.setItem("accestoken", content.access)
            console.log(content);

            setRedirect(true);
            props.setName(content_decoded.username);
            props.setProfileID(content_decoded.user_id);
            if (document.querySelector('.profile_detail_box').classList.contains('appire')) {
                document.querySelector('.profile_detail_box').classList.toggle('appire')
            }
        }
        else {
            document.querySelector(".usernameerror").style.display = "block"

            document.querySelector(".login_loading").style.display = "none"
            document.querySelector(".logIn_form_div").style.display = "block"
        }
    }

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <div className="full_register posts_arcade">
            <div className='login_loading'>
                <img className='loading_img' src="/images/fireloading.svg" alt="" />
                <p style={{
                    textAlign: "center", fontSize: "20px", marginTop: "10px"
                }}>
                    Logging to account....
                </p>
            </div>

            <form className='res_form logIn_form_div' onSubmit={submit} style={{ width: '50%' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '50px' }}>Welcome to DEV Community</h1>

                <p className='lael'>Username</p>
                <input type="text" required
                    onChange={e => setEmail(e.target.value)}
                />
                <p className='lael'>Password</p>
                <input type="password" required
                    onChange={e => setPassword(e.target.value)}
                />
                <p className="usernameerror">Username or password Wrong!!</p>

                <button className='re_btn' type="submit">Log In</button>

                <p className="createaccount_a">
                    Dont have an account? <Link to="/register">Create Account</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;

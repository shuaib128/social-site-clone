import React, { useState } from 'react'
import {Redirect} from 'react-router-dom';
import { BackendHost } from '../Api/BackendHost';

const Register = () => {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const RegisterFormSubmit = async (e) => {
        e.preventDefault();

        await fetch(`${BackendHost}/api/user/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                email,
                password
            })
        });
        // setRedirect(true)
        document.querySelector('.profile_detail_box').classList.toggle('appire')
    }

    if(redirect){
        return <Redirect to="/login" />
    }

    return (
        <div className="full_register posts_arcade">
            <form className='res_form' onSubmit={RegisterFormSubmit} style={{width: '50%'}}>
                <h1 style={{textAlign: 'center', marginBottom: '50px'}}>Welcome to DEV Community</h1>

                <p className='lael'>User Name</p>
                <input type="text" required 
                    onChange={e => setName(e.target.value)}
                />

                <p className='lael'>Email</p>
                <input type="email" required 
                    onChange={e => setEmail(e.target.value)}
                />
                <p className='lael'>Password</p>
                <input type="password" required 
                    onChange={e => setPassword(e.target.value)}
                />

                <button className='re_btn' type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default Register

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BackendHost } from '../Api/BackendHost';

const Register = () => {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const RegisterFormSubmit = async (e) => {
        e.preventDefault();
        document.querySelector(".login_loading").style.display = "block"
        document.querySelector(".logIn_form_div").style.display = "none"

        const response = await fetch(`${BackendHost}/api/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                email,
                password
            })
        });
        const content = await response.json()

        if (content === "UNIQUE constraint failed: auth_user.username") {
            document.querySelector(".usernameerror").style.display = "block"

            document.querySelector(".login_loading").style.display = "none"
            document.querySelector(".logIn_form_div").style.display = "block"
        }
        if (content === "length_error") {
            document.querySelector(".length_error").style.display = "block"

            document.querySelector(".login_loading").style.display = "none"
            document.querySelector(".logIn_form_div").style.display = "block"
        }
        if (content === "digit_error") {
            document.querySelector(".digit_error").style.display = "block"

            document.querySelector(".login_loading").style.display = "none"
            document.querySelector(".logIn_form_div").style.display = "block"
        }
        if (content === "uppercase_error") {
            document.querySelector(".uppercase_error").style.display = "block"

            document.querySelector(".login_loading").style.display = "none"
            document.querySelector(".logIn_form_div").style.display = "block"
        }
        if (content === "lowercase_error") {
            document.querySelector(".lowercase_error").style.display = "block"

            document.querySelector(".login_loading").style.display = "none"
            document.querySelector(".logIn_form_div").style.display = "block"
        }
        if (content === "symbol_error") {
            document.querySelector(".symbol_error").style.display = "block"

            document.querySelector(".login_loading").style.display = "none"
            document.querySelector(".logIn_form_div").style.display = "block"
        }
        if (content === "sucess") {
            document.querySelector(".form_part").style.display = "none"
            document.querySelector(".sucessLogin").style.display = "block"
            document.querySelector(".login_loading").style.display = "none"
        }
    }

    return (
        <div className="full_register posts_arcade">
            <div className='login_loading'>
                <img className='loading_img' src="/images/fireloading.svg" alt="" />
                <p style={{
                    textAlign: "center", fontSize: "20px", marginTop: "10px"
                }}>
                    Creating Your account....
                </p>
            </div>

            <form className='res_form form_part logIn_form_div' onSubmit={RegisterFormSubmit} style={{ width: '50%' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '50px' }}>Welcome to DEV Community</h1>

                <p className='lael'>User Name</p>
                <input type="text" required
                    onChange={e => setName(e.target.value)}
                />
                <p className="usernameerror">User name already exists</p>

                <p className='lael'>Email</p>
                <input type="email" required
                    onChange={e => setEmail(e.target.value)}
                />
                <p className='lael'>Password</p>
                <input type="password" required
                    onChange={e => setPassword(e.target.value)}
                />

                <div>
                    <p className="length_error">Need At least 8 Charecters</p>
                    <p className="digit_error">Use Atlest one digit 0-9</p>
                    <p className="uppercase_error">Use uppercase letter A-Z</p>
                    <p className="lowercase_error">Use lowercase letters a-z</p>
                    <p className="symbol_error">Use some symbols @#$%^&*()</p>
                </div>
                <button className='re_btn' type="submit">Sign Up</button>
            </form>

            <div className="sucessLogin">
                <h1 className="suceess_account">Account Create sucessfull</h1>
                <Link to="/login">Log In</Link>
            </div>
        </div>
    )
}

export default Register

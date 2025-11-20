import { useState } from 'react'
import Cookies from 'js-cookie';
import './index.css'
import { Navigate, useNavigate } from 'react-router-dom';

const LoginForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const jwtToken = Cookies.get("jwt-token");

    if (jwtToken) {
        return <Navigate to="/" replace />;
    }

    const onChangeUsername = evt => {
        setUsername(evt.target.value);
    }

    const onChangePassword = evt => {
        setPassword(evt.target.value);
    }

    const onChangeForm = async evt => {

        evt.preventDefault();
        if (username === '' || password === '') {
            alert("fill the required filed.");
            return;
        }

        // const credentials = {
        //     username,
        //     password
        // };

        // const option = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(credentials)
        // };

        if (username === 'vinod' && password === 'vinod@123') {
            Cookies.set("jwt-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU", { expires: 4 });
            navigate("/");
        }


        // const response = await fetch('https://apis.ccbp.in/login', option);
        // const data = await response.json();



    }

    return (
        <div className="login-form-container">
            <form className="login-form" onSubmit={onChangeForm}>
                <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" alt="website" className="logo-img" />
                <div className="input-container">
                    <label htmlFor="username">USERNAME</label>
                    <input id="username" type="text" placeholder="USERNAME" onChange={onChangeUsername} />
                </div>
                <div className="input-container">
                    <label htmlFor="password" >PASSWORD</label>
                    <input id="password" type="text" placeholder="PASSWORD" onChange={onChangePassword} />
                </div>
                <button type="submit" className="login-btn">Login</button>
            </form>
        </div>
    )
}

export default LoginForm;
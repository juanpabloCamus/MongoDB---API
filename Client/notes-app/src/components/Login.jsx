import React, { useState } from "react";
import './Login.css';
import axios from 'axios';

function Login() {

    const [register, setRegister] = useState({
        name: '',
        username: '',
        password: ''
    })

    const [login, setLogin] = useState({
        username: '',
        password: ''
    })

    const handleRegister = (e) => {
        e.preventDefault();
        setRegister({
            ...register,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e, type) => {
        e.preventDefault();
        if (type === 'reg'){
            try {
                const response = await axios.post('http://localhost:3000/api/users', register);
                console.log(response)
            } catch (error) {
                console.error(error)
                alert(error.response.data)
            }
        }
        else{
            try {
                const response = await axios.post('http://localhost:3000/api/login', login);
                console.log(response)
                localStorage.setItem('user', JSON.stringify(response.data));
                window.location.reload()
            } catch (error) {
                console.error(error)
                alert(error.response.data)
            }
        }
    }

    return (
        <div className="registerAndLoginContainer">
            <div id="register" className="container">
                <form name="register" onSubmit={(e) => handleSubmit(e, 'reg')} className="signForm">
                    <input onChange={handleRegister} name="name" placeholder="Name"></input>
                    <input onChange={handleRegister} name="username" placeholder="Username"></input>
                    <input onChange={handleRegister} name="password" placeholder="Password"></input>
                    <button type="submit">Register</button>
                </form>
            </div>
            <div id="login" className="container">
                <form name="login" onSubmit={(e) => handleSubmit(e, 'log')} className="signForm">
                    <input onChange={handleLogin} name="username" placeholder="Username"></input>
                    <input onChange={handleLogin} name="password" placeholder="Password"></input>
                    <button type="submit">Login</button>
                </form>
            </div> 
        </div>
    );
}

export default Login
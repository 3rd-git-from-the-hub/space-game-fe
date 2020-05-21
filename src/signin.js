import React, { Component } from 'react'
import request from 'superagent';
import './test.css'

export default class Signin extends Component {

    state = {
        email: '',
        password: ''
    }

    handleSubmit = async(e) => {
        e.preventDefault();
        let token = await request.post('http://localhost:3001/signin', this.state)
        localStorage.setItem('TOKEN_KEY', token.body.token)
        // this props push to character selection page
    }

    handleChange = (e) => {
        const newState = {}
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    render() {
        // const {email, password} = this.state;
        return (
            <body>
<div class='limiter'>
    <div class='login-container'>
        <div class='wrap-login'>
        <span class="login100-form-title p-b-26">
            Login
        </span>
            <form onSubmit={this.submitHandle} class='login-form'>
                <div class='login-options'>
                    <div class='wrap-input'>
                        <label>
                            Email:
                            <input onChange={this.handleChange} name="email" />
                        </label>
                    </div>
                <div class='wrap-input-login'>
                    <label>
                    Password:
                        <input onChange={this.handleChange} name="password" />
                    </label>
                </div>
                </div>
                    <div class='container-form-btn'>
                        <div class='wrap-form-btn'>
                            <button>Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</body>
        )
    }
}

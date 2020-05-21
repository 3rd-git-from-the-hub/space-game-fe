import React, { Component } from 'react'
import request from 'superagent';

export default class Signup extends Component {

    state = {
        email: '',
        password: ''
    }

    handleSubmit = async(e) => {
        e.preventDefault();
        let token = await request.post('http://localhost:3001/auth/signup', this.state)

        localStorage.setItem('TOKEN_KEY', token.body.token)
        this.props.history.push('/characterselect')
    }

    handleChange = (e) => {
        const newState = {}
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }


    render() {
        const {email, password} = this.state;
        return (
            <>
                <script src="js/three.js"></script>
                
            <div className='limiter'>
                <div className='login-container'>
                    <div className='wrap-login'>
                    <span className="login100-form-title p-b-26">
                        Signup
                    </span>
                    <form onSubmit={this.handleSubmit}>
                            <div className='login-options'>
                                <div className='wrap-input'>
                                <label>
                            Email:
                            <input onChange={this.handleChange} name="email" value={email}/>
                        </label>
                                </div>
                            <div className='wrap-input-login'>
                            <label>
                            Password:
                            <input onChange={this.handleChange} name="password" value={password}/>
                        </label>
                            </div>
                            </div>
                                <div className='container-form-btn'>
                                    <div className='wrap-form-btn'>
                                        <button>Sign Up</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </>  
        )
    }
}

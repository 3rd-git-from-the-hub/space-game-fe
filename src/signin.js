import React, { Component } from 'react'
import request from 'superagent';

export default class signin extends Component {

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
        const {email, password} = this.state;
        return (
            <div>
                    <form onSubmit = { this.handleSubmit }>
                        <label>
                            Email:
                            <input onChange={this.handleChange} name="email" value={email}/>
                        </label>
                        <label>
                            Password:
                            <input onChange={this.handleChange} name="password" value={password}/>
                        </label>
                        <button>SUBMIT</button>
                    </form>
            </div>
        )
    }
}

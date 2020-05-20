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
            <div>
                    <form>
                        <input type='text'></input>
                    </form>
            </div>
        )
    }
}

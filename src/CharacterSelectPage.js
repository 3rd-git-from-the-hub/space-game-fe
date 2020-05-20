import React, { Component } from 'react'
import request from 'superagent'

export default class CharacterSelectPage extends Component {
    state = {
        id: 0
    }

    submitHandle = async(e) => {
        e.preventDefault();
        const shipChoice = await request.get(`http://localhost:3001/usership/${this.state.id}`)

      const finalChoice = shipChoice.body[0];

        const updatedProfile = await request.put(`http://localhost:3001/user`, {
            userId: 1,
            shipChoice: finalChoice
        })

        console.log(updatedProfile.body[0].user_ship);
        
    }
    render() {
        console.log(this.state.id)
        return (
            <div>
            <form onSubmit={this.submitHandle}>
                <label> 
                    Spaceship 1
                <input type='radio' value='1'onChange = {(e) => this.setState({ id: e.target.value})} name='spaceship' defaultChecked/>
                </label>
                <label>
                    Spaceship 2
                <input type='radio' value='2' onChange = {(e) => this.setState({ id: e.target.value})} name='spaceship'/>
                </label>
                <button>Submit</button>
            </form>
            </div>
        )
    }
}

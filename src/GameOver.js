import React, { Component } from 'react'
import request from 'superagent';


export default class GameOver extends Component {

    state = {
       final_message: '' ,
       times_won: ''
    } 

    async componentDidMount() {
        if(this.props.hull <= 0) {
            this.setState({ final_message: 'omg you blew up' }) 
        } else if (this.props.fuel <= 0) {
            this.setState({ final_message: 'you drift through space forever' })
        } else {
            // update the user wins here
            // doesn't seem to work
            console.log('this is the end');
            await request.put('http://localhost:3001/api/loggedinuser')
            .set('Authorization', this.props.token)
            this.setState({ final_message: 'you found a new home! yay!' })
            const winData = await request.get('http://localhost:3001/api/loggedinuser')
            .set('Authorization', this.props.token)
            console.log(winData.body[0].score)
            this.setState({ times_won: winData.body[0].score })
        }
    }

    render() {
        return (
            
            <div>
                <p> random text {this.state.final_message}</p>
            <p>You have won {this.state.times_won} times!</p>
            </div>
        )
    }
}

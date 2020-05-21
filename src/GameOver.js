import React, { Component } from 'react'
import request from 'superagent';


export default class GameOver extends Component {

    state = {
       final_message: '' ,
       times_won: ''

    } 

    async componentDidMount() {
        if(this.props.hull <= 0) {
            this.setState({ final_message: `The people of Earth realize that something must have gone wrong. They mourne your loss and raise a memorial in your name. You provide the courage for future Travelers to take the journey.` }) 
        } else if (this.props.fuel <= 0) {
            this.setState({ final_message: `'Fuel: 1%... Fuel: 0%... You look at the monitor defeated. You send the data you've received back to Earth, hoping the next Traveler will have better luck than you.`})
        } else {

            this.setState({ final_message: `Your monitor brings up your location. "Planet: JDXDJ73J39" A smile crosses your face as you let out a sigh or relief. You found it...Gaia. You quickly send a message back to Earth with your location. Finally a new home....` })
        }
    }

    render() {
        return (
            
            <div>

                <p>{this.state.final_message}</p>

            <p>You have won {this.state.times_won} times!</p>

            </div>
        )
    }
}

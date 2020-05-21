import React, { Component } from 'react'



export default class GameOver extends Component {

    state = {
       final_message: '' 
    } 

    componentDidMount() {
        if(this.props.hull <= 0) {
            this.setState({ final_message: 'omg you blew up' }) 
        } else if (this.props.fuel <= 0) {
            this.setState({ final_message: 'you drift through space forever' })
        } else {
            this.setState({ final_message: 'you found a new home! yay!' })
        }
    }

    render() {
        return (
            
            <div>
                <p> random text {this.state.final_message}</p>
            </div>
        )
    }
}

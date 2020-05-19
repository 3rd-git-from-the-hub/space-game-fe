import React, { Component } from 'react'
import request from 'superagent'

export default class PlanetPage extends Component {
    state = {
        event: {
            event_choices: []
        }
    }


    async componentDidMount() {
        let fetchedEvent = await request.get(`http://localhost:3001/events/${this.props.planet.id}`)
        console.log(this.props.planet.id, 'id')
        console.log(fetchedEvent)
        console.log(fetchedEvent.body[0].event_choices.map(event => JSON.parse(event)), 'im here jacob')
        this.setState({ event: fetchedEvent.body[0] })
    }




    render() {
        console.log(this.state.event.event_choices)
        return (
            <div>
                <p>{this.state.event.event_image}</p>
                <p>{this.state.event.event_name}</p>
                <p>{this.state.event.event_description}</p>
                {this.state.event.event_choices.map(event => JSON.parse(event)).map(
                    event => <div> 
                        <p>DESCRIPTION: {event.choice_description}</p> 
                        <p> ROLL NEEDED: {event.roll_needed}</p>
                        </div>
                                )
            }
            </div>
        )
    }
}

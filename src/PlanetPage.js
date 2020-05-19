import React, { Component } from 'react'
import request from 'superagent'

export default class PlanetPage extends Component {
    state = {
        event: {
            event_choices: []
        },
        eventChoices: [],
        results: ''
    }


    async componentDidMount() {
        let fetchedEvent = await request.get(`http://localhost:3001/events/${this.props.planet.id}`)
        console.log(this.props.planet.id, 'id')
        console.log(fetchedEvent)
        console.log(fetchedEvent.body[0].event_choices.map(event => JSON.parse(event)), 'im here jacob')
        const eventChoices = fetchedEvent.body[0].event_choices.map(event => JSON.parse(event))
        this.setState({ event: fetchedEvent.body[0], eventChoices: eventChoices })
    }

    choiceMade = (index) => {
        let chosenChoice = this.state.eventChoices[index];
        let roll_type = chosenChoice.roll_type;
        let rollNeeded = chosenChoice.roll_needed;
        let ship = this.props.userShip;
        let userRoll = Math.ceil(Math.random() * 10)
        userRoll += ship[`base_${roll_type}`]
        if(userRoll >= rollNeeded) {
            this.setState({results: chosenChoice.result.sucess})
        }
        console.log(rollNeeded, 'roll needed')
        console.log(userRoll, 'user roll')
    }
    //this.props.userShip

    //add button to choices and submit, run function that checks if roll is good enough, if success provide the success message and success results, if fail provide the fail, update player stats for ship, check if player dies, if player doesn't die send back to planet screen.

    //CREATE PLAYER OBJECT we need to decide if creating blank player object in backend that player can reset or storing in local storage.

    render() {
        console.log(this.state.eventChoices)
        console.log(this.state.results, 'its me results')
        return (
            <div>
                <p>{this.state.event.event_image}</p>
                <p>{this.state.event.event_name}</p>
                <p>{this.state.event.event_description}</p>
                {!this.state.results && this.state.event.event_choices.map(event => JSON.parse(event)).map(
                    (event, index) => <div>
                        <p>DESCRIPTION: {event.choice_description}</p>

                        <button onClick= {() => this.choiceMade(index)}>Submit</button>

                        </div>
                                )
            }
            {this.state.results && <p>{this.state.results}</p>}
            </div>
        )
    }
}

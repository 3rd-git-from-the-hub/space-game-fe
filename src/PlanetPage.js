import React, { Component } from 'react'
import request from 'superagent'
// import { isGameOver } from './Game.js'

export default class PlanetPage extends Component {
    state = {
        event: {
            event_choices: []
        },
        eventChoices: [],
        results: '',
        rewards: [],
        rollNeeded: '',
        userRoll: ''
    }

    async componentDidMount() {
        let fetchedEvent = await request.get(`http://localhost:3001/events/${this.props.planet.id}`)
        const eventChoices = fetchedEvent.body[0].event_choices.map(event => JSON.parse(event))
        this.setState({ event: fetchedEvent.body[0], eventChoices: eventChoices })
    }

    choiceMade = (index) => {
        let chosenChoice = this.state.eventChoices[index];
        let roll_type = chosenChoice.roll_type;
        let rollNeeded = chosenChoice.roll_needed;
        let ship = this.props.shipStats;
        let userRoll = Math.ceil(Math.random() * 10)
        userRoll += ship[`base_${roll_type}`]
        let arr = [];
        if(userRoll >= rollNeeded) {
            const successArray = [chosenChoice.rewards.success_fuel, chosenChoice.rewards.success_credit, chosenChoice.rewards.success_health]
            arr = successArray;
            
            this.setState({ results: chosenChoice.result.sucess, rewards: successArray, userRoll: userRoll, rollNeeded: rollNeeded })
        } else {
            const failureArray = [chosenChoice.rewards.failure_fuel, chosenChoice.rewards.failure_credit, chosenChoice.rewards.failure_health];
            arr = failureArray;
            this.setState({ results: chosenChoice.result.failure, rewards: failureArray, userRoll: userRoll, rollNeeded: rollNeeded })
        }
        this.props.applyShipStats(arr[2], arr[0], arr[1])

    }
    //this.props.userShip
    // this is kind of the stat check function
    goToNextPage = () => {
        if(this.props.shipHull > 0 && this.props.shipFuel > 0) {
            console.log('tset')
            this.props.history.push('/')
        }

        if (this.props.shipHull <= 0) {
            console.log('tset')
            this.props.history.push('/gameOver')
        }
        if (this.props.shipFuel <= 0) {
            console.log('tset')
            this.props.history.push('/gameOver')
        }
    }
    

    //add button to choices and submit, run function that checks if roll is good enough, if success provide the success message and success results, if fail provide the fail, update player stats for ship, check if player dies, if player doesn't die send back to planet screen.

    //CREATE PLAYER OBJECT we need to decide if creating blank player object in backend that player can reset or storing in local storage.

    render() {
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
            {this.state.results && <div>
                <p>{this.state.results}</p>
                <p>You needed a {this.state.rollNeeded} and rolled a with bonuses applied {this.state.userRoll}</p>
                <ul>
                    <li>Health change: {this.state.rewards[2]}</li>
                    <li>Fuel change: {this.state.rewards[0]}</li>
                    <li>Credit change: {this.state.rewards[1]}</li>
                </ul>
             
                <button onClick={this.goToNextPage}>Continue</button>

                </div>}
            </div>
        )
    }
}

import React, { Component } from 'react'
import request from 'superagent'
import './planetpage.css'

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
        let fetchedEvent = await request.get(`https://guarded-reef-50217.herokuapp.com/events/${this.props.planet.id}`)
        // nice use of .map here
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
        this.props.applyShipStats(arr[2], arr[0], arr[1]) // Why not just have the function take in the whole array?

    }
    goToNextPage = () => {
        if(this.props.shipHull > 0 && this.props.shipFuel > 0) {
            this.props.history.push('/board')
        }
        if (this.props.shipHull <= 0) {
            this.props.history.push('/gameOver')
        }
        if (this.props.shipFuel <= 0) {
            this.props.history.push('/gameOver')
        }
        this.props.clearPlanetFunction() // usually I like functions to be verbs, so keeping the word function out would feel better
    }

    render() {
        return (
            <div className="planet-page-container">
                <div className="event-image-container">
                    <img className="event-image" src={this.state.event.event_image} alt=""/>
                </div>
                <div className="text-section">
                    <div className="event-title">
                        <p className="title">{this.state.event.event_name}</p>
                        <p>{this.state.event.event_description}</p>
                    </div>
                    <div className="event-details">
                    {!this.state.results && this.state.event.event_choices.map(event => JSON.parse(event)).map(
                        (event, index) => <div>
                            <p>{event.choice_description}</p>

                            <button className="button" onClick= {() => this.choiceMade(index)}>Choose</button>

                            </div>
                                    )
                }
                </div>
                {this.state.results && <div className="planet-results">
                    <p>{this.state.results}</p>
                    <p>You needed a {this.state.rollNeeded} and your total roll was {this.state.userRoll}.</p>
                    <ul>
                        {/* I feel like rewards would have been easier to manage if they were an object instead of an array */}
                        <li>Hull change: {this.state.rewards[2]}</li> 
                        <li>Fuel change: {this.state.rewards[0]}</li>
                        <li>Credit change: {this.state.rewards[1]}</li>
                    </ul>
                
                    <button className="button" onClick={this.goToNextPage}>Continue Your Search</button>

                    </div>}
                </div>
            </div>
        )
    }
}

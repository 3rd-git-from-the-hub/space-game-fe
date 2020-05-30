import React, { Component } from 'react'
import './characterSelect.css';
import diplomacy from './photos/spaceships/diplomacy_rocket.png'
import combat from './photos/spaceships/combat_rocket.png'
import science from './photos/spaceships/biology_rocket.png'

export default class CharacterSelectPage extends Component {

    onClick = () => {
        this.props.history.push('/board')
    }

    render() {
        return (
        <body>
            <div className='limiter'>
                <div className='space-container login-container'>
                    <div className='wrap-login'>
                        <div>
                            <span id='instructions'><p>You have been sent by Earth to find a new planet for human kind. <br></br>Travel along the black holes to enter new universes and find new planets for your people. <br/>
                            1. Click on a planet and decide if you want to land on the planet <br/>
                            2. If you choose to land, be prepared to take any action necessary to ensure <br/>the success of your mission! <br/>
                            3. Keep a look out for the planet called Orion. No one has been there but <br/>rumor has it that it is supposed to be our next best shot at survival.</p>
                             </span>
                        </div>
                    <span className="login100-form-title p-b-26">
						Choose Your Vessel
					</span>
                        <form onSubmit={this.props.submitHandle} className='login-form'>
                            <div className='ship-options'>
                        {/* Feels like these should be componentized then made into an array of data and mapped over */}
                            <div className='wrap-input'>
                                <label>
                                <input type='radio' value='1' onChange = {this.props.handleChange} name='spaceship' className='rocketRadio' defaultChecked/>
                                <img src={diplomacy} alt='diplomacy_rocket' className='rocketPic'/>
                                <figcaption>The Reach</figcaption>
                                </label>
                            </div>
                            <div className='wrap-input'>
                                <label>
                                <input type='radio' value='2' onChange = {this.props.handleChange} 
                                name='spaceship'
                                className='rocketRadio'/>
                                <img src={combat} alt='diplomacy_rocket' className='rocketPic'/>
                                <figcaption>The Avenger</figcaption>
                                </label>
                            </div>
                            <div className='wrap-input'>
                                <label>
                                <input type='radio' value='3' onChange = {this.props.handleChange} name='spaceship' className='rocketRadio' defaultChecked/>
                                <img src={science} alt='diplomacy_rocket' className='rocketPic'/>
                                <figcaption>The Icarus</figcaption>
                                </label>
                            </div>
                            </div>
                            <div className='container-form-btn'>
                                <div className='wrap-form-btn'>
                                    <button className='login-form-button'>Finalize Ship Choice</button>
                                    
                                </div>
                            </div>
                        </form>
                        <button onClick={this.onClick} className='login-form-button'>Start Your Journey</button>
                    </div>
                </div>

            </div>
        </body>
        )
    }
}

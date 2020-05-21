import React, { Component } from 'react'
import './characterSelect.css';
import diplomacy from './photos/spaceships/diplomacy_rocket.png'
import combat from './photos/spaceships/combat_rocket.png'

export default class CharacterSelectPage extends Component {

    onClick = () => {
        this.props.history.push('/board')
    }

    render() {
        return (
        <body>
            <div className='limiter'>
                <div className='login-container'>
                    <div className='wrap-login'>
                    <span className="login100-form-title p-b-26">
						Choose Your Vessel
					</span>
                        <form onSubmit={this.props.submitHandle} className='login-form'>

                            <div className='ship-options'>
                            <div className='wrap-input'>
                                <label>
                                <input type='radio' value='1' onChange = {this.props.handleChange} name='spaceship' className='rocketRadio' defaultChecked/>
                                <img src={diplomacy} alt='diplomacy_rocket' className='rocketPic'/>
                                <figcaption>Vessel 1</figcaption>
                                </label>
                            </div>
                            <div className='wrap-input'>
                                <label>
                                <input type='radio' value='2' onChange = {this.props.handleChange} 
                                name='spaceship'
                                className='rocketRadio'/>
                                <img src={combat} alt='diplomacy_rocket' className='rocketPic'/>
                                <figcaption>Vessel 2</figcaption>
                                </label>
                            </div>
                            </div>
                            <div className='container-form-btn'>
                                <div className='wrap-form-btn'>
                                    <button className='login-form-button'>Finalize Vessel Choice</button>
                                    
                                </div>
                            </div>
                        </form>
                        <button onClick={this.onClick}>Start Your Journey</button>
                    </div>
                </div>

            </div>
        </body>
        )
    }
}

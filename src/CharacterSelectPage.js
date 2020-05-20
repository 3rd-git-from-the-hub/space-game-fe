import React, { Component } from 'react'
import './characterSelect.css';
import diplomacy from './photos/spaceships/diplomacy_rocket.png'
import combat from './photos/spaceships/combat_rocket.png'

export default class CharacterSelectPage extends Component {
   

  
    render() {
        return (
        <body>
            <div class='limiter'>
                <div class='login-container'>
                    <div class='wrap-login'>
                    <span class="login100-form-title p-b-26">
						Choose Your Spaceship
					</span>
                        <form onSubmit={this.props.submitHandle} class='login-form'>

                            <div class='ship-options'>
                            <div class='wrap-input'>
                                <label>
                                <input type='radio' value='1' onChange = {this.props.handleChange} name='spaceship' defaultChecked/>
                                <img src={diplomacy} alt='diplomacy_rocket' className='rocketPic'/>
                                <figcaption>Spaceship 1</figcaption>
                                </label>
                            </div>
                            <div class='wrap-input'>
                                <label>
                                <input type='radio' value='2' onChange = {this.props.handleChange} 
                                name='spaceship'/>
                                <img src={combat} alt='diplomacy_rocket' className='rocketPic'/>
                                <figcaption>Spaceship 2</figcaption>
                                </label>
                            </div>
                            </div>
                            <div class='container-form-btn'>
                                <div class='wrap-form-btn'>
                                    <button class='login-form-button'>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </body>
        )
    }
}

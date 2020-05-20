import React, { Component } from 'react'


export default class CharacterSelectPage extends Component {
   

  
    render() {
        return (
            <div>
            <form onSubmit={this.props.submitHandle}>
                <label> 
                    Spaceship 1
                <input type='radio' value='1'onChange = {this.props.handleChange} name='spaceship' defaultChecked/>
                </label>
                <label>
                    Spaceship 2
                <input type='radio' value='2' onChange = {this.props.handleChange} name='spaceship'/>
                </label>
                <button>Submit</button>
            </form>
            </div>
        )
    }
}

import React, { Component } from 'react'


export default class CharacterSelectPage extends Component {

    onClick = () => {
        this.props.history.push('/board')
    }

    render() {
        return (
            <div>
            <form onSubmit= {this.props.submitHandle}>
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
            <button onClick={this.onClick}>Head to Space!</button>
            </div>
        )
    }
}

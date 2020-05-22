import React, { Component } from 'react'
import './BoardSpace.css'

export default class BoardSpace extends Component {
    state={
        ship_name: ''
    }
    componentDidMount = () => {
        const shipName = localStorage.getItem('SHIP_NAME')
        this.setState=({ship_name: shipName})
    }

    hasWon = () => {
        if(this.props.hasWon === true) {
            
        }}

    render() {
        const row = this.props.row;
        const col = this.props.col;
        // 0: no fly , 1: planet , 2: fly path , 3: space station, 4: goal
        const boardSpaceType = this.props.boardSpaceType;
        let extraClassName;
        let spaceShipClass = '';
        // make this a switch statement
        if(boardSpaceType === 0) {
            extraClassName = 'nofly'
        } else if(boardSpaceType === 1) {
            extraClassName = 'planet'
        } else if(boardSpaceType === 2) {
            extraClassName = 'flypath'
        } else if(boardSpaceType === 4) {
            extraClassName = 'goal'
        } else if(boardSpaceType === 3) {
            extraClassName = 'station'
        }

        if(row === this.props.spaceship[0] && col === this.props.spaceship[1]) {

            spaceShipClass = 'spaceship'
        }

        return (
            <div className={`boardspace ${extraClassName} ${spaceShipClass}`} 
            onClick={() => this.props.onClick(row, col)}
            >

            </div>
        )
    }
}

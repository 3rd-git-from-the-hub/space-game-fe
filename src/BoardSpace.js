import React, { Component } from 'react'
import './BoardSpace.css'

export default class BoardSpace extends Component {
    render() {
        // 0: no fly , 1: planet , 2: fly path , 3: space station, 4: goal
        const boardSpaceType = this.props.boardSpaceType;
        let extraClassName;
        // make this a switch statement
        if(boardSpaceType === 0) {
            extraClassName = 'nofly'
        } else if(boardSpaceType === 1) {
            extraClassName = 'planet'
        } else if(boardSpaceType === 2) {
            extraClassName = 'flypath'
        } else if(boardSpaceType === 4) {
            extraClassName = 'goal'
        }

        return (
            <div className={`boardspace ${extraClassName}`}>

            </div>
        )
    }
}

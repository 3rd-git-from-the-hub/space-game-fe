import React, { Component } from 'react'
import BoardSpace from './BoardSpace.js';
import './Board.css'
import request from 'superagent'

export default class Board extends Component {
    
    isMoveInRange = (spaceShipPosition, possiblePosition) => {

        if(spaceShipPosition[0] + 1 === possiblePosition[0] || spaceShipPosition[0] - 1 === possiblePosition[0]) {
            this.setState({ spaceShipPosition: [possiblePosition[0], possiblePosition[1]]})
        } else if (spaceShipPosition[1] + 1 === possiblePosition[1]) {
            this.setState({ spaceShipPosition: [possiblePosition[0], possiblePosition[1]]})
        } else {
            console.log('NOT VALID MOVE')
        }
    }

    locationReveal = async(attemptedClick) => {
        let x = attemptedClick
        if(x === 2) {
            let fetchedPlanet = await request.get('http://localhost:3001/randomplanet')
            let planet = fetchedPlanet.body
            console.log(fetchedPlanet.body.length, 'im the length')
            const planetIndex = Math.floor(Math.random()* fetchedPlanet.body.length)
            this.setState({ planet: planet[planetIndex] })
            console.log(planet[planetIndex], 'im the planet')
        }
    }

    handleSpacePress = async (col, row) => {
        console.log(col, row, 'col row')
        let attemptedClick = this.state.grid[col][row]
        let proposedPosition = [col, row]
        if(attemptedClick === 0) {
            proposedPosition = this.state.spaceShipPosition
            console.log('sorry not a good move')
        } else {
            this.setState({ possiblePosition: [col, row] })
        }

        this.isMoveInRange(this.state.spaceShipPosition, proposedPosition)
        this.locationReveal(attemptedClick)

    }
    // 0: no fly , 1: planet , 2: fly path , 3: space station, 4: goal
    state = { grid: 
    [
    [2, 2, 2, 1],
    [0, 3, 4],
    ],
    spaceShipPosition: [0, 0],
    possiblePosition: [],
    planet: {}
    }
    render() {
        console.log(this.state.spaceShipPosition, 'spaceship position in render')
        const grid = this.state.grid;
        return (
            <div className='board-container'>
                {grid.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex}>
                            {
                                row.map((boardSpace, boardSpaceIndex) => {
                                    return <BoardSpace 
                                    key={boardSpaceIndex}
                                    boardSpaceType={boardSpace}
                                    spaceship={this.state.spaceShipPosition}
                                    row={rowIndex}
                                    col={boardSpaceIndex}
                                    onClick={(row, col) => this.handleSpacePress(row, col)}
                                    />
                                })
                            }

                        </div>
                    )
                })}

            </div>
        )
    }
}

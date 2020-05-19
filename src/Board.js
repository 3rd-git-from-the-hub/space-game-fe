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

    handleSpacePress = async (col, row) => {
        console.log(col, row, 'col row')
        let attemptedClick = this.state.grid[col][row]
        let proposedPosition = [col, row]
        if(attemptedClick === 0) {
            console.log('sorry not a good move')
        } else {
            this.setState({ possiblePosition: [col, row] })
        }

        this.isMoveInRange(this.state.spaceShipPosition, proposedPosition)

        console.log(this.state.spaceShipPosition, 'ship position')
        console.log(proposedPosition, 'possible position')
        
        // top left to make a planet picture, description, two new buttons: explore, move on
    }

    

    

    // 0: no fly , 1: planet , 2: fly path , 3: space station, 4: goal
    state = { grid: 
    [
    [2, 2, 2, 1],
    [0, 3, 4],
    ],
    spaceShipPosition: [0, 0],
    possiblePosition: []
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

import React, { Component } from 'react'
import BoardSpace from './BoardSpace.js';
import './Board.css'
import request from 'superagent'

export default class Board extends Component {
    handleSpacePress = async (row, col) => {
        console.log(row, col)
        console.log(this.state.grid[row][col])
        // top left to make a planet picture, description, two new buttons: explore, move on
    }

    

    // 0: no fly , 1: planet , 2: fly path , 3: space station, 4: goal
    state = { grid: 
    [[2, 2, 1],
    [0, 3, 4],
    ],
    spaceShipPosition: [0, 0]
    }
    render() {
        console.log(this.state)
        const grid = this.state.grid;
        return (
            <div className='board-container'>
                {grid.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex}>
                            {
                                row.map((boardSpace, boardSpaceIndex) => {
                                    console.log(boardSpace)
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

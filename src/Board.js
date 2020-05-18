import React, { Component } from 'react'
import BoardSpace from './BoardSpace.js';

export default class Board extends Component {
    // 0: no fly , 1: planet , 2: fly path , 3: space station, 4: goal
    state = { grid: 
    [[2, 2, 1],
    [0, 3, 4],
    ]
    }
    render() {
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

import React, { Component } from 'react'
import BoardSpace from './BoardSpace.js';
import './Board.css'
import { Link } from 'react-router-dom'

export default class Board extends Component {
    
    
    // 0: no fly , 1: planet , 2: fly path , 3: space station, 4: goal
    
    render() {
        console.log(this.props.spaceShipPosition, 'spaceship position in render')
      
        const grid = this.props.grid;
        return (
        <section>
            {
                this.props.planet && <div>
                    <p>{this.props.planet.location_name}</p>
                    <p>{this.props.planet.location_description}</p>
                    <p>{this.props.planet.location_image}</p>

                    <Link to='/planet'>Explore Planet</Link>
                    <button>Continue Your Journey</button>

                </div>
            }
            <div className='board-container'>
                {grid.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex}>
                            {
                                row.map((boardSpace, boardSpaceIndex) => {
                                    return <BoardSpace 
                                    key={boardSpaceIndex}
                                    boardSpaceType={boardSpace}
                                    spaceship={this.props.spaceShipPosition}
                                    row={rowIndex}
                                    col={boardSpaceIndex}
                                    onClick={(row, col) => this.props.handleSpacePress(row, col)}
                                    />
                                })
                            }

                        </div>
                    )
                })}
            </div>
        </section>
        )
    }
}

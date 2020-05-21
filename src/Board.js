import React, { Component } from 'react'
import BoardSpace from './BoardSpace.js';
import './Board.css'
import { Link } from 'react-router-dom'

export default class Board extends Component {

    goToNextPage = () => {
        if(this.props.planet) {
            this.props.history.push('/planet')
        }
        if (this.props.hasWon === true) {
            this.props.history.push('/gameover')
        }
        // if (this.props.planet.)
    }

    checkPlanet = (planet) => {
        for(let key in planet) {
            if(planet.hasOwnProperty(key))
            return false;
        }
        return true;
    }

    render() {
        let planet = this.checkPlanet(this.props.planet)
        console.log(planet, 'planet')
        const grid = this.props.grid;
        return (
        <section>
            {
                this.props.planet && <div>
                    <p>{this.props.planet.location_name}</p>
                    <p>{this.props.planet.location_description}</p>
                    <p>{this.props.planet.location_image}</p>
                {planet
                    ? <h1>Keep Exploring For Earth 2</h1>
                    : <button onClick={this.goToNextPage}>Explore Planet</button>
                }
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

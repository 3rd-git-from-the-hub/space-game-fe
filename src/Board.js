import React, { Component } from 'react'
import BoardSpace from './BoardSpace.js';
import './Board.css';

export default class Board extends Component {

    goToNextPage = () => {
        if(this.props.planet.location_name === 'Open space') {
            this.props.history.push('/gameover')
        } else if (this.props.hasWon === true) {
            this.props.history.push('/gameover')
        } else if(this.props.planet) {
            this.props.history.push('/planet')
        }
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
            <div className="top-container">
            <div className="top-left-container">
            {
                this.props.planet && <div className="top-left-test">
                    <div>
                        <p>Planet Name: {this.props.planet.location_name}</p>
                        <p>Scan Complete: {this.props.planet.location_description}</p>
                    
                 {planet
                    ? <h3>Continue Your Voyage</h3>
                    : <button onClick={this.goToNextPage}>Investigate Planet</button>
                }   
                    </div>
                    <div>
                        <img className="planet-image" src={this.props.planet.location_image} alt=''/>
                    </div>
                </div>
            
            }
            </div>
            <div className="top-right-container">
                <p>Status Report</p>
                <p>Ship Hull: {this.props.shipHull}</p>
                <p>Ship Fuel: {this.props.shipFuel}</p>
                <p>Credits: {this.props.shipCredits}</p>
            </div>
            </div>
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

import React, { Component } from 'react'
import BoardSpace from './BoardSpace.js';
import './Board.css';

export default class Board extends Component {
    state = {
        background_color: '',
        border_color: '',
        text_color: ''
    }
    componentDidMount = () => {
        const color_scheme = localStorage.getItem('COLOR_SCHEME')
        const parsedScheme = JSON.parse(color_scheme)

        this.setState({ background_color: parsedScheme.background_clr,
        border_color: parsedScheme.border_clr,
        text_color: parsedScheme.font_clr
        })
    }

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
        
        const grid = this.props.grid;
        return (
        <section>
            <div className="top-container">

            <div className="top-left-container">
                {
                    this.props.planet && <div className="top-left-test">
                        <div className='scan-text'>
                            <p>Planet Name: {this.props.planet.location_name}</p>
                            <p>Scan Complete: {this.props.planet.location_description}</p>
                            {planet
                            ? <h3>No Planet Detected: Continue Your Voyage</h3>
                            : <button className="button" onClick={this.goToNextPage}>Investigate Planet</button>
                             }   
                        </div>
                        <div>
                            {this.props.planet.location_image && <img className="planet-image" src={this.props.planet.location_image} alt=''/>}
                        </div>
                    </div>
            
                }
            </div>
            <div className="top-right-container">
                <div className='top-right-inner-container' style={
                    {color: `#${this.state.text_color}`,
                    backgroundColor: `#${this.state.background_color}`}
                }>
                    <p>Status Report</p> 
                    <p>Ship Hull: {this.props.shipHull}</p>
                    <p>Ship Fuel: {this.props.shipFuel}</p>
                    <p>Credits: {this.props.shipCredits}</p>
                </div>
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

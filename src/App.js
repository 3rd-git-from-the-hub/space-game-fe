import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
    Link,
} from "react-router-dom";
import Board from './Board.js';
import PlanetPage from './PlanetPage.js'
import request from 'superagent'
// import SignUp from './SignUp.js'
// import SignIn from './SignIn.js'
// import PrivateRoute from './PrivateRoute.js';
// import './Common.css';

export default class App extends Component {
  state = {
    grid: [
  [2, 2, 2, 1],
  [0, 3, 4],
  ],
  possiblePosition: [],
  planet: {},
  spaceShipPosition: [0, 0],
  }

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
        //if planet index === alreadyvisited[index] do another math random
        this.setState({ planet: planet[planetIndex] })
        console.log(planet[planetIndex], 'im the planet')
    }
}
getEvent = async() => {
    let fetchedEvent = await request.get(`http://localhost:3001/events/${this.state.planet.id}`)
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
  render() {
    
    return (
      <div>
        <Router>
          
          <Switch>
            <Route path='/' exact render={(routerProps) => <Board grid={this.state.grid} possiblePosition={this.state.possiblePosition} planet={this.state.planet}
            spaceShipPosition={this.state.spaceShipPosition} handleSpacePress={this.handleSpacePress} {...routerProps}
            />}/>
             <Route path='/planet' render={(routerProps) => <PlanetPage {...routerProps}/>}/>
          </Switch>
        </Router>
      </div>
    )
  }
}
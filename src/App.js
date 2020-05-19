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
import SignIn from './signin.js'
import SignUp from './signup.js'
// import SignUp from './SignUp.js'
// import SignIn from './SignIn.js'
// import PrivateRoute from './PrivateRoute.js';
// import './Common.css';

export default class App extends Component {
  state = {
    grid: [
  [2, 2, 2, 1],
  [0, 3, 2, 4],
  ],
  possiblePosition: [],
  planet: {},
  spaceShipPosition: [0, 0],
  userShip: {
    ship_name: 'The Enterprise',
    ship_image: 'im an image',
    ship_fuel: 4,
    ship_hull: 10,
    ship_credits: 0,
    base_combat: 2,
    base_diplomacy: 4,
    base_science: 2,
    used_item_slots: 0,
    max_item_slots: 3
  }
  }

  applyShipStats = (health, fuel, credits) => {
    console.log(health, fuel, credits)
    const newHealth = this.state.userShip.ship_hull + health;
    const newFuel = this.state.userShip.ship_fuel + fuel;
    const newCredits = this.state.userShip.ship_credits + credits;
    // set the state to update users ship
    console.log(newHealth, newFuel, newCredits)

    // this.setState({ [userShip.ship_hull]: newHealth, [userShip.ship_fuel]: newFuel, [userShip.ship_credits]: newCredits})


    this.setState({ userShip: {
      ship_name: this.state.userShip.ship_name,
      ship_image: this.state.userShip.ship_image,
      ship_fuel: newFuel,
      ship_hull: newHealth,
      ship_credits:  newCredits,
      base_combat:  this.state.userShip.base_combat,
      base_diplomacy:  this.state.userShip.base_diplomacy,
      base_science:  this.state.userShip.base_science,
      used_item_slots:  this.state.userShip.used_item_slots,
      max_item_slots: this.state.userShip.max_item_slots
    } })
  }

  isGameOver = () => {
    if(this.state.userShip.ship_hull <= 0) {
      console.log('game over')
    }
    if(this.state.userShip.ship_fuel <= 0) {
      console.log('game over out of gas')
    }
  }

  isMoveInRange = (spaceShipPosition, possiblePosition) => {
    console.log('ss pos:', spaceShipPosition, 'p pos:', possiblePosition)

    if((spaceShipPosition[0] + 1 === possiblePosition[0] && spaceShipPosition[1] === possiblePosition[1]) || (spaceShipPosition[0] - 1 === possiblePosition[0] && spaceShipPosition[1] === possiblePosition[1])) {
        this.setState({ spaceShipPosition: [possiblePosition[0], possiblePosition[1]]})
    } else if (spaceShipPosition[1] + 1 === possiblePosition[1] && spaceShipPosition[0] === possiblePosition[0]) {
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
        const planetIndex = Math.floor(Math.random()* fetchedPlanet.body.length)
        //if planet index === alreadyvisited[index] do another math random
        this.setState({ planet: planet[planetIndex] })
    }
}
getEvent = async() => {
    let fetchedEvent = await request.get(`http://localhost:3001/events/${this.state.planet.id}`)
}

handleSpacePress = async (col, row) => {
    
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
            <Route path='/' exact render={(routerProps) => <Board 
            grid={this.state.grid} 
            possiblePosition={this.state.possiblePosition} 
            planet={this.state.planet}
            spaceShipPosition={this.state.spaceShipPosition}
            userShip={this.state.userShip}
            handleSpacePress={this.handleSpacePress} 
            {...routerProps}
            />}/>
             <Route path='/planet' render={(routerProps) => <PlanetPage 
             planet={this.state.planet}
             applyShipStats={this.applyShipStats}
             userShip={this.state.userShip}
             {...routerProps}/>}/>
             <Route path='/signup' render={(routerProps) => <SignUp 
             {...routerProps}/>}/>
             <Route path='/signin' render={(routerProps) => <SignIn
             {...routerProps}/>}/>
          </Switch>
        </Router>
      </div>
    )
  }
}
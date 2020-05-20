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
import Signin from './signin.js'
import Signup from './signup.js'
import GameOver from './GameOver.js'
// import SignUp from './SignUp.js'
// import SignIn from './SignIn.js'
// import PrivateRoute from './PrivateRoute.js';
// import './Common.css';
import Game from './Game.js'

import CharacterSelectPage from './CharacterSelectPage.js'

export default class App extends Component {
  state = {
    grid: [
  [2, 2, 2, 1],
  [0, 3, 2, 4],
  ],
  possiblePosition: [],
  planet: {},
  spaceShipPosition: [0, 0],
  ship_name: 'The Enterprise',
  ship_image: 'im an image',
  ship_fuel: 3,
  ship_hull: 1,
  ship_credits: 0,
  used_item_slots: 0,
  max_item_slots: 3,
  ship_stats: {
  base_combat: 2,
  base_diplomacy: 4,
  base_science: 2,
  },
  shipInitialSelect: 0,
  planets_visited: [],
  planets_coordinates: [[0,0]]
  }

  applyShipStats = (health, fuel, credits) => {
    console.log(health, fuel, credits)
    const newHealth = this.state.ship_hull + health;
    const newFuel = this.state.ship_fuel + fuel;
    const newCredits = this.state.ship_credits + credits;
   
    this.setState({
      ship_fuel: newFuel,
      ship_hull: newHealth,
      ship_credits:  newCredits,
    })
  }

  coordinatesInclude = (array, position) => {
    const stringPosition = JSON.stringify(position)
    const isInArray = array.some(item => {
      return JSON.stringify(item) === stringPosition
    })
    return isInArray
  }

  isMoveInRange = (spaceShipPosition, possiblePosition, attemptedClick) => {
    console.log('ss pos:', spaceShipPosition, 'p pos:', possiblePosition)

    //if( space ship has been to these coordinates do not allow the spot to load or the ship to move)

    //else if( allow the ship to move and allow the spot to load)
    let position = [possiblePosition[0], possiblePosition[1]]
   
    let coordinates = this.state.planets_coordinates
    console.log(coordinates, 'coordinates')


    if(!this.coordinatesInclude(this.state.planets_coordinates, position) && this.state.ship_fuel > 0) {
     
      if((spaceShipPosition[0] + 1 === possiblePosition[0] && spaceShipPosition[1] === possiblePosition[1]) || (spaceShipPosition[0] - 1 === possiblePosition[0] && spaceShipPosition[1] === possiblePosition[1])) {
          this.setState({ spaceShipPosition: [possiblePosition[0], possiblePosition[1]]})
      } else if (spaceShipPosition[1] + 1 === possiblePosition[1] && spaceShipPosition[0] === possiblePosition[0]) {
          this.setState({ spaceShipPosition: [possiblePosition[0], possiblePosition[1]], })
      } else {
          console.log('NOT VALID MOVE')
      }
      this.state.planets_coordinates.push([possiblePosition[0], possiblePosition[1]])
      this.setState({ship_fuel: this.state.ship_fuel - 1})

      this.locationReveal(attemptedClick)
    }

}

locationReveal = async(attemptedClick) => {
    
    if(attemptedClick === 2) {
        let fetchedPlanet = await request.get('http://localhost:3001/randomplanet')
        let planet = fetchedPlanet.body
        let planetIndex = Math.floor(Math.random()* fetchedPlanet.body.length)
        while(this.state.planets_visited.includes(planetIndex) && (this.state.planets_visited.length < 4)) {
          planetIndex = Math.floor(Math.random()* fetchedPlanet.body.length)
        }
        console.log(planet)
          let planet_visited_array = this.state.planets_visited
          planet_visited_array.push(planetIndex)
          this.setState({ planet: planet[planetIndex], planets_visited: planet_visited_array })
        } else if(attemptedClick === 3) {
          this.setState({ ship_fuel: this.state.ship_fuel + 3 })
        } else if(attemptedClick === 4) {
          console.log('you win')
        }
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

    this.isMoveInRange(this.state.spaceShipPosition, proposedPosition, attemptedClick)
    // this.locationReveal(attemptedClick)
}

updateShipSelection = (e) => {this.setState({ shipInitialSelect: e.target.value})}

spaceshipSelectHandle = async(e) => {
  e.preventDefault();
  const shipChoice = await request.get(`http://localhost:3001/usership/${this.state.shipInitialSelect}`)

  console.log(shipChoice);

  const finalChoice = shipChoice.body[0];

  const updatedProfile = await request.put(`http://localhost:3001/user`, {
      userId: 1,
      shipChoice: finalChoice
  })

  let userShip = JSON.parse(updatedProfile.body[0].user_ship)
  this.setState({ ship_name: userShip.ship_name,
                  ship_image: userShip.ship_image,
                  ship_fuel: userShip.ship_fuel,
                  ship_hull: userShip.ship_hull,
                  ship_credits: userShip.shipcredits,
                  ship_stats: { base_combat: userShip.base_combat,
                  base_diplomacy: userShip.base_diplomacy,
                  base_science: userShip.base_science },
                  used_item_slots: userShip.used_item_slots,
                  max_item_slots: userShip.max_item_slots, 
                })
  
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
            handleSpacePress={this.handleSpacePress} 
            {...routerProps}
            />}/>
            <Route path='/characterSelect' render={(routerProps) => <CharacterSelectPage
            submitHandle={this.spaceshipSelectHandle} 
            handleChange={this.updateShipSelection}
             {...routerProps}/>}/>
             <Route path='/planet' render={(routerProps) => <PlanetPage 
             planet={this.state.planet}
             applyShipStats={this.applyShipStats}
             shipFuel={this.state.ship_fuel}
             shipHull={this.state.ship_hull}
             shipCredits={this.state.ship_credits}
             shipStats={this.state.ship_stats}
             {...routerProps}/>}/>
             <Route path='/signup' render={(routerProps) => <Signup 
             {...routerProps}/>}/>
             <Route path='/signin' render={(routerProps) => <Signin
             {...routerProps}/>}/>
             <Route path='/gameOver' render={(routerProps) => <GameOver
             {...routerProps}/>}/>
            <Route path='/secretPage' render={(routerProps) => <Game userShip={this.state.userShip}
             {...routerProps}/>}/>
          </Switch>
        </Router>
      </div>
    )
  }
}
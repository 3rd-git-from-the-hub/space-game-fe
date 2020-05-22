import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
} from "react-router-dom";
import Board from './Board.js';
import PlanetPage from './PlanetPage.js'
import request from 'superagent'
import Signin from './signin.js'
import Signup from './signup.js'
import GameOver from './GameOver.js'
import CharacterSelectPage from './CharacterSelectPage.js'
import About from './About.js'

export default class App extends Component {
  state = {
    grid: [
  [0, 2, 1, 3, 2, 0, 0, 0, 4],
  [0, 3, 0, 0, 1, 1, 1, 0, 1],
  [2, 1, 0, 0, 0, 0, 1, 1, 1],
  ],
  possiblePosition: [],
  planet: {},
  spaceShipPosition: [2, 0],
  ship_name: 'The Fake Enterprise',
  ship_image: 'im an image',
  ship_fuel: 8,
  ship_hull: 1,
  ship_credits: 5,
  used_item_slots: 0,
  max_item_slots: 3,
  ship_stats: {
  base_combat: 2,
  base_diplomacy: 4,
  base_science: 2,
  },
  shipInitialSelect: 1,
  planets_visited: [],
  planets_coordinates: [[0,0]],
  has_won: false,
  no_fuel: false,
  token: localStorage.getItem('TOKEN_KEY')
  }
  
  tokenChange = (myToken) => {
    this.setState({ token: myToken })
    localStorage.setItem('TOKEN_KEY', myToken) 
  }

  clearPlanetFunction = () => {
    this.setState({ planet: {} })
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
    
    if(attemptedClick === 1) {
        let fetchedPlanet = await request.get('https://guarded-reef-50217.herokuapp.com/randomplanet')
        let planet = fetchedPlanet.body
        let planetIndex = Math.floor(Math.random()* fetchedPlanet.body.length)
        while(this.state.planets_visited.includes(planetIndex) && (this.state.planets_visited.length < 8)) {
          planetIndex = Math.floor(Math.random()* fetchedPlanet.body.length)
        }
        console.log(planet)
          let planet_visited_array = this.state.planets_visited
          planet_visited_array.push(planetIndex)
          this.setState({ planet: planet[planetIndex], planets_visited: planet_visited_array })

        } else if(attemptedClick === 2) {
          this.setState({ planet: { location_name: 'Open space'} })
        } else if(attemptedClick === 3) {
          this.setState({ ship_fuel: this.state.ship_fuel + 3, planet: {}})
        } else if(attemptedClick === 4) {
          this.setState({ has_won: true, planet: { location_name: 'Planet: JDXDJ73J39' } })
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
}

updateShipSelection = (e) => {
  
  this.setState({ shipInitialSelect: e.target.value})
  
}



spaceshipSelectHandle = async(e) => {
  e.preventDefault();
  const shipChoice = await request.get(`https://guarded-reef-50217.herokuapp.com/usership/${this.state.shipInitialSelect}`)
  let userShip = shipChoice.body[0];
  console.log(userShip);
  
  if(this.state.shipInitialSelect === "1") {
    const color = await request.get(`https://api.allorigins.win/get?url=${encodeURIComponent('http://www.colr.org/json/scheme/11154')}
    `)
    //http://www.colr.org/json/scheme/11154
    const parsedObject = JSON.parse(color.body.contents);
    
    const themeColors = parsedObject.schemes[0].colors;
    const colorScheme = {
      'background_clr': themeColors[3],
      'font_clr':themeColors[1],
      'border_clr': themeColors[2]
    }
    localStorage.setItem('COLOR_SCHEME', JSON.stringify(colorScheme))
    localStorage.setItem('SHIP_NAME', userShip.id);
    
  
  } else if(this.state.shipInitialSelect === "2" || this.state.shipInitialSelect === 2) {

    const color = await request.get(`https://api.allorigins.win/get?url=${encodeURIComponent('http://www.colr.org/json/scheme/17822')}
    `)
    const parsedObject = JSON.parse(color.body.contents);
    console.log(parsedObject);
    const themeColors = parsedObject.schemes[0].colors;
    const colorScheme = {
      'background_clr': themeColors[2],
      'font_clr':themeColors[4],
      'border_clr': themeColors[3]
    }
    localStorage.setItem('COLOR_SCHEME', JSON.stringify(colorScheme))
    localStorage.setItem('SHIP_NAME', userShip.id);
  } else if(this.state.shipInitialSelect === "3" || this.state.shipInitialSelect === 3) {
    const color = await request.get(`https://api.allorigins.win/get?url=${encodeURIComponent('http://www.colr.org/json/scheme/7078')}
    `)

    const parsedObject = JSON.parse(color.body.contents);

    const themeColors = parsedObject.schemes[0].colors;
  
    const colorScheme = {
      'background_clr': themeColors[1],
      'font_clr': '#ffffff',
      'border_clr': themeColors[2]
    }
    localStorage.setItem('COLOR_SCHEME', JSON.stringify(colorScheme));
    localStorage.setItem('SHIP_NAME', userShip.id);

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
                  spaceShipPosition: [2, 0],
                  planets_visited: [],
                  planets_coordinates: [[0,0]],
                  has_won: false

                })
  
              }
            }
  render() {
    return (
      <div>
        <Router>
          
          <Switch>
            <Route path='/board' exact render={(routerProps) => <Board 
            grid={this.state.grid} 
            possiblePosition={this.state.possiblePosition} 
            planet={this.state.planet}
            spaceShipPosition={this.state.spaceShipPosition}
            handleSpacePress={this.handleSpacePress}
            hasWon={this.state.has_won}
            shipFuel={this.state.ship_fuel}
            shipHull={this.state.ship_hull}
            shipCredits={this.state.ship_credits}
            {...routerProps}
            />}/>
            <Route path='/characterSelect' render={(routerProps) => <CharacterSelectPage
            submitHandle={this.spaceshipSelectHandle} 
            handleChange={this.updateShipSelection}
             {...routerProps}/>}/>
             <Route path='/planet' render={(routerProps) => <PlanetPage 
             planet={this.state.planet}
             applyShipStats={this.applyShipStats}
             clearPlanetFunction={this.clearPlanetFunction}
             shipFuel={this.state.ship_fuel}
             shipHull={this.state.ship_hull}
             shipCredits={this.state.ship_credits}
             shipStats={this.state.ship_stats}
             {...routerProps}/>}/>
             <Route path='/' exact render={(routerProps) => <Signup 
             tokenChange={this.tokenChange}
             {...routerProps}/>}/>
             <Route path='/signin' render={(routerProps) => <Signin
             tokenChange={this.tokenChange}
             {...routerProps}/>}/>
             <Route path='/gameOver' render={(routerProps) => <GameOver
             token={this.state.token}
             hull={this.state.ship_hull}
             fuel={this.state.ship_fuel}
             {...routerProps}/>}/>
             <Route path='/about' render={(routerProps) => <About 
             {...routerProps}/>}/>
          </Switch>
        </Router>
      </div>
    )
  }
}
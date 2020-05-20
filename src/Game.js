import React, { Component } from 'react'
// import PlanetPage from './PlanetPage.js'

export default class Game extends Component {
   isGameOver = () => {
     if(this.props.userShip.ship_hull <= 0) {
    this.props.history.push('/gameOver')
  }
  if(this.props.userShip.ship_fuel <= 0) {
    this.props.history.push('/gameOver')
  }
}
  render() {
    return (
      <div>
        {/* <PlanetPage statCheck={this.isGameOver}/> */}
      </div>
    )
  }
}

    
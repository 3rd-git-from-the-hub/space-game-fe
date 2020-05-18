import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
    Link,
} from "react-router-dom";
import Board from './Board.js';
// import SignUp from './SignUp.js'
// import SignIn from './SignIn.js'
// import PrivateRoute from './PrivateRoute.js';
// import './Common.css';

export default class App extends Component {
  // state = { token: localStorage.getItem('TOKEN'), email: localStorage.getItem('EMAIL') }

  // handleTokenChange = (myToken, myEmail) => {
  //   this.setState({ token: myToken, email: myEmail });
  //   localStorage.setItem('TOKEN', myToken);
  //   localStorage.setItem('EMAIL', myEmail);
  // }

  render() {
    return (
      <div>
        <Router>
          {/* <ul>
    { this.state.token && <div className="loggedin">Logged in: {this.state.email}</div> }
            { this.state.token && <Link to="/quests"><div>Quests</div></Link> }
            <Link to="/signin"><div>Sign in</div></Link>
            <Link to="/signup"><div>Sign up</div></Link>
            <button onClick={() =>this.handleTokenChange('')}>Logout</button>
          </ul> */}
          <Switch>
            <Route path='/' render={(routerProps) => <Board 
            />
            } />
            {/* <Route exact path='/signin' render={(routerProps) => <SignIn 
                handleTokenChange={this.handleTokenChange} 
                {...routerProps} />} 
              />
            <Route 
            exact path='/signup' 
              render={(routerProps) => <SignUp 
                handleTokenChange={this.handleTokenChange} 
                {...routerProps}/>} 
              />
            <PrivateRoute 
              exact 
              path='/quests' 
              token={this.state.token} 
              render={(routerProps) => <Quests
              {...routerProps} />} /> */}
          </Switch>
        </Router>
      </div>
    )
  }
}
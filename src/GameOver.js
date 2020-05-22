import React, { Component } from 'react'
import request from 'superagent';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import earthMap from './photos/background/earthmap1k.jpg'
import './GameOver.css'

export default class GameOver extends Component {

    state = {
        final_message: '',
        times_won: ''
    }

    async componentDidMount() {
      
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 25, window.innerWidth/window.innerHeight, 0.1, 1000 );
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        // document.body.appendChild( renderer.domElement );
        // use ref as a mount point of the Three.js scene instead of the document.body
        this.mount.appendChild( renderer.domElement );
        var geometry = new THREE.SphereGeometry( .5, 32, 32 );
       
        var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        // var material = new THREE.MeshPhongMaterial();
        material.map = THREE.ImageUtils.loadTexture(earthMap)
        var cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        camera.position.z = 5;
        var animate = function () {
          requestAnimationFrame( animate );
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
          renderer.render( scene, camera );
        };
        animate();
        

        // logic for landing on the page message
        if(this.props.hull <= 0) {
            this.setState({ final_message: `The people of Earth realize that something must have gone wrong. They mourne your loss and raise a memorial in your name. You provide the courage for future Travelers to take the journey.` }) 
        } else if (this.props.fuel <= 0) {
            this.setState({ final_message: `'Fuel: 1%... Fuel: 0%... You look at the monitor defeated. You send the data you've received back to Earth, hoping the next Traveler will have better luck than you.`})
        } else {
            // update users wins on the backend
            await request.put('http://localhost:3001/api/loggedinuser')
            .set('Authorization', this.props.token)

            this.setState({ final_message: `Your monitor brings up your location. "Planet: JDXDJ73J39" A smile crosses your face as you let out a sigh or relief. You found it...Orion. You quickly send a message back to Earth with your location. Finally a new home....` })

            // get the total amount of users wins
            const winData = await request.get('http://localhost:3001/api/loggedinuser')
            .set('Authorization', this.props.token)
            this.setState({ times_won: winData.body[0].score })
        }
    }

    render() {
        console.log(this.state.times_won)
        return (
            
            <div>
                <div ref={ref => (this.mount = ref)} ></div>
                <div className='game-over-text'>

                    <p>{this.state.final_message}</p>

                    {this.state.times_won && <p>You have won {this.state.times_won} times!</p>}
                    <Link className='game-over-link' to={'/characterSelect'}>Play another game</Link>
                    <Link className='game-over-link' to={'/'}>Main menu</Link>
                </div>

            </div>
        )
    }
}

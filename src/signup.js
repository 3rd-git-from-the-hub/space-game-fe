import React, { Component } from 'react'
import request from 'superagent';
import * as THREE from 'three';
import whiteCircle from './photos/background/whiteCircle.png'
import { Link } from 'react-router-dom'

export default class Signup extends Component {
    componentDidMount() {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 0.1, 1000 );
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        // document.body.appendChild( renderer.domElement );
        // use ref as a mount point of the Three.js scene instead of the document.body
        this.mount.appendChild( renderer.domElement );
        let starGeo = new THREE.Geometry();
        for(let i=0 ; i<6000; i++) {
            let star = new THREE.Vector3(
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
                Math.random() * 600 - 300
            );
            star.velocity = 0;
            star.acceleration = 0.001;
            starGeo.vertices.push(star)
        }
        let sprite = new THREE.TextureLoader().load(whiteCircle)
        let starMaterial = new THREE.PointsMaterial({
            color: 0xaaaaaa,
            sprite: 0.7,
            map: sprite
        });
        let stars = new THREE.Points(starGeo, starMaterial);
        scene.add(stars)
        // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        // var cube = new THREE.Mesh( geometry, material );
        // scene.add( cube );
        camera.position.z = 1;
        camera.position.x = Math.PI/2
        var animate = function () {
            starGeo.vertices.forEach(p =>{
                p.velocity -= p.acceleration;
                p.z -= p.velocity;
                if(p.z > 200) {
                    p.z = -200;
                    p.velocity = 0;
                }
            })
            starGeo.verticesNeedUpdate = true;
            stars.rotation.z += 0.002;
            
          requestAnimationFrame( animate );
        //   cube.rotation.x += 0.01;
        //   cube.rotation.y += 0.01;
          renderer.render( scene, camera );
        };
        animate();
      }
    state = {
        email: '',
        password: ''
    }

    handleSubmit = async(e) => {
        e.preventDefault();
        try {

            let token = await request.post('https://guarded-reef-50217.herokuapp.com/auth/signup', this.state)
    
            // create a score table for the user when they first sign up
            await request.post('https://guarded-reef-50217.herokuapp.com/api/loggedinuser', {
                name: this.state.email,
                score: 0
            })
            .set('Authorization', token.body.token)
            this.props.tokenChange(token.body.token)
            this.props.history.push('/characterselect')
        } catch {
            this.setState({ failure: 'oh no' })

        }
    }

    handleChange = (e) => {
        const newState = {}
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }
    goToSignIn = () => {
        this.props.history.push('/signin');
    }


    render() {
        const {email, password} = this.state;
        return (
            <>
            <div ref={ref => (this.mount = ref)} ></div>
                
            <div className='limiter'>
                <div className='login-container'>
                    <div className='wrap-login'>
                    <span className="login100-form-title p-b-26">A New Home</span>
                    <span className="login100-form-title p-b-26">
                        Signup
                    </span>
                    <form onSubmit={this.handleSubmit} className={'signup-form'}>
                            <div className='login-options'>
                                <div className='wrap-input'>
                                <label>
                            Email:
                            <input onChange={this.handleChange} name="email" value={email}/>
                        </label>
                                </div>
                            <div className='wrap-input-login'>
                            <label>
                            Password:
                            <input onChange={this.handleChange} name="password" value={password}/>
                        </label>
                            </div>
                            </div>
                                <div className='container-form-btn'>
                                    <div className='wrap-form-btn'>
                                        <button className='login-form-button'>Sign Up</button>
                                </div>
                            </div>
                        </form>
                        {this.state.failure && <p>Username and password already exsists</p>}
                        <button className='login-form-button' onClick={this.goToSignIn}>Go to Log In</button>
                        <Link to='/about'><p id='aboutUsText'>ABOUT US</p></Link>
                    </div>
                </div>
            </div>
            </>  
        )
    }
}

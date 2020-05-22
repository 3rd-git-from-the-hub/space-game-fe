import React, { Component } from 'react'
import request from 'superagent';
import './test.css'
import * as THREE from 'three';
import whiteCircle from './photos/background/whiteCircle.png'

export default class Signin extends Component {
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

            let token = await request.post('http://localhost:3001/auth/signin', this.state)
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
    goToSignUp = () => {
        this.props.history.push('/');
    }

    render() {
        const {email, password} = this.state;
        return (
            <>
    <div ref={ref => (this.mount = ref)} ></div>
<div className='limiter'>
    <div className='login-container'>
        <div className='wrap-login'>
        <span className="login100-form-title p-b-26">
            Login
        </span>
            <form onSubmit={this.handleSubmit} className='login-form'>
                <div className='login-options'>
                    <div className='wrap-input'>
                        <label>
                            Email:
                            <input onChange={this.handleChange} name="email" value={email} />
                        </label>
                    </div>
                <div className='wrap-input-login'>
                    <label>
                    Password:
                        <input onChange={this.handleChange} name="password" value={password} />
                    </label>
                </div>
                </div>
                    <div className='container-form-btn'>
                        <div className='wrap-form-btn'>
                            <button>Sign In</button>
                    </div>
                </div>
            </form>
            {this.state.failure && <p>Username and password not accepted</p>}
            <button onClick={this.goToSignUp}>Go to Sign Up </button>
        </div>
    </div>
</div>
</>
        )
    }
}

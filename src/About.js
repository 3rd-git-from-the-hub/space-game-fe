import React, { Component } from 'react'
import './About.css'
import erik from './photos/erik-alien.jpg'
import hunter from './photos/alien.png'

export default class About extends Component {
    render() {
        return (
            <div>
                <section className={'header'}>
                </section>
                <section className={`aboutUs`}>
                    <div className='profile'>
                        <img src={`https://image.freepik.com/free-vector/cute-alien-character_123847-105.jpg`} alt='cute-alien' className={`profilePic`}/>
                        <h2>LUCIA</h2>
                        <p>I grew up with Star Wars so the story building and challenge of creating a full-stack app provided me with a challenge both on the front and back ends! 
                            On my free time, I enjoy watching movies with friends and drawing! 
                        </p>
                    </div>
                    <div className='profile'>
                    <img src={erik} alt='cute-alien' className={`profilePic`}/>
                        <h2>ERIK</h2>
                        <p>I enjoy all things space related. I chose this project because of the challenge it offered, along with the story telling aspects. <br/>
On my free time I enjoy all things nerdy and geeky and I can be found larping or playing Dungeons & Dragons on the weekend.</p>
                    </div>
                    <div className='profile'>
                    <img src={hunter} alt='cute-alien' className={`profilePic`}/>
                        <h2>HUNTER</h2>
                        <p>I’m a full stack software developer, I chose this project because I thought space was cool before it mattered. I like games in general and Star Wars content.</p>
                    </div>
                </section>
            </div>
        )
    }
}

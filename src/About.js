import React, { Component } from 'react'
import './About.css'

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
                        <p>INFORMATION ABOUT ME</p>
                    </div>
                    <div className='profile'>
                    <img src={`https://image.freepik.com/free-vector/cute-alien-character_123847-105.jpg`} alt='cute-alien' className={`profilePic`}/>
                        <h2>ERIK</h2>
                        <p>INFORMATION ABOUT ME</p>
                    </div>
                    <div className='profile'>
                    <img src={`https://image.freepik.com/free-vector/cute-alien-character_123847-105.jpg`} alt='cute-alien' className={`profilePic`}/>
                        <h2>HUNTER</h2>
                        <p>INFORMATION ABOUT ME</p>
                    </div>
                    <div className='erik'>
                    </div>
                </section>
            </div>
        )
    }
}

import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser} from '../dux/reducer'
import axios from 'axios'
import './landing.scss'
import toilet from '../assets/Toilet.png'

class Landing extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }

    }

        handleInput = e => {
            this.setState({
                [e.target.name]: e.target.value
            })
        }

        handleLogin = () => {
            const {username, password} = this.state

            axios.post(`/api/login`, {username, password})
            .then(res => {
                this.props.getUser(res.data)
                this.props.history.push('/home')
            }).catch(err => console.log(err))
        }
    

    render() {
        return (
            <div className="landing">
                <header className='landing-header'>
                <h1>Toilet Quest<img className="toilet-icon"src={toilet} alt=""/></h1>
                </header>
                
                <div className="landing-auth">
                <input className="auth-input"
                placeholder="Username"
                name='username'
                value={this.state.username}
                onChange={this.handleInput}
                required/>
                <input className="auth-input"
                placeholder="Password"
                name='password'
                value={this.state.password}
                type='password'
                onChange={this.handleInput}
                required/>
                <button className='login-button' onClick={this.handleLogin}>Login</button>
                <h3 className="register-link"><Link to='/register'>Don't have an account? Register here!</Link></h3>
                
                </div>
            </div>
        )
    }
}

export default connect(null, {getUser})(Landing)
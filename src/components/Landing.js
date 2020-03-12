import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser} from '../dux/reducer'
import axios from 'axios'
import './Landing.css'
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
                <header>
                <h1 style={{ fontSize: '4rem', color: 'black', fontWeight: '100', display: 'flex', justifyContent: 'center', paddingLeft: '5px'}}>Toilet Quest<img src={toilet} alt="" style={{ height: '70px', width: '55px',}}/></h1>
                </header>
                
                <div className="landing-auth">
                <input style={{ width: '270px', height: '30px', borderRadius: '10px'}}
                placeholder="Username"
                name='username'
                value={this.state.username}
                onChange={this.handleInput}
                required/>
                <input style={{ width: '270px', height: '30px', marginTop: '15px', marginBottom: '15px', borderRadius: '10px'}}
                placeholder="Password"
                name='password'
                value={this.state.password}
                type='password'
                onChange={this.handleInput}
                required/>
                <button style={{ fontSize: '1.2rem'}}onClick={this.handleLogin}>Login</button>
                <h3 style={{ color: "blue", paddingTop: '25px' }}><Link to='/register'>Don't have an account? Register here!</Link></h3>
                
                </div>
            </div>
        )
    }
}

export default connect(null, {getUser})(Landing)
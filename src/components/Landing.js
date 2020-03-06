import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser} from '../dux/reducer'
import axios from 'axios'

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
            <div>
                <h1>Personal Project!</h1>
                <input 
                placeholder="Username"
                name='username'
                value={this.state.username}
                onChange={this.handleInput}
                required/>
                <input 
                placeholder="Password"
                name='password'
                value={this.state.password}
                type='password'
                onChange={this.handleInput}
                required/>
                <button onClick={this.handleLogin}>Login</button>
                <h3 style={{ color: "blue" }}><Link to='/register'>Don't have an account? Register here!</Link></h3>
            </div>
        )
    }
}

export default connect(null, {getUser})(Landing)
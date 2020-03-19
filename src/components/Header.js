import React from 'react'  
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {logout} from '../dux/reducer'
import sign from '../assets/RestroomSign.jpg'
import toilet from '../assets/Toilet.png'
import './header.scss'

function Header(props) {

    const logout = () => {
        axios.post('/api/logout')
        .then(res => {
            props.logout()
            props.history.push('/')
        })
    }
    
    return (
        <div className="header" style={{ backgroundImage: `url(${sign})`}}>
            <div className="header-title">
            <Link to='/home'><h1>Toilet Quest<img className="logo" src={toilet} alt="" style={{ height: '35px', width: '30px'}}/></h1></Link>
            </div>
            <div className='profile-header'>
                <Link to='/profile'><img className='header-image'  style={{  
                backgroundImage: `url(${props.user.profile_pic})`, 
                backgroundSize: "cover", 
                backgroundRepeat: "no-repeat" }} alt=""/>
            </Link>
            <div className="username">
            <Link to='/profile'><p>{props.user.username}</p></Link>
            </div>
            <h3 style={{ fontWeight: "300", color: "blue", fontSize: '.75rem' }} onClick={logout}>Logout</h3>
            </div>
        </div>
    )
}

const mapStateToProps = reduxState => {
    const {user} = reduxState
    return {
        user
    }
}

export default connect(mapStateToProps, {logout})(withRouter(Header))
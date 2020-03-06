import React from 'react'  
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {logout} from '../dux/reducer'

function Header(props) {

    const logout = () => {
        axios.post('/api/logout')
        .then(res => {
            props.logout()
            props.history.push('/')
        })
    }
    return (
        <div>
            <Link to='/home'><h1>Personal Project!</h1></Link>
            <Link to='/profile'><p>{props.user.username}</p></Link>
            <div>
                <Link to='/profile'><img  style={{ height: "100px", 
                width: "100px", 
                // backgroundImage: `url(${props.user.profile_pic})`, 
                backgroundSize: "cover", 
                backgroundRepeat: "no-repeat" }} alt=""/>
            </Link>
            <h3 style={{ fontWeight: "300", color: "blue" }} onClick={logout}>Logout</h3>
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
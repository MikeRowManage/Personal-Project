import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import routes from './routes'
import {connect} from 'react-redux'
import {checkUser} from './dux/userReducer'
import Header from './components/Header'
// import './reset.css'
import './App.css';

class App extends Component {
  
  
componentDidMount() {
  this.props.checkUser()
}

componentDidUpdate(prevProps) {
  if(prevProps.userReducer.user !== this.props.userReducer.user) {
    if(!this.props.userReducer.user.username)
    this.props.history.push('/')
  }
}

  render(){
  return (
    <div className="App">
    {this.props.location.pathname === '/' || this.props.location.pathname === '/register' ? (
      <>
     {routes}
     </>
    ) : (
      <>
      <Header />
      {routes}
      </>
    )}
    </div>
  );
}
}

const mapStateToProps = reduxState =>{
  return {
    userReducer: reduxState
  }
}

export default connect(mapStateToProps, {checkUser})(withRouter(App));

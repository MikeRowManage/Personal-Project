import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import routes from './routes'
import {connect} from 'react-redux'
import {checkUser} from './dux/reducer'
import Header from './components/Header'
// import './reset.css'
import './App.css';

class App extends Component {
  
  
componentDidMount() {
  this.props.checkUser()
}

componentDidUpdate(prevProps) {
  if(prevProps.reducer.user !== this.props.reducer.user) {
    if(!this.props.reducer.user.username)
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
    reducer: reduxState
  }
}

export default connect(mapStateToProps, {checkUser})(withRouter(App));

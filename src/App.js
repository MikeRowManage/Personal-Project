import React from 'react';
import {withRouter} from 'react-router-dom'
import routes from './routes'
import Header from './components/Header'
import './App.css';

function App(props) {
  return (
    <div className="App">
    {props.location.pathname === '/' || props.location.pathname === '/register' ? (
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

export default withRouter(App);

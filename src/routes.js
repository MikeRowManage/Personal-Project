import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Register from './components/Register'
import Form from "./components/Form";
import Home from "./components/Home";
import Locations from "./components/Locations";
import Profile from "./components/Profile";

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/register" component={Register} />
    <Route path="/home" component={Home} />
    <Route path="/form" component={Form} />
    <Route path="/locations" component={Locations} />
    <Route path="/profile" component={Profile} />
  </Switch>
);

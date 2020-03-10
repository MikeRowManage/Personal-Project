import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../dux/reducer";
import {Link} from "react-router-dom"

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      email: "",
      profile_pic: null,
      zipcode: "",
      file: null
    };
  }

  handleRegister = () => {
    const {
      username,
      password,
      first_name,
      last_name,
      email,
      // profile_pic,
      zipcode
    } = this.state;

    axios
      .post(`/api/register`, {
        username,
        password,
        first_name,
        last_name,
        email,
        profile_pic: this.state.file,
        zipcode
      })
      .then(res => {
        this.props.getUser(res.data);
        this.props.history.push("/home");
      })
      .catch(err => console.log(err));
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleImagePreview = e => {
    console.log(e.target.files[0])
        this.setState({
            file: e.target.files[0],
            profile_pic: URL.createObjectURL(e.target.files[0])
        })
    }

  render() {
    const {
      username,
      password,
      first_name,
      last_name,
      email,
      profile_pic,
      zipcode,
    } = this.state

    return (
      <div>
        <input placeholder="Username" name="username" value={username} onChange={this.handleInput} required/>
        <input placeholder="Password" name="password" type='password' value={password} onChange={this.handleInput} required/>
        <input placeholder="First Name" name="first_name" value={first_name} onChange={this.handleInput} required/>
        <input placeholder="Last Name" name="last_name" value={last_name} onChange={this.handleInput} required/>
        <input placeholder="Email" name="email" type="email" value={email} onChange={this.handleInput} required/>
        <img src={profile_pic} style={{ height: "100px", 
                width: "100px"}} alt=""/>
        <input placeholder="Profile Picture" name="profile_pic" type="file" onChange={this.handleImagePreview} required/>
        <input placeholder="Your Zip Code" name="zipcode" type="number" value={zipcode} onChange={this.handleInput} required/>
        <button onClick={this.handleRegister}>Register</button>
        <Link to='/'> <h3>Already have an account? Login here!</h3> </Link>
      </div>
    )
  }
}

export default connect(null, {getUser})(Register)

import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../dux/reducer";
import { Link } from "react-router-dom";
import {v4 as randomString} from 'uuid'
import './register.css'

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      email: "",
      profile_pic: "http://via.placeholder.com/450x450",
      zipcode: ""
    };
  }

  handleRegister = () => {
    const {
      username,
      password,
      first_name,
      last_name,
      email,
      profile_pic,
      zipcode
    } = this.state;

    axios
      .post(`/api/register`, {
        username,
        password,
        first_name,
        last_name,
        email,
        profile_pic,
        zipcode
      })
      .then(res => {
        this.props.getUser(res.data);
        this.handleNodeMailer()
        this.props.history.push("/home");
      })
      .catch(err => console.log(err));
  };

  handleNodeMailer = () => {
    const {first_name, email} = this.state

    axios.post('/send', {first_name, email}).then(res => {
      if(res.data.msg === 'success') {
        alert('Message Sent!')
        this.props.history.push('/home')
      } else if(res.data.msg === 'fail') {
        alert('Message failed to send')
      }
    })
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  getSignedRequest = ([file]) => {
    console.log("hit getsigned");
    const fileName = `${randomString()}-${file.name.replace(/\s/g, "-")}`;

    axios
      .get(`/sign-s3?file-name=${fileName}&file-type=${file.type}`)
      .then(res => {
        const { signedRequest, url } = res.data;
        this.uploadFile(file, signedRequest, url);
      })
      .catch(err => console.log(err));
  };

  uploadFile = (file, signedRequest, url) => {
    console.log("hit upload");
    const options = {
      headers: {
        "Content-Type": file.type
      }
    };

    axios
      .put(signedRequest, file, options)
      .then(response => {
        console.log("hit then");
        this.setState({ profile_pic: url });
      })
      .catch(err => {
        alert(`ERROR: ${err.status}\n ${err.stack}`);
      });
  };

  render() {
    const {
      username,
      password,
      first_name,
      last_name,
      email,
      profile_pic,
      zipcode
    } = this.state;

    return (
      <div className="register">
      <header>
        <h1 style={{ fontSize: '4rem', color: 'black', fontWeight: '500', textShadow: '7px 6px 10px #000547'}}>Toilet Quest</h1>
            </header>
        <div className="register-body">
        <input
          placeholder="Username"
          name="username"
          value={username}
          onChange={this.handleInput}
          required
        />
        <input
          placeholder="Password"
          name="password"
          type="password"
          value={password}
          onChange={this.handleInput}
          required
        />
        <input
          placeholder="First Name"
          name="first_name"
          value={first_name}
          onChange={this.handleInput}
          required
        />
        <input
          placeholder="Last Name"
          name="last_name"
          value={last_name}
          onChange={this.handleInput}
          required
        />
        <input
          placeholder="Email"
          name="email"
          type="email"
          value={email}
          onChange={this.handleInput}
          required
        />
        <img accept='image/*'src={profile_pic} alt="" style={{ height: '145px', width: '145px'}}/>

        <input
        type='file'
        onChange={e => this.getSignedRequest(e.target.files) }
        />

        <input
          placeholder="Your Zip Code"
          name="zipcode"
          type="number"
          value={zipcode}
          onChange={this.handleInput}
          required
        />
        <button onClick={this.handleRegister}>Register</button>
        <Link to="/">
          {" "}
          <h3>Already have an account? Login here!</h3>{" "}
        </Link>
        </div>
      </div>
    );
  }
}

export default connect(null, { getUser })(Register);

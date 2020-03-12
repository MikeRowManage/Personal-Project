import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {v4 as randomString} from 'uuid'

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location_name: "",
      street_address: "",
      city: "",
      state: "",
      zipcode: "",
      image: 'http://via.placeholder.com/450x450',
      description: "",
      rating: "",
    };
  }

  addNewLocation = () => {
    const {
      location_name,
      street_address,
      city,
      state,
      zipcode,
      image,
      description,
      rating
    } = this.state;
    axios
      .post(`/api/locations/${this.props.user.user_id}`, {
        location_name,
        street_address,
        city,
        state,
        zipcode,
        image,
        description,
        rating
      })
      .then(() => {
        this.props.history.push("/profile");
        
      })
      .catch(err => console.log(err));
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

 getSignedRequest = ([file]) => {

     const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`

     axios.get(`/sign-s3?file-name=${fileName}&file-type=${file.type}`).then (res => {
         const {signedRequest, url} = res.data
         this.uploadFile(file, signedRequest, url)
     }).catch(err => console.log(err))
 }

 uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };

    axios
      .put(signedRequest, file, options)
      .then(response => {
        this.setState({ image: url});
      })
      .catch(err => {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
      });
  };

  render() {
    const {
      location_name,
      street_address,
      city,
      state,
      zipcode,
      image,
      description,
      rating
    } = this.state;
    return (
      <div>
        <input
          placeholder="Location Title"
          name="location_name"
          value={location_name}
          type="text"
          maxLength="100"
          onChange={this.handleInput}
        />
        <input
          placeholder="Street Address"
          name="street_address"
          value={street_address}
          type="text"
          maxLength="75"
          onChange={this.handleInput}
        />
        <input
          placeholder="City"
          name="city"
          value={city}
          type="text"
          maxLength="50"
          onChange={this.handleInput}
        />
        <input
          placeholder="State"
          name="state"
          value={state}
          type="text"
          maxLength="25"
          onChange={this.handleInput}
        />
        <input
          placeholder="ZipCode"
          name="zipcode"
          value={zipcode}
          type="text"
          maxLength="5"
          onChange={this.handleInput}
        />
        
        <img accept='image/*'src={image} alt="" style={{ height: '200px', width: '200px'}}/>

        <input
        type='file'
        onChange={e => this.getSignedRequest(e.target.files) }
        />

        <textarea
          placeholder="Description"
          name="description"
          value={description}
          type="text"
          rows="5"
          cols="100"
          maxLength="500"
          onChange={this.handleInput}
        />
        <div>
          <label htmlFor="rating">Rating</label>
          <input
            name="rating"
            type="range"
            min="0"
            max="10"
            onChange={this.handleInput}
          />
          <p>{rating}</p>
        </div>
        <button onClick={this.addNewLocation}>Submit</button>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  const { user } = reduxState;

  return {
    user
  };
};

export default connect(mapStateToProps)(Form);

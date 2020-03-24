import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import BeautyStars from 'beauty-stars';
import { v4 as randomString } from "uuid";
import "./form.scss";
import Default from "../assets/default.jpg";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location_name: "",
      street_address: "",
      city: "",
      state: "",
      location_zipcode: "",
      image: Default,
      description: "",
      rating: 0
    };
  }

  addNewLocation = () => {
    const {
      location_name,
      street_address,
      city,
      state,
      location_zipcode,
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
        location_zipcode,
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

  handleRating = value => {
    this.setState({
      rating: value
    })
  }

  getSignedRequest = ([file]) => {
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
    const options = {
      headers: {
        "Content-Type": file.type
      }
    };

    axios
      .put(signedRequest, file, options)
      .then(response => {
        this.setState({ image: url });
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
      location_zipcode,
      image,
      description,
      rating
    } = this.state;
    return (
      <div className="form">
        <div className="form-body">
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
            name="location_zipcode"
            value={location_zipcode}
            type="text"
            maxLength="5"
            onChange={this.handleInput}
          />

          <img
            accept="image/*"
            src={image}
            alt=""
            style={{ height: "100px", width: "100px" }}
          />

          <input
            className="choose-file"
            type="file"
            onChange={e => this.getSignedRequest(e.target.files)}
          />

          <textarea
            placeholder="Description"
            name="description"
            value={description}
            type="text"
            rows="5"
            cols="50"
            maxLength="500"
            onChange={this.handleInput}
          />

          <BeautyStars
          name="rating"
        value={rating}
        onChange={this.handleRating}
      />

          <button className="form-button" onClick={this.addNewLocation}>
            Submit
          </button>
        </div>
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

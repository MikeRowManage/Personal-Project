import React, { Component } from "react";
import axios from "axios";
import BeautyStars from 'beauty-stars'
import { connect } from "react-redux";
import {v4 as randomString} from 'uuid'

class UserLocations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      location_name: props.userLocations.location_name,
      street_address: props.userLocations.street_address,
      city: props.userLocations.city,
      state: props.userLocations.state,
      zipcode: props.userLocations.zipcode,
      image: props.userLocations.image,
      description: props.userLocations.description,
      rating: props.userLocations.rating
    };
  }

  toggleEdit = () => {
    this.setState({
      isEditing: !this.state.isEditing
    });
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
        this.setState({ image: url });
      })
      .catch(err => {
        alert(`ERROR: ${err.status}\n ${err.stack}`);
      });
  };

  handleCancel = () => {
    const {
      location_name,
      street_address,
      city,
      state,
      zipcode,
      image,
      description,
      rating
    } = this.props.userLocations;

    this.setState({
      location_name,
      street_address,
      city,
      state,
      zipcode,
      image,
      description,
      rating
    });
    this.toggleEdit();
  };

  editLocation = () => {
    axios
      .put(`/api/locations/${this.props.userLocations.location_id}`, {
        location_name: this.state.location_name,
        street_address: this.state.street_address,
        city: this.state.city,
        state: this.state.state,
        zipcode: this.state.zipcode,
        image: this.state.image,
        description: this.state.description,
        rating: this.state.rating
      })
      .then(() => {
        console.log("hit then");
        this.props.getUserLocations();
        this.toggleEdit();
      })
      .catch(err => console.log(err));
  };

  deleteLocation = location_id => {
    console.log(this.props);
    axios
      .delete(`/api/locations/${this.props.userLocations.location_id}`)
      .then(() => {
        this.props.getUserLocations();
      })
      .catch(err => console.log(err));
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
      rating,
    } = this.props.userLocations;
    return (
      <>
        {this.state.isEditing ? (
          <div>
            <input
              placeholder="Location Title"
              name="location_name"
              value={this.state.location_name}
              type="text"
              maxLength="100"
              onChange={this.handleInput}
            />
            <input
              placeholder="Street Address"
              name="street_address"
              value={this.state.street_address}
              type="text"
              maxLength="75"
              onChange={this.handleInput}
            />
            <input
              placeholder="City"
              name="city"
              value={this.state.city}
              type="text"
              maxLength="50"
              onChange={this.handleInput}
            />
            <input
              placeholder="State"
              name="state"
              value={this.state.state}
              type="text"
              maxLength="25"
              onChange={this.handleInput}
            />
            <input
              placeholder="ZipCode"
              name="zipcode"
              value={this.state.zipcode}
              type="text"
              maxLength="5"
              onChange={this.handleInput}
            />
            
            <label htmlFor="image">Upload a Photo</label>
            <img
              accept="image/*"
              src={image}
              name="image"
              alt=""
              style={{ height: "200px", width: "200px" }}
            />

            <input
              type="file"
              onChange={e => this.getSignedRequest(e.target.files)}
            />
            <textarea
              placeholder="Description"
              name="description"
              value={this.state.description}
              type="text"
              rows="5"
              cols="100"
              maxLength="500"
              onChange={this.handleInput}
            />

           <BeautyStars
          name="rating"
        value={rating}
        onChange={this.handleRating}
      />
            <button onClick={this.editLocation}>Save</button>
            <button onClick={this.handleCancel}>Cancel</button>
          </div>
        ) : (
          <div>
            <h2>{location_name}</h2>
            <p>
              {street_address} {city},{state} {zipcode}
            </p>
            <div>
              <img
                style={{
                  height: "100px",
                  width: "100px",
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat"
                }}
                alt=""
              />
            </div>
            <p>{description}</p>
             <BeautyStars
          name="rating"
        value={rating}
      />
            <button onClick={this.deleteLocation}>Delete</button>
            <button onClick={this.toggleEdit}>Edit</button>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = reduxState => {
  const { user } = reduxState;
  return {
    user
  };
};

export default connect(mapStateToProps)(UserLocations);

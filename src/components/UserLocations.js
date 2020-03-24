import React, { Component } from "react";
import axios from "axios";
import BeautyStars from 'beauty-stars'
import { connect } from "react-redux";
import {v4 as randomString} from 'uuid'
import './userLocations.scss'

class UserLocations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      location_name: props.userLocations.location_name,
      street_address: props.userLocations.street_address,
      city: props.userLocations.city,
      state: props.userLocations.state,
      location_zipcode: props.userLocations.location_zipcode,
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
      location_zipcode,
      image,
      description,
      rating
    } = this.props.userLocations;

    this.setState({
      location_name,
      street_address,
      city,
      state,
      location_zipcode,
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
        location_zipcode: this.state.location_zipcode,
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
      location_zipcode,
      image,
      description,
      rating,
    } = this.props.userLocations;
    return (
      <>
        {this.state.isEditing ? (
          <div className='user-locations'>
            <div className='user-locations-edit'>
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
              name="location_zipcode"
              value={this.state.location_zipcode}
              type="number"
              maxLength="5"
              onChange={this.handleInput}
            />
            
<h3 style={{ marginBottom: '7px'}}>Rating:</h3>
           <BeautyStars
          name="rating"
        value={this.state.rating}
        size='20px'
        onChange={this.handleRating}
      />
            <label htmlFor="image">Upload a Photo</label>
            <img
              accept="image/*"
              src={image}
              name="image"
              alt=""
              style={{ height: "100px", width: "100px", marginTop: '7px' }}
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
              cols="50"
              maxLength="500"
              onChange={this.handleInput}
            />
            <button className="userLocation-button" onClick={this.editLocation}>Save</button>
            <button className="userLocation-button" onClick={this.handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className='user-locations'>
          <div className='user-locations-body'>
            <h2 style={{borderBottom: '2px solid black', fontSize: '1.2rem'}}>{location_name}</h2>
            <p>
              {street_address} {city},{state} {location_zipcode}
            </p>
            <div className="user-location-image">
              <img
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  marginTop: '7px'
                }}
                alt=""
              />
            <div className="stars">
             <BeautyStars
          name="rating"
        value={rating}
        size='15px'
      /></div>
            <p className="user-location-description">{description}</p>
            </div>
            <div className="buttons">
            
            <button className="userLocation-button" onClick={this.deleteLocation}>Delete</button>
            <button className="userLocation-button" onClick={this.toggleEdit}>Edit</button>
            
            </div>
            </div>
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

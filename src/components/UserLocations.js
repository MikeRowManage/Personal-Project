import React, { Component } from "react";
import axios from 'axios'
import {connect} from 'react-redux'

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
    }
  }

toggleEdit = () => {
  this.setState({
    isEditing: !this.state.isEditing
  })
}

handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleImagePreview = e => {
        this.setState({
            image: URL.createObjectURL(e.target.files[0])
        })
    }

    handleCancel = () => {
      const {location_name, street_address, city, state, zipcode, image, description, rating} = this.props.userLocations

      this.setState({
      location_name,
      street_address,
      city,
      state,
      zipcode,
      image,
      description,
      rating
      })
      this.toggleEdit()
    }

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
        console.log('hit then')
        this.props.getUserLocations();
        this.toggleEdit()
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
      rating
    } = this.props.userLocations;
    return (
      <>
      {this.state.isEditing ? (
        <div>
                <input placeholder="Location Title" name="location_name" value={this.state.location_name} type="text" maxLength="100" onChange={this.handleInput}  />
                <input placeholder="Street Address" name="street_address" value={this.state.street_address} type="text" maxLength="75" onChange={this.handleInput}  />
                <input placeholder="City" name="city" value={this.state.city} type="text" maxLength="50" onChange={this.handleInput}  />
                <input placeholder="State" name="state" value={this.state.state} type="text" maxLength="25" onChange={this.handleInput}  />
                <input placeholder="ZipCode" name="zipcode" value={this.state.zipcode} type="text" maxLength="5" onChange={this.handleInput}  />
                <img src={this.state.image} style={{ height: "100px", 
                width: "100px"}} alt=""/>
                <label htmlFor="image">Upload a Photo</label>
                <input placeholder="Location Image" name="image" type="file" maxLength="300" onChange={this.handleImagePreview}  />
                <textarea placeholder="Description" name="description" value={this.state.description} type="text" rows="5" cols="100" maxLength="500" onChange={this.handleInput}  />
                <div>
                <label htmlFor="rating">Rating</label>
                <input name="rating" type="range" min="0" max="10" onChange={this.handleInput}  />
                <p>{this.state.rating}</p>
                </div>
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
        <h3>{rating}</h3>
        <button onClick={this.deleteLocation}>Delete</button>
        <button onClick={this.toggleEdit}>Edit</button>
      </div>
      )}
      </>
    );
  }
}

const mapStateToProps = reduxState => {
  const {user} = reduxState
  return {
    user
  }
}

export default connect(mapStateToProps)(UserLocations);

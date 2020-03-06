import React, { Component } from "react";

class UserLocations extends Component {
  constructor(props) {
    super(props);
  }

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
      </div>
    );
  }
}

export default UserLocations;

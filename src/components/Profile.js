import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import UserLocations from "./UserLocations";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userLocations: []
    };
  }

  componentDidMount = () => {
    this.getUserLocations();
  };

  getUserLocations = () => {
    axios
      .get(`/api/locations/${this.props.user.user_id}`)
      .then(res => {
      console.log('hit getuserlocations', res.data)
        this.setState({
          userLocations: res.data
        });
      })
      .catch(err =>
        console.log(err, "Sorry, you do not have any posts to display")
      );
  };


  render() {
    const { userLocations } = this.state;
    const {getUserLocations} = this
    const mappedUserLocations = userLocations.map((e, i) => {
      return (
        <UserLocations
          key={i}
          userLocations={userLocations[i]}
          getUserLocations={getUserLocations}
        />
      );
    });
    return <div>{mappedUserLocations}</div>;
  }
}

const mapStateToProps = reduxState => {
  const { user } = reduxState;
  return {
    user
  };
};

export default connect(mapStateToProps)(Profile);

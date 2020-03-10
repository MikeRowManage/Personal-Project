import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {v4 as randomString} from 'uuid'
// import Dropzone from 'react-dropzone'
// import {GridLoader} from 'react-spinners'

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUploading: false,
      location_name: "",
      street_address: "",
      city: "",
      state: "",
      zipcode: "",
      url: 'http://via.placeholder.com/450x450',
      description: "",
      rating: "",
      locations: []
    };
  }

  addNewLocation = () => {
    const {
      location_name,
      street_address,
      city,
      state,
      zipcode,
      url,
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
        url,
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
     console.log('hit getsigned')
     this.setState({isUploading: true})
     const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`

     axios.get(`/sign-s3?file-name=${fileName}&file-type=${file.type}`).then (res => {
         const {signedRequest, url} = res.data
         this.uploadFile(file, signedRequest, url)
     }).catch(err => console.log(err))
 }

 uploadFile = (file, signedRequest, url) => {
     console.log('hit upload')
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };

    axios
      .put(signedRequest, file, options)
      .then(response => {
        this.setState({ isUploading: false, url });
      })
      .catch(err => {
        this.setState({
          isUploading: false,
        });
        if (err.response.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
              err.stack
            }`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };

  render() {
    const {
        isUploading,
      location_name,
      street_address,
      city,
      state,
      zipcode,
      url,
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
        <img src={url} alt="" style={{ height: '200px', width: '200px'}}/>

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
        <button onClick={this.uploadFile}>Submit</button>
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

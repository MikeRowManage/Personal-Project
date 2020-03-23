import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Location from "./Location";
import axios from "axios";
import "./home.scss";


const Home = props => {
  const [zipcode, setZipcode] = useState("");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/locations?zipcode=${zipcode}`)
      .then(res => {
        setLocations(res.data);
      })
      .catch(err => console.log(err));
  }, [zipcode]);

  return (
    <div className="home">
      <div className="home-search">
        <label className="home-label">
          Find A Location:
          <input
            placeholder="Enter Your Zip Code"
            maxLength="5"
            value={zipcode}
            onChange={e => setZipcode(e.target.value)}
          />
         
        </label>

        <label className="home-label">
          Add Your Own Location:{"  "}
          <Link to="/form">
            <button
              className="form-link"
            ></button>
          </Link>
        </label>
      </div>
      {locations.map((locations, i) => {
        return <Location key={i} locations={locations} />;
      })}
    </div>
  );
};

export default Home;

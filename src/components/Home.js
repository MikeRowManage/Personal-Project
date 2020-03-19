import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Location from "./Location";
import axios from "axios";
import "./home.scss";
import sign from "../assets/sign.png";

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
        <label>
          Find A Location:
          <input
            placeholder="Enter Your Zip Code"
            maxLength="5"
            value={zipcode}
            onChange={e => setZipcode(e.target.value)}
          />
         
        </label>

        <label>
          Add Your Own Location:{" "}
          <Link to="/form">
            <button
              style={{
                border: "2px solid black",
                borderRadius: "10px",
                backgroundImage: `url(${sign})`,
                backgroundRepeat: "no repeat",
                backgroundSize: "cover",
                height: "30px",
                width: "30px"
              }}
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

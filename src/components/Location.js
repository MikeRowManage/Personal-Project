import React from 'react'

function Location(props) {
    console.log(props)
    const {location_name, street_address, city, state, zipcode, image, description, rating, username} = props.locations
    return (
        <div>
            <h2>{location_name}</h2>
            <p>Submitted by {username}</p>
            <p>{street_address} {city},{state} {zipcode}</p>
            <div>
                <img style={{ height: "100px", 
                width: "100px", 
                backgroundImage: `url(${image})`, 
                backgroundSize: "cover", 
                backgroundRepeat: "no-repeat" }} alt=""/>
            </div>
            <p>{description}</p>
            <h3>{rating}</h3>
        </div>
    )
}

export default Location


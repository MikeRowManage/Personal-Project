import React from 'react'
import BeautyStars from 'beauty-stars'
import Default from '../assets/default.jpg'
import './location.scss'

function Location(props) {
    console.log(props)
    const {location_name, street_address, city, state, zipcode, image, description, rating, username} = props.locations
    return (
        
            <div className="locations">
            <h2 style={{borderBottom: '2px solid black', fontSize: '1.2rem'}}>{location_name}</h2>
            <p style={{fontStyle: 'italic', color: 'blue'}}>Submitted by {username}</p>
            <p>{street_address} {city},{state} {zipcode}</p>
        <h3 style={{ marginBottom: '7px'}}>Rating:</h3>
             <BeautyStars
          name="rating"
        value={rating}
        size='20px'
      />
            <div>
                <img style={{ float: 'left', height: "100px", 
                width: "100px",
                borderRadius: '25px',
                backgroundImage: `url(${image})`, 
                backgroundSize: "cover", 
                backgroundRepeat: "no-repeat", marginTop: '7px' }} alt=""/>
            </div>
            
            <p>{description}</p>
      
      
            </div>
        
    )
}

export default Location


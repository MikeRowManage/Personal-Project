import React from 'react'
import BeautyStars from 'beauty-stars'
import './location.scss'
import {Link} from 'react-router-dom'

function Location(props) {
    console.log(props)
    const {location_name, street_address, city, state, location_zipcode, image, description, rating, username, profile_pic} = props.locations

    const url = `https://www.google.com/maps/search/?api=1&query=${street_address} ${city} ${state} ${location_zipcode}`
    return (
        
            <div className="locations">
            <h2 style={{borderBottom: '2px solid black'}}>{location_name}</h2>
           <a href={url}><p className='location-info'>{street_address} {city},{state} {location_zipcode}</p></a> 
            <Link to='/profile'><img className='profile-image'  style={{  
                backgroundImage: `url(${profile_pic})`, 
                backgroundSize: "cover", 
                backgroundRepeat: "no-repeat" }} alt=""/></Link>
            <Link to='/profile'><p className="profile-info">Submitted by {username}</p></Link>
             
            <div className="location-image">
                <img style={{
                borderRadius: '10px',
                backgroundImage: `url(${image})`, 
                backgroundSize: "cover", 
                backgroundRepeat: "no-repeat", marginTop: '7px' }} alt=""/>
                <div className="stars">
                <BeautyStars
          name="rating"
        value={rating}
        size='15px'
      /></div>
                <p className="location-description">{description}</p>
            </div>
      
      
            </div>
        
    )
}

export default Location


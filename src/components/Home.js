import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Location from './Location'
import axios from 'axios'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            zipcode: '',
            locations: []
        }
    }

    handleInput = e => {
        this.setState({
            zipcode: e.target.value
        })
    }

    getAllLocations = () => {
        axios.get(`/api/locations?zipcode=${this.state.zipcode}`)
        .then(res => {
            this.setState({
                locations: res.data
            })
        }).catch(err => console.log(err))
    }

    render() {
        const searchedLocations = this.state.locations.map((locations, i) => {
            return <Location key={i} locations={locations}/>
        })
        return (
            <div>
                <label>Find A Location<input 
                placeholder="Enter Your Zip Code"
                maxLength="5"
                value={this.state.zipcode}
                onChange={this.handleInput}
                 /></label>
                 <button onClick={this.getAllLocations}>Submit</button>
                
                 <label>
                    Add Your Own Location: <Link to="/form"><button>+</button></Link>
                 </label>
                 {searchedLocations}
            </div>
        )
    }
}

export default Home
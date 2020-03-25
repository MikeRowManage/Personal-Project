import axios from 'axios'

const initialState = {
  locations: [],
  loading: false,
    error: false,
    errorMessage: ''
}

const GET_LOCATION = "GET_LOCATION"

export function getLocation() {
  return {
    type: GET_LOCATION,
    payload: axios.get('/api/locations')
  }
}

export default function locationReducer(state = initialState, action) {
  const {type, payload} = action
  switch(type) {
    case GET_LOCATION + '_PENDING':
            return {...state, loading: true, error: false, errorMessage: ''}
        case GET_LOCATION + '_REJECTED':
            return {...state, loading: false, error: true, errorMessage: payload.response.data}
        case GET_LOCATION + '_FULFILLED':
            return {...state, locations: payload.data, loading: false, error: false}
     default: 
    return state
  }
}
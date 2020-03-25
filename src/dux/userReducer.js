import axios from 'axios'

const initialState = {
  
  user: {},
  loading: false,
  error: false,
  errorMessage: ''

}

const GET_USER = 'GET_USER'
const LOGOUT = 'LOGOUT'
const CHECK_USER = 'CHECK_USER'

export function getUser(userObj) {
  return {
    type: GET_USER,
    payload: userObj
  }
}

export function logout() {
  return {
    type: LOGOUT,
    payload: null
  }
}

export function checkUser() {
  return {
    type: CHECK_USER,
    payload: axios.get('/api/user')
  }
}

export default function userReducer(state = initialState, action) {
  const {type, payload} = action
  switch(type) {
    case GET_USER:
    return {...state, user: payload}
    case LOGOUT: 
    return {...state, user: {}}
    case CHECK_USER + "_PENDING":
    console.log("Hit Pending", payload)
      return { ...state, loading: true, error: false };
    case CHECK_USER + "_FULFILLED":
    console.log("hit fulfilled", payload)
      return { ...state, user: payload.data, loading: false};
    case CHECK_USER + "_REJECTED":
      console.log("CHECK_USER REJECTED:", payload);
      return { ...state, ...initialState }
    default: 
    return state
  }
}
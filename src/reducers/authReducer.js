// src/reducers/authReducer.js
const initialState = {
  token: localStorage.getItem('token'),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;

// src/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import patientReducer from './patientReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  patient: patientReducer,
});

export default rootReducer;

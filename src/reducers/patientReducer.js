// src/reducers/patientReducer.js
const initialState = {
  selectedPatientId: null,
};

const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_PATIENT':
      return {
        ...state,
        selectedPatientId: action.payload,
      };
    default:
      return state;
  }
};

export default patientReducer;

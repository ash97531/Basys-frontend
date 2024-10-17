// src/actions/patientActions.js
export const selectPatient = (patientId) => ({
  type: 'SELECT_PATIENT',
  payload: patientId,
});

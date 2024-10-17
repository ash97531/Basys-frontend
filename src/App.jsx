// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PatientDashboard from './components/PatientDashboard';
import PatientDetails from './components/PatientDetails';
import AuthorizationForm from './components/AuthorizationForm';
import Login from './components/Login';
import Register from './components/Register';
import AuthorizationList from './components/AuthorizationList';
import { login, logout } from './actions/authActions'; 

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const selectedPatientId = useSelector((state) => state.patient.selectedPatientId);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        dispatch(logout());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [dispatch]);

  const handleLogin = (newToken) => {
    dispatch(login(newToken));
  };

  const handleRegister = (newToken) => {
    setToken(newToken);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route 
              path="/register" 
              element={<Register onRegister={handleRegister} />} 
            />
            <Route path="/authorizations" element={
              token ? <AuthorizationList /> : <Login onLogin={handleLogin} />
            } />
            <Route
              path="/"
              element={
                token ? (
                  <div className="flex flex-col space-y-4">
                    <PatientDashboard />
                    {selectedPatientId && (
                      <>
                        <PatientDetails patientId={selectedPatientId} />
                        <AuthorizationForm patientId={selectedPatientId} />
                      </>
                    )}
                  </div>
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

import axios from 'axios';

const API_URL = 'https://basys-backend-h18c.onrender.com/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getPatients = async (page, limit) => {
  return await axiosInstance.get(`/patients?page=${page}&limit=${limit}`);
};

export const getPatientById = async (id) => {
  return await axiosInstance.get(`/patients/${id}`);
};

export const addPatient = async (patientData) => {
  return await axiosInstance.post('/patients', patientData);
};

export const submitAuthorizationRequest = async (requestData) => {
  return await axiosInstance.post('/authorization', requestData);
};

export const getAuthorizationRequests = async () => {
  return await axiosInstance.get('/authorization');
};

export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
  return await axiosInstance.post('/auth/register', userData);
};

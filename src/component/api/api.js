import axios from 'axios';

<<<<<<< HEAD
let url = 'http://192.168.1.7:8000';
// let url = 'https://zcmc-telemedserver.online';
=======
// let url = 'http://localhost:8000/';
// let url = 'https://zcmc-telemedserver.online';
let url = 'http://localhost:8000/';
>>>>>>> dc351e9f5c987fbf38f44836e3c4a254462d1a44

const api = new axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'content-type': 'application/json',
  },
});

api.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

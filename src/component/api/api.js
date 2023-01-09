import axios from 'axios';

// let url = 'http://192.168.13.232:8000/';
let url = 'https://zcmc-telemedserver.online';

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

import axios from 'axios';

// let url = 'http://localhost:8000/';
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

export const GetRequest = async ({ url }, data) => {
  return await api.get(url, data);
};

export const PostRequest = async ({ url }, data) => {
  return await api.post(url, data);
};

export const PutRequest = async ({ url }, data) => {
  return await api.post(url, data);
};

export const DeleteRequest = async ({ url }, data) => {
  return await api.delete(url, data);
};

export default api;
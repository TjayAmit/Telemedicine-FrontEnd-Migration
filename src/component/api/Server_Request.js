import api from './api';
export const PostFile = async ({ url }, data) => {
  return await api.post(url, data);
};

export const PostRequest = async ({ url }, data) => {
  return await api.post(url, data);
};
export const Post = async ({ url }, data) => {
  return await api.post(url, data);
};

export const Get = async ({ url }, data) => {
  return await api.get(url, data);
};

export const Put = async ({ url }, data) => {
  return await api.put(url, data);
};

export const Delete = async ({ url }, data) => {
  return await api.delete(url, data);
};

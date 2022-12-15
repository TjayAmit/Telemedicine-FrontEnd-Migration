import { Post, Get, Put, Delete } from "./Server_Request";

export const UserPostRequest = async (data) => {
  return await Post({ url: "api/user" }, data);
};

export const UserGetRequest = async (data) => {
  return await Get({ url: "api/users" }, data);
};

export const UserAllGetRequest = async () => {
  return await Get({ url: "api/user" });
};

export const UserPutRequest = async (data) => {
  return await Put({ url: "api/user" }, data);
};

export const UserPutAdminRequest = async (data) => {
  return await Put({ url: "api/user/approved2" }, data);
};

export const UserChangePassword = async (data) => {
  return await Post({ url: "api/auth/change" }, data);
};

export const UserPutStaffRequest = async (data) => {
  return await Put({ url: "api/approved/user" }, data);
};

export const UserDeleteRequest = async (data) => {
  return await Delete({ url: "api/user" }, data);
};

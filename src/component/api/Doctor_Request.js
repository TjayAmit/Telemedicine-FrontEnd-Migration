import { Post, Get, Put, Delete } from "./Server_Request";

//Doctor Server Request user/changepassword
export const DoctorPostRequest = async (data) => {
  return await Post({ url: "api/profile" }, data);
};

export const DoctorGetCardRequest = async (data) => {
  return await Get({ url: "api/profile/card" }, data);
};

export const DoctorGetRequest = async (data) => {
  return await Get({ url: "api/profile/doctors" }, data);
};

export const DoctorPutRequest = async (data) => {
  return await Put({ url: "api/profile" }, data);
};

export const DoctorDeleteRequest = async (data) => {
  return await Delete({ url: "api/profile" }, data);
};

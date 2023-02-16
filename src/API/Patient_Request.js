import { Post, Get, Put, Delete } from "./Server_Request";

export const PatientPostRequest = async (data) => {
  return await Post({ url: "api/patient" }, data);
};

export const PatientGetCardRequest = async (data) => {
  return await Get({ url: "api/patient/card" }, data);
};

export const PatientGetRequest = async (data) => {
  return await Get({ url: "api/patient/hospital" }, data);
};

export const PatientNameGetRequest = async (data) => {
  return await Get({ url: "api/patients" }, data);
};

export const PatientPutRequest = async (data) => {
  return await Put({ url: "api/patient" }, data);
};

export const PatientDeleteRequest = async (data) => {
  return await Delete({ url: "api/patient" }, data);
};

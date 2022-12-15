import { Post, Get, Put, Delete, PostFile } from "./Server_Request";

export const HospitalPostFileRequest = async (data) => {
  return await PostFile(
    {
      url: "api/hospital",
    },
    data
  );
};

export const HospitalPostRequest = async (data) => {
  return await Post({ url: "api/hospital" }, data);
};

export const HospitalGetCardRequest = async (data) => {
  return await Get({ url: "api/hospital/card" }, data);
};

export const HospitalGetRequest = async (data) => {
  return await Get({ url: "api/hospital" }, data);
};

export const HospitalNameGetRequest = async (data) => {
  return await Get({ url: "api/hospitals" }, data);
};

export const HospitalPutRequest = async (data) => {
  return await Put(
    {
      url: "api/hospital",
    },
    data
  );
};

export const HospitalDeleteRequest = async (data) => {
  return await Delete({ url: "/admin/hospital" }, data);
};

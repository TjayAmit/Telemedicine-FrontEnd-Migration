import { Post, Get, Put, Delete } from "./Server_Request";

export const SpecializationPostRequest = async (data) => {
  return await Post({ url: "api/specialization" }, data);
};

export const SpecializationGetRequest = async (data) => {
  return await Get({ url: "api/specialization" }, data);
};

export const SpecializationNameGetRequest = async (data) => {
  return await Get(
    {
      url: "api/specializations",
    },
    data
  );
};

export const SpecializationPutSpecializationRequest = async (data) => {
  return await Put(
    {
      url: "api/specializationcase/add",
    },
    data
  );
};

export const SpecializationPutRequest = async (data) => {
  return await Put(
    {
      url: "api/specialization",
    },
    data
  );
};

export const SpecializationDeleteRequest = async (data) => {
  return await Delete({ url: "api/specialization" }, data);
};

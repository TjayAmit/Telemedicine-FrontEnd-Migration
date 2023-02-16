import { Post, Get, Put, Delete } from "./Server_Request";

//Doctor Server Request
export const GuardianPostRequest = async (data) => {
  return await Post({ url: "api/guardian" }, data);
};

export const GuardianGetRequest = async (data) => {
  return await Get({ url: "api/guardian" }, data);
};

export const GuardianPutRequest = async (data) => {
  return await Put(
    {
      url: "api/guardian",
    },
    data
  );
};

export const GuardianDeleteRequest = async (data) => {
  return await Delete({ url: "api/guardian" }, data);
};

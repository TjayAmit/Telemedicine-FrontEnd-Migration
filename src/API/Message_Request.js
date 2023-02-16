import { Post, Get, Put, Delete } from "./Server_Request";

//Doctor Server Request
export const MessagePostRequest = async (data) => {
  return await Post({ url: "api/message" }, data);
};

export const MessageGetRequest = async (data) => {
  return await Post({ url: "api/messages" }, data);
};

export const MessagePutRequest = async (data) => {
  return await Put({ url: "api/message" }, data);
};

export const MessageDeleteRequest = async (data) => {
  return await Delete({ url: "api/message" }, data);
};

import { Post, Get, Put, Delete } from "./Server_Request";

export const ReportPostRequest = async (data) => {
  return await Post({ url: "api/report" }, data);
};

export const ReportGetRequest = async (data) => {
  return await Get({ url: "api/reports" }, data);
};

export const ReportGet_IRequest = async (data) => {
  return await Get({ url: "api//report/individual" }, data);
};

export const ReportPutRequest = async (data) => {
  return await Put({ url: "api/report" }, data);
};

export const ReportDeleteRequest = async (data) => {
  return await Delete({ url: "api/report" }, data);
};

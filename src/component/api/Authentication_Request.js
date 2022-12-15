import { Post, PostRequest, Get, Put, Delete } from "./Server_Request";

//Doctor Server Request
export const LoginRequest = async (data) => {
  return await PostRequest({ url: "api/auth/signin" }, data);
};

//Doctor Server Request
export const SigninRequest = async (data) => {
  return await PostRequest({ url: "api/auth/login" }, data);
};

export const RegisterRequest = async (data) => {
  return await Post({ url: "api/auth/signup" }, data);
};

//Registration for ZCMC Admin or Head doctor of telemedicine
export const RegisterAdminRequest = async (data) => {
  return await Post({ url: "api/signup1" }, data);
};

//Registration for ZCMC staff or known as navigator doctor of telemedicine
export const RegisterStaffRequest = async (data) => {
  return await Post({ url: "api/signup2" }, data);
};

export const LogoutRequest = async (data) => {
  return await Put({ url: "/auth/logout" }, data);
};

export const CaseDeleteRequest = async (data) => {
  return await Delete({ url: "/case" }, data);
};

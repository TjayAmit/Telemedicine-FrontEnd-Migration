import { Post, PostFile, Get, Put, Delete } from './Server_Request';

export const CaseSaveMessageAndPostFileRequest = async data => {
  return await PostFile(
    {
      url: 'api/message',
    },
    data
  );
};

//Doctor Server Request
export const CasePostRequest = async data => {
  return await Post({ url: 'api/case' }, data);
};

export const CaseGetCardRequest = async data => {
  return await Get({ url: 'api/case/card' }, data);
};

export const CaseGetRequest = async data => {
  return await Get({ url: 'api/case' }, data);
};

export const CaseDoneGetRequest = async data => {
  return await Get({ url: 'api/case' }, data);
};

export const CaseStatusPutRequest = async data => {
  return await Put({ url: 'api/case/status' }, data);
};

export const CasePutRequest = async data => {
  return await Put({ url: 'api/case' }, data);
};

export const CaseDeleteRequest = async data => {
  return await Delete({ url: 'api/case' }, data);
};

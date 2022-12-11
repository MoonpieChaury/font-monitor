// mock的数据
import request from "./mock.js";


const getPageData = function() {
  return request({
    url: "/pageInfoData/pageData",
    method: "get"
  });
};


const getApiData = function() {
  return request({
    url: "/apiData/apiData",
    method: "get"
  });
};

const getJsData = function() {
  return request({
    url: "/jsErrorData/jsData",
    method: "get"
  });
};


const getResourceData = function() {
  return request({
    url: "/resourceData/resData",
    method: "get"
  });
};


const getUserData = function() {
  return request({
    url: "/userAnalysData/userData",
    method: "get"
  });
};

const getUserPath = function() {
  return request({
    url: "/userAnalysData/userPath",
    method: "get"
  });
};

export {
  getApiData,
  getPageData,
  getJsData,
  getResourceData,
  getUserData,
  getUserPath
};

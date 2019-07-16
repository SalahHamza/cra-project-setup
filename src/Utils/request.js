import axios from "axios";
import qs from "qs";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  /*
    Note: This is optional
    (depending on your backend api).
    incase you want to have more control over
    the params you can install and set
    qs.stringify as axios' paramsSerializer
    e.g: Send a request to an endpoint
    with complexe query params like this
    /endpoint?param[][key1]=val1&param[][key2]=val2
  */
  paramsSerializer: params => {
    return qs.stringify(params, {
      arrayFormat: "brackets",
      encode: false
    });
  }
});

instance.interceptors.request.use(
  config => {
    // Either setup your Base api URL here or in
    // a .env file under 'REACT_APP_BASE_URL'
    const BASE_API_URL =
      process.env.REACT_APP_BASE_API_URL || "https://www.your_api_url.com/";

    if (config.baseURL === BASE_API_URL && !config.headers.Authorization) {
      // we get the token from local storage if it exists
      // and we set it to the Authorization header
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => Promise.reject(error)
);

// response interceptor
instance.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */
  ({ data: res, ...response }) => {
    // if is a "success" status code
    if (response.status > 100 && response.status < 400) {
      return res;
    } else {
      throw new Error(res.message || "Error occured");
    }
  },
  error => Promise.reject(error)
);

export default instance;

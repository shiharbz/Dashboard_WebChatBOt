import axios from 'axios';


const instance = axios.create({
  baseURL: "http://localhost:5000",
});
instance.defaults.headers.common["Authorization"] = "AUTH TOKEN FROM INSTANCE";
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.interceptors.request.use(request => {
    console.log(request);
    // Edit request config
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});
instance.interceptors.response.use(
  (response) => {
    console.log(response);
    // Edit response config
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
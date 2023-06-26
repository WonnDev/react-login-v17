import axios from "axios";

const instance = axios.create({
  baseURL: `https://reqres.in/`,
  // timeout: 1000,
  // headers: {'X-Custom-Header': ''}
});

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    console.log("check res from CustomizeAxios: ", response);
    return response.data ? response.data : { statusCode: response.status };
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error


    //console.log("Error res: ", error.response.data.error); // key: error object JS (Axios handling errors)
    // becare on upline bc if server not res err and u have console err.res.{}, this app willbe crack

    let res = {};
    if(error.response) {
      res.data = error.response.data;
      res.status = error.response.status;
      res.header = error.response.header;
    } else if(error.request) {
      // request was made but no response was received
      console.log(error.request);
    } else {
      // something happened in setting up the req that triggered an Error
      console.log('Error: ', error.message);
    }
    return res;

    // return Promise.reject(error);
  }
);

export default instance;

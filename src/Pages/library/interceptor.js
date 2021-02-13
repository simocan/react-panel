import axios from "axios";

axios.interceptors.request.use(
  function(config) {
    const jwtToken = localStorage.getItem("token");
    if (jwtToken) {
      config.headers["authorization"] = "Bearer " + jwtToken;
    }else{
      console.log("ahanda token yok");
    }
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);


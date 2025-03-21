import axios from 'axios';
const APP_URL_LIVE = "https://serverrai.runstream.co";
const APP_URL_LOCAL = "http://localhost:8080";

function getToken(){
  const data = localStorage && localStorage.getItem('token');
  return data; 
}

const host = window.location.host;
let Api = axios.create({
  baseURL: host === 'localhost:3000' ? APP_URL_LOCAL : APP_URL_LIVE,
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
    'Access-Control-Allow-Origin': '*'
  }
}); 

Api.interceptors.request.use(
  async (config) => {
      const token = getToken();
      if (token !== null) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config; 
  },
  (error) => {
      return Promise.reject(error);
  }
);

export default Api;

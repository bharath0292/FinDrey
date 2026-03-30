import axios from 'axios';

const serverClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
});

serverClient.interceptors.request.use(
  (config) => {
    config.headers['X-Api-Key'] = process.env.API_KEY;
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  },
);

export default serverClient;

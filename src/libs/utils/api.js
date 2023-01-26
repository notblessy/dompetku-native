import axios from 'axios';
import config from '../../config';
import * as SecureStore from 'expo-secure-store';

export const instance = axios.create({
  baseURL: config.API_HOST,
  timeout: 20000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json; charset=utf-8',
  },
});


instance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("accessToken");
    if (token) config.headers['Authorization'] = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

export const fetcher = (url) => {
  return instance.get(url).then((res) => {
    const r = res.data;

    if (!r.success) {
      throw Error(r.data.message);
    }

    return r;
  });
};

export default instance;

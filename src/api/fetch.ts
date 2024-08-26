import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.coingate.com/api/v2',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Можно выбросить тостер
    return Promise.reject(error);
  }
);


export async function fetchAxios<T>(url: string) {
  try {
    const response = await axiosInstance.get(url);
    return response.data as T;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

const axiosProxyInstance = axios.create();

axiosProxyInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Можно выбросить тостер
    return Promise.reject(error);
  }
);

export async function fetchProxyAxios<T>(url: string) {
  try {
    const response = await axiosProxyInstance.get(url);
    return response.data as T;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

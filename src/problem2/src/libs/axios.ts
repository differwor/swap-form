import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

const axiosConfig: CreateAxiosDefaults = {
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
};

const axiosInstance: AxiosInstance = axios.create(axiosConfig);

export default axiosInstance;

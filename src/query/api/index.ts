// import { BASE_URL } from "@/constants/api-base-url.contants";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export const BASE_URL = process.env.VITE_APP_API_URL;

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 3 * 60 * 1000,
});

const authHeader = (): object => {
  const authToken = JSON.parse(String(localStorage.getItem("token")));

  if (authToken) {
    return { headers: { Authorization: "Bearer " + authToken } };
  } else {
    window.location.replace("/");
    return {};
  }
};

export { api, authHeader };

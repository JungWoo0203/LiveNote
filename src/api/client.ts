import axios from "axios";
import { paramsSerializer } from "@/lib/paramsSerializer";

const apiClient = axios.create({
  baseURL: "https://notely.me",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer,
});

export default apiClient;

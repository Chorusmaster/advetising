import axios from "axios";
import type { AxiosInstance } from "axios";
import type { CreateCampaignData, RegisterData } from "@/types/api";
import type { User } from "@/types/user";

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

export default api;

export async function requestCsrfCookie() {
  return await api.get("/sanctum/csrf-cookie");
}

export async function register(data: RegisterData) {
  return await api.post("/api/register", data);
}
 
export async function createCampaign(data: CreateCampaignData) {
  return await api.post("api/campaigns", data);
}

export async function getMe(): Promise<User> {
  return await api.get("/api/user");
}
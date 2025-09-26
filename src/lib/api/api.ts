import axios from "axios";
import { getAccessToken } from "@/lib/auth/getAccessToken";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    config.headers["x-auth-token"] = token;
    config.headers["x-client-id"] = process.env.NEXT_CLIENT_ID;
    return config;
});
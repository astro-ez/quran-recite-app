import axios, { AxiosError, AxiosResponse } from "axios";

// Client-side API instance for Next.js API routes
export const clientApi = axios.create({
  baseURL: "/api", // Base URL for Next.js API routes
  timeout: 10000, // 10 second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add any client-side logic here
clientApi.interceptors.request.use(
  (config) => {
    // Add timestamp for cache busting if needed
    if (config.method === "get") {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle responses and errors
clientApi.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Handle unauthorized - redirect to login if needed
          console.error("Unauthorized access");
          break;
        case 403:
          // Handle forbidden
          console.error("Forbidden access");
          break;
        case 404:
          // Handle not found
          console.error("Resource not found");
          break;
        case 500:
          // Handle server error
          console.error("Internal server error");
          break;
        default:
          console.error(`API Error: ${status}`, data);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network error - no response received");
    } else {
      // Something else happened
      console.error("Request error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default clientApi;
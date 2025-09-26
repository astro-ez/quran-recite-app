// API endpoints for Next.js API routes
export const clientApiEndpoints = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    me: "/auth/me",
  },
  
  // Add more endpoints as you create API routes
  // Example:
  // users: {
  //   list: "/users",
  //   create: "/users",
  //   update: (id: string) => `/users/${id}`,
  //   delete: (id: string) => `/users/${id}`,
  // },
  
  // quran: {
  //   chapters: "/quran/chapters",
  //   verses: (chapterId: number) => `/quran/chapters/${chapterId}/verses`,
  // },
} as const;

// Type helper for endpoint paths
export type ClientApiEndpoint = typeof clientApiEndpoints;
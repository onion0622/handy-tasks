import { request } from "@/app/lib/api";   

export type AuthPayload = { token: string; refreshtoken?: string}; 


function normalize(raw: any): AuthPayload {
  if (typeof raw === "string") return { token: raw };
  return { token: raw?.token, refreshtoken: raw?.refreshtoken };
}

export const AuthAPI = {
  register: async (b: { username: string; email: string; password: string }) => {
    const r = await request<any>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(b),
    });
    return normalize(r);
  },

  login: async (b: { email: string; password: string }) => {
    const r = await request<any>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(b),
    });
    return normalize(r);
  },
};
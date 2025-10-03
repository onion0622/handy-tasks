// app/lib/api.ts
import { BASE_URL } from "@/app/lib/env";
import { Token } from "./token";

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) throw new Error((await res.text()) || `HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

// Normaliza respuestas del backend para { token, refreshtoken }
function normalizeAuthPayload(raw: any): { token: string; refreshtoken?: string } {
  if (typeof raw === "string") {
    return { token: raw };
  }
  return { token: raw?.token, refreshtoken: raw?.refreshtoken };
}

// Ajusta el path/payload según tu backend:
async function refreshTokens(): Promise<boolean> {
  const refresh = await Token.getRefresh();
  if (!refresh) return false;

  const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: refresh }),
  });

  // Si tu backend devuelve 401/400 en refresh inválido:
  if (!res.ok) return false;

  // Puede venir string o JSON:
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  const { token, refreshtoken } = normalizeAuthPayload(data);

  if (!token) return false;

  await Token.setTokens({ accessToken: token, refreshToken: refreshtoken });
  return true;
}

export async function authRequest<T>(path: string, init?: RequestInit): Promise<T> {
  // 1) usar access token actual
  const access = await Token.getAccess();
  if (!access) throw new Error("NO_AUTH");

  let res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
      ...(init?.headers || {}),
    },
    ...init,
  });

  // 2) si 401, intentar refresh y reintentar una vez
  if (res.status === 401) {
    const ok = await refreshTokens();
    if (!ok) {
      await Token.clear();
      throw new Error("UNAUTHORIZED");
    }
    const newAccess = await Token.getAccess();
    res = await fetch(`${BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${newAccess}`,
        ...(init?.headers || {}),
      },
      ...init,
    });
  }

  const text = await res.text();
  if (!res.ok) throw new Error(text || `HTTP ${res.status}`);
  return (text ? JSON.parse(text) : undefined) as T;
}

import {BASE_URL} from "@/app/lib/env"; //Traer URL desde .env

async function request<T>(path:string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`,{
        headers: {"Content-Type": "application/json", ...(init?.headers || {})},
        ...init,
    });
    if (!res.ok) throw new Error((await res.text()) || `HTTP ${res.status}`); //manejo de errores, en el backend
    return res.json() as Promise<T>; // parsea el JSON y lo castea a T
}

export type AuthResponse = {token: string}; // Definir el tipo de la respuesta

export const AuthAPI = {
    register:(b: {nombre: string; email: string; "contraseña": string }) =>
        request<AuthResponse>("/api/auth/register", {method: "POST", body: JSON.stringify(b)}),
    login: (b: {email: string; "contraseña": string}) =>
        request<AuthResponse>("/api/auth/login", {method: "POST", body: JSON.stringify(b)})
};
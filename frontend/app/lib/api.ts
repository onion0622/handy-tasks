import {BASE_URL} from "@/app/lib/env"; //Traer URL desde .env


export async function request<T>(path:string, init?: RequestInit): Promise<T> { //ahora se exporta para manejarlo en los services
    const res = await fetch(`${BASE_URL}${path}`,{
        headers: {"Content-Type": "application/json", ...(init?.headers || {})},
        ...init,
    });
    if (!res.ok) throw new Error((await res.text()) || `HTTP ${res.status}`); //manejo de errores, en el backend
    return res.json() as Promise<T>; // parsea el JSON y lo castea a T
}


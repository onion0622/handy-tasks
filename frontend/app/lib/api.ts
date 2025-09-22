import {BASE_URL} from "@/app/lib/env"; //Traer URL desde .env
import { Token } from "./token"; //Token del user

//Apartado de sin JWT, Login, Register ...

export async function request<T>(path:string, init?: RequestInit): Promise<T> { //ahora se exporta para manejarlo en los services
    const res = await fetch(`${BASE_URL}${path}`,{
        headers: {"Content-Type": "application/json", ...(init?.headers || {})},
        ...init,
    });
    if (!res.ok) throw new Error((await res.text()) || `HTTP ${res.status}`); //manejo de errores, en el backend
    return res.json() as Promise<T>; // parsea el JSON y lo castea a T
}

//Apartado con JWT, Consulta a tareas ...

export async function authRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const token = await Token.get();
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "", //Diferencia clave, el body se define con un header que va mandar el token
      ...(init?.headers || {}),                      //como en el postman 
    },
    ...init,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(text || `HTTP ${res.status}`);
  return (text ? JSON.parse(text) : undefined) as T;
}
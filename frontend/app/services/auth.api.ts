//Api actual para el login/register
import { request } from "@/app/lib/api";    
export type AuthResponse = {token: string}; // Definir el tipo de la respuesta

export type RegisterBody = {  //forma de contratoe de un dato (body que espera el controller del backend o respuesta)
  username: string;             //En caso de que se cambie algo en el backend solo se modifica este y ya el resto queda bien, gracias al export
  email: string;
  password: string; 
};

export type LoginBody = {
  email: string;
  password: string;
}

export const AuthAPI = {
    register:(b: {username: string; email: string; password: string }) =>
        request<AuthResponse>("/api/auth/register", {method: "POST", body: JSON.stringify(b)}),
    login: (b: {email: string; password: string}) =>
        request<AuthResponse>("/api/auth/login", {method: "POST", body: JSON.stringify(b)})
};


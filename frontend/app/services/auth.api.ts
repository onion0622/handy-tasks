import { request } from "@/app/lib/api";
export type AuthResponse = {token: string}; // Definir el tipo de la respuesta

export type RegisterBody = {  //forma de contraro de de un dato (body que espera el controller del backend o respuesta)
  nombre: string;             //En caso de que se cambie algo en el backend solo se modifica este y ya el resto queda bien, gracias al export
  email: string;
  "contraseña": string; 
};

export type LoginBody = {
  email: string;
  "contraseña": string;
}

export const AuthAPI = {
    register:(b: {nombre: string; email: string; "contraseña": string }) =>
        request<AuthResponse>("/api/auth/register", {method: "POST", body: JSON.stringify(b)}),
    login: (b: {email: string; "contraseña": string}) =>
        request<AuthResponse>("/api/auth/login", {method: "POST", body: JSON.stringify(b)})
};
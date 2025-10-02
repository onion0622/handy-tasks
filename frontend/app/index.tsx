// Redireccion a la ruta dentro del layout que envuelve resumen-tareas-config
// Redireccion inicial
// /auth/login
// /resumen
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/auth/login" />;
}

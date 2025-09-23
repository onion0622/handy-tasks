//import { Redirect } from "expo-router";
//export default function Index() { return <Redirect href="/auth/register" />; } //Hace que el QR empieze en el register. 
                                                                            //Santos quitalo para hacer pruebas de la vista mai
// Redireccion a la ruta dentro del layout que envuelve resumen-tareas-config
// Redireccion inicial
// /auth/login
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/resumen" />;
}

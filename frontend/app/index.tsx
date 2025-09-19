import { Redirect } from "expo-router";
export default function Index() { return <Redirect href="/auth/register" />; } //Hace que el QR empieze en el register. 
                                                                            //Santos quitalo para hacer pruebas de la vista main
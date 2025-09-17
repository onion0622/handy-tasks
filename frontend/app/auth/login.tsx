import { View, Text } from "react-native";
import {authStyles} from "@/components/authForm/AuthForm.styles"; // 👈 estilos
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Link } from "expo-router";

export default function Login() {
  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Iniciar Sesión</Text>

      <Input placeholder="Email" />
      <Input placeholder="Contraseña" secureTextEntry />

      <Button title="Entrar" onPress={() => console.log("Login")} />

      <Link href="/auth/register" style={authStyles.link}>
        ¿No tienes cuenta? Regístrate
      </Link>
    </View>
  );
}


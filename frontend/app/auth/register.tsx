// app/(auth)/register.tsx
import { View, Text } from "react-native";
import {authStyles} from "@/components/authForm/AuthForm.styles"; // 👈 estilos
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Link } from "expo-router";

export default function Register() {
  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Crear Cuenta</Text>

      <Input placeholder="Nombre" />
      <Input placeholder="Email" />
      <Input placeholder="Contraseña" secureTextEntry />

      <Button title="Registrarse" onPress={() => console.log("Register")} />

      <Link href="/auth/login" style={authStyles.link}>
        ¿Ya tienes cuenta? Inicia sesión
      </Link>
    </View>
  );
}

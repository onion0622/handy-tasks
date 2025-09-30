// app/(auth)/login.tsx
import { useState } from "react";
import { View, Text, Alert, Keyboard } from "react-native";
import { authStyles } from "@/components/authForm/AuthForm.styles";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Link, router } from "expo-router";
import { AuthAPI } from "@/app/services/auth.api";
import PasswordInput from "@/components/ui/PasswordInput";
import { Token } from "../lib/token"; // Llamamos el import del token para manejarlo a partir de ahora.
import FormScreen from "@/components/layout/FormScreen";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!email || !pwd) return Alert.alert("Faltan datos");
    setLoading(true);
    try {
      const { token } = await AuthAPI.login({ email, password: pwd });
      await Token.set(token); //Ahora la rutina va esperar por el token, y le va asignar el valor que obtenga. 
      //console.log("JWT guardado =>", (await Token.get())?.slice(0, 20) + "..."); Log para probar si se guarda el token.
      router.replace("/(tabs)/tareas"); // ir a la vista principal
    } catch (e: any) {
      Alert.alert("Inicio de sesión fallido", e?.message || "Credenciales inválidas");
    } finally {
      setEmail("");
      setPwd("");
      setLoading(false);    //baja el teclado
    }
  };

return (
  <FormScreen
    footer={
      <Button
        title={loading ? "Ingresando..." : "Entrar"}
        onPress={onSubmit}
        disabled={loading}
      />
    }
  >
    <View style={[authStyles.container, { justifyContent: "center", minHeight: 260 }]}>
      <Text style={authStyles.title}>Iniciar Sesión</Text>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <PasswordInput
        placeholder="Contraseña"
        value={pwd}
        onChangeText={setPwd}
        secureTextEntry
        validate={false}
      />

      <Link href="/auth/register" style={authStyles.link}>
        ¿No tienes cuenta? Regístrate
      </Link>
    </View>
  </FormScreen>
  );

}

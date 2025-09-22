// app/(auth)/register.tsx
import { useState } from "react";
import { View, Text, Alert, Keyboard } from "react-native";
import { authStyles } from "@/components/authForm/AuthForm.styles";
import Input from "@/components/ui/Input";
import { Link } from "expo-router";
import { AuthAPI } from "@/app/services/auth.api";
import PasswordInput from "@/components/ui/PasswordInput";
import Button from "@/components/ui/Button";


export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!nombre || !email || !pwd) return Alert.alert("Faltan datos");
    setLoading(true);
    try {
      const res = await AuthAPI.register({ nombre, email, "contraseña": pwd });
      console.log("Registro OK =>", res); // { token: "..." }
      Alert.alert("Cuenta creada", "Ahora puedes iniciar sesión.");
    } catch (e: any) {
      console.log("Error register:", e);
      Alert.alert("Registro fallido", e?.message || "Intenta con otro email");
    } finally {
      setNombre("");
      setEmail("");
      setPwd("");
      Keyboard.dismiss();
      setLoading(false);
    }
  };

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Crear Cuenta</Text>

      <Input placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <Input placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <PasswordInput placeholder="Contraseña" value={pwd} onChangeText={setPwd} secureTextEntry/>

      <Button title={loading ? "Creando..." : "Registrarse"} onPress={onSubmit} disabled={loading} />

      <Link href="/auth/login" style={authStyles.link}>
        ¿Ya tienes cuenta? Inicia sesión
      </Link>
    </View>
  );
}

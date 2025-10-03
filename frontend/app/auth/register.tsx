// app/(auth)/register.tsx
import { useState } from "react";
import { View, Text, Alert } from "react-native";
import { authStyles } from "@/components/authForm/AuthForm.styles";
import Input from "@/components/ui/Input";
import { Link, router } from "expo-router";
import { AuthAPI } from "@/app/services/auth.api";
import PasswordInput from "@/components/ui/PasswordInput";
import Button from "@/components/ui/Button";
import { Token } from "../lib/token";
import FormScreen from "@/components/layout/FormScreen";


const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const [pwd, setPwd] = useState("");
  const [pwdOk, setPwdOk] = useState(false)
  const [loading, setLoading] = useState(false);


    const onChangeEmail = (v: string) => {
    setEmail(v);
    if (!v) setEmailErr("El email es obligatorio");
    else setEmailErr(isEmail(v) ? null : "Email no válido");
  };

  const canSubmit =
    username.trim().length > 0 &&
    isEmail(email) &&
    pwdOk &&
    !loading;

  const onSubmit = async () => {
    if (!username || !email || !pwd) return Alert.alert("Faltan datos");
    setLoading(true);
    try {
      const {token, refreshtoken} = await AuthAPI.register({ username, email, password: pwd });
      await Token.setTokens({ accessToken: token, refreshToken: refreshtoken });
      //console.log("JWT guardado =>", (await Token.get())?.slice(0, 20) + "..."); Log para probar si se guarda el token.
      router.replace({ pathname: "/(tabs)/tareas", params: { justRegistered: "1" } });  // Ahora el register hace auto-loggin la primera vez.
    } catch (e: any) {
      console.log("Error register:", e);
      Alert.alert("Registro fallido", e?.message || "Intenta con otro email");
    } finally {
      setUsername("");
      setEmail("");
      setPwd("");
      setLoading(false);
    }
  };

return (
  <FormScreen
    footer={
      <Button
        title={loading ? "Creando..." : "Registrarse"}
        onPress={onSubmit}
        disabled={loading}
      />
    }
  >
    <View style={[authStyles.container, { justifyContent: "center", minHeight: 320 }]}>
      <Text style={authStyles.title}>Crear Cuenta</Text>

      <Input placeholder="Nombre" value={username} onChangeText={setUsername} />
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
      />

      <Link href="/auth/login" style={authStyles.link}>
        ¿Ya tienes cuenta? Inicia sesión
      </Link>
    </View>
  </FormScreen>
);

}

import { View, Text } from "react-native";
import RouteParamToast from "@/components/toasts/RouteParamToast"

export default function TareasScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <RouteParamToast
        param="justRegistered"
        message="¡Cuenta creada con éxito! Ya puedes iniciar sesión la próxima vez desde Login." //Define como va ser el toast
      />

      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 12 }}>Tareas</Text>
    </View>
  );
}
// components/ui/FAB --> Boton Flotante (Floating Action Button)
import React from "react";
import { Pressable, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "../../theme";

type Props = {
  onPress: () => void;
  style?: ViewStyle; // la posición (flotar) la define el padre
  iconName?: keyof typeof Ionicons.glyphMap; // opcional, por defecto "add"
};

export const FAB: React.FC<Props> = ({ onPress, style, iconName = "add" }) => {
  const theme = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Crear tarea"
      android_ripple={{ color: theme.colors.surfaceMuted }}
      style={[
        {
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: theme.colors.primary,
          alignItems: "center",
          justifyContent: "center",
          // sombra iOS
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 4 },
          // sombra Android
          elevation: 6,
        },
        style,
      ]}
    >
      <Ionicons name={iconName} size={28} color="#fff" />
    </Pressable>
  );
};

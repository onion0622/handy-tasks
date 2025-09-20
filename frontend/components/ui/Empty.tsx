// componente amigable para un espacio vacio 
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppTheme } from "../../theme";

type Props = {
  message?: string;
};

export const Empty: React.FC<Props> = ({ message = "No hay tareas disponibles" }) => {
  const theme = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.icon, { color: theme.colors.textMuted }]}>Vacio 📝</Text>
      <Text
        style={[
          styles.text,
          { color: theme.colors.textMuted, fontSize: theme.typography.body.fontSize },
        ]}
      >
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  icon: {
    fontSize: 40,
    marginBottom: 8,
  },
  text: {
    textAlign: "center",
  },
});

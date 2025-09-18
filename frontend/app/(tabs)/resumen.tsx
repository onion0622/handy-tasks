import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ResumenScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen</Text>
      <Text style={styles.subtitle}>Aquí va tu tablero de tareas (stats, filtros, lista).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "800", textAlign: "center", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#666", textAlign: "center" },
});

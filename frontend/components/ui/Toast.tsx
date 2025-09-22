import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = { visible: boolean; text: string };
export default function Toast({ visible, text }: Props) {
  if (!visible) return null;
  return (
    <View style={styles.wrap}>
      <View style={styles.toast}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: "absolute", top: 16, left: 16, right: 16, zIndex: 10 },
  toast: {
    backgroundColor: "#10B981", // verde
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  text: { color: "white", fontWeight: "600" },
});

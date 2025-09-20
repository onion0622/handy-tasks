import React, { useState } from "react";
import { View, Pressable, StyleSheet, TextInputProps, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Input from "./Input";

type Props = TextInputProps & { containerStyle?: ViewStyle; initiallyVisible?: boolean };

export default function PasswordInput({ containerStyle, initiallyVisible = false, ...props }: Props) {
  const [visible, setVisible] = useState(initiallyVisible);
  return (
    <View style={[styles.field, containerStyle]}>
      <Input {...props} secureTextEntry={!visible} style={[props.style, styles.input]} />
      <Pressable onPress={() => setVisible(v => !v)} style={styles.eyeBtn} hitSlop={10}>
        <Ionicons name={visible ? "eye-off" : "eye"} size={20} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  field: { position: "relative" },
  input: { paddingRight: 38 },           // espacio para el ícono
  eyeBtn: { position: "absolute", right: 12, top: 14 },
});

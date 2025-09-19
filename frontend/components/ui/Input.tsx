// components/ui/Input.tsx
import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

export type InputProps = TextInputProps; // acepta value, onChangeText, secureTextEntry, etc.

export default function Input({ style, ...props }: InputProps) {
  return <TextInput {...props} style={[styles.input, style]} />;
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
});

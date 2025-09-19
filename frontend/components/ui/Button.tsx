import React from "react";
import { Pressable, Text, StyleSheet, ActivityIndicator, PressableProps } from "react-native";

type Props = {
  title: string;
  onPress: () => void | Promise<void>;
  disabled?: boolean;
  loading?: boolean;
} & Omit<PressableProps, "onPress">;

export default function Button({ title, onPress, disabled, loading, style, ...rest }: Props) {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.btn,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style as any,
      ]}
      {...rest}
    >
      {loading ? <ActivityIndicator /> : <Text style={styles.text}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#0a84ff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 4,
  },
  pressed: { opacity: 0.85 },
  disabled: { backgroundColor: "#9ec8ff" },
  text: { color: "#fff", fontWeight: "600" },
});

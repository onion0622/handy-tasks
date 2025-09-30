import React, { useEffect, useMemo, useState } from "react";
import { View, Pressable, StyleSheet, TextInputProps, ViewStyle, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Input from "./Input";

type Props = TextInputProps & {
  containerStyle?: ViewStyle;
  initiallyVisible?: boolean;
  minLength?: number;     // default 6
  validate?: boolean;     // feedback visual
  onValidChange?: (ok: boolean) => void;
};

export default function PasswordInput({
  containerStyle,
  initiallyVisible = false,
  minLength = 6,
  validate = true,
  onValidChange,
  ...props
}: Props) {
  const [visible, setVisible] = useState(initiallyVisible);
  const len = (props.value?.toString()?.length ?? 0);
  const touched = len > 0;
  const valid = useMemo(() => len >= minLength, [len, minLength]);

  useEffect(() => { onValidChange?.(valid); }, [valid, onValidChange]);

  const showHelper = validate && (!touched || (touched && !valid));
  const helperText = !touched
    ? `Mínimo ${minLength} caracteres`
    : `Faltan ${Math.max(minLength - len, 0)} caracteres`;

  return (
    <View style={[styles.field, containerStyle]}>
      <Input
        {...props}
        secureTextEntry={!visible}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="password"
        autoComplete="password"
        style={[props.style, styles.input]}   // menos espacio debajo
      />

      {validate && touched && (
        <View style={styles.statusIcon}>
          <Ionicons
            name={valid ? "checkmark-circle" : "close-circle"}
            size={18}
            color={valid ? "#16a34a" : "#ef4444"}
          />
        </View>
      )}

      <Pressable onPress={() => setVisible(v => !v)} style={styles.eyeBtn} hitSlop={10}>
        <Ionicons name={visible ? "eye-off" : "eye"} size={20} />
      </Pressable>

      {showHelper && (
        <Text style={[styles.helper, !touched ? styles.neutral : styles.err]}>
          {helperText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { position: "relative" },
  input: { paddingRight: 96, marginBottom: 4 }, // << acerca el helper
  statusIcon: { position: "absolute", right: 40, top: 14 },
  eyeBtn: { position: "absolute", right: 12, top: 14 },
  helper: { fontSize: 12, marginTop: 2 },
  neutral: { color: "#6b7280" },
  err: { color: "#ef4444" },
});

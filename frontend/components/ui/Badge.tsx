// components/ui/Badge.tsx
import React from "react";
import { Text, View, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { useAppTheme } from "../../theme";

type Props = {
  label: string;
  type?: "success" | "warning" | "default";
  style?: ViewStyle;
};

export const Badge: React.FC<Props> = ({ label, type = "default", style }) => {
  const theme = useAppTheme();

  const background =
    type === "success"
      ? theme.colors.success
      : type === "warning"
      ? theme.colors.warning
      : theme.colors.surfaceMuted;

  const textColor =
    type === "default" ? theme.colors.text : "#fff";

  const container: ViewStyle = {
    backgroundColor: background,
    borderRadius: theme.radii.pill,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    alignSelf: "flex-start",
  };

  const text: TextStyle = {
    fontSize: theme.typography.labelSm.fontSize,
    fontWeight: theme.typography.labelSm.fontWeight,
    color: textColor,
  };

  return (
    <View style={[container, style]}>
      <Text style={text}>{label}</Text>
    </View>
  );
};

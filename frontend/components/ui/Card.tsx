// components/ui/Card.tsx
import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useAppTheme } from "../../theme";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  variant?: "flat" | "elevated";
};

export const Card: React.FC<Props> = ({ children, style, variant = "flat" }) => {
  const theme = useAppTheme();

  const baseStyle: ViewStyle = {
    backgroundColor: theme.colors.cardBg,
    borderRadius: theme.radii.md,
    padding: theme.layout.cardPadding,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  };

  const elevated: ViewStyle = variant === "elevated"
    ? {
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
      }
    : {};

  return <View style={[baseStyle, elevated, style]}>{children}</View>;
};

const styles = StyleSheet.create({});

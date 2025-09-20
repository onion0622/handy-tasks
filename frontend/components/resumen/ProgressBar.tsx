// componente para la barra de progreso
import React from "react";
import { View, Text } from "react-native";
import { useAppTheme } from "../../theme";
import { useTasks } from "../../app/store/tasks";// mocks 

export const ProgressBar: React.FC = () => {
  const theme = useAppTheme();
  const { progressPercent } = useTasks(); //Logica y definiciones por tareas

  //Track (Barra de fondo) -- Fill (relleno) -- Progreso en %
  return (
    <View style={{ marginBottom: theme.layout.sectionGap }}>
      <View
        style={{
          height: theme.layout.progressHeight,
          backgroundColor: theme.colors.progressTrack,
          borderRadius: theme.radii.pill,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            backgroundColor: theme.colors.progressFill,
            borderRadius: theme.radii.pill,
          }}
        />
      </View>

      <Text
        style={{
          marginTop: theme.spacing.xs,
          ...theme.typography.labelSm,
          color: theme.colors.textMuted,
        }}
      >
        {progressPercent}% completado
      </Text>
    </View>
  );
};

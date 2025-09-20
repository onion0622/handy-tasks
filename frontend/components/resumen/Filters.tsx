// components para el filtro por dias
import React from "react";
import { View, Text, Pressable } from "react-native";
import { useAppTheme } from "../../theme";
import { useTasks, TaskFilter } from "../../app/store/tasks";//--> configuracion de mocks para filtros

//Mapeo de cada etiqueta a texto 
const CHIP_LABEL: Record<TaskFilter, string> = {
  todos: "Todos",
  hoy: "Hoy",
  semana: "Semana",
};

export const Filters: React.FC = () => {
  const theme = useAppTheme();
  const { filter, setFilter } = useTasks();

  const Chip: React.FC<{ value: TaskFilter }> = ({ value }) => {
    const selected = filter === value;
    return (
      <Pressable
        onPress={() => setFilter(value)}
        accessibilityRole="button"
        accessibilityLabel={`Filtro ${CHIP_LABEL[value]}`}
        android_ripple={{ color: theme.colors.surfaceMuted }}
        style={{
          paddingHorizontal: theme.spacing.md,
          paddingVertical: 8,
          borderRadius: theme.radii.pill,
          backgroundColor: selected ? theme.colors.primary : theme.colors.surface,
          borderWidth: 1,
          borderColor: selected ? theme.colors.primary : theme.colors.border,
        }}
      >
        <Text
          style={{
            color: selected ? "#fff" : theme.colors.text,
            ...theme.typography.body,
            fontWeight: "600",
          }}
        >
          {CHIP_LABEL[value]}
        </Text>
      </Pressable>
    );
  };

  return (
    <View
      style={{
        flexDirection: "row",
        gap: theme.spacing.sm,
        marginBottom: theme.layout.sectionGap,
      }}
    >
      <Chip value="todos" />
      <Chip value="hoy" />
      <Chip value="semana" />
    </View>
  );
};

// componente para el conjunto de las tareas en su pre vista
import React from "react";
import { View, Text, Pressable } from "react-native";
import { useAppTheme } from "../../theme";
import { useTasks } from "../../app/store/tasks";
import { TaskItem } from "./TaskItem";
import { Empty } from "../ui/Empty";

export const TaskListPreview: React.FC = () => {
  const theme = useAppTheme();
  const { listByFilter } = useTasks();

  const preview = listByFilter.slice(0, 5);

  return (
    <View style={{ gap: theme.spacing.md }}>
      {preview.length === 0 ? (
        <Empty message="No hay tareas para este filtro" />
      ) : (
        preview.map(t => <TaskItem key={t.id} task={t} />)
      )}

      <Pressable
        onPress={() => {}}
        accessibilityRole="button"
        accessibilityLabel="Ver todas las tareas"
        android_ripple={{ color: theme.colors.surfaceMuted }}
        style={{ alignSelf: "flex-start", paddingVertical: theme.spacing.xs }}
      >
        <Text
          style={{
            ...theme.typography.body,
            color: theme.colors.primary,
            fontWeight: "600",
          }}
        >
          Ver todas →
        </Text>
      </Pressable>
    </View>
  );
};

// componente para el conjunto de las tareas en su pre vista
import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useAppTheme } from "../../theme";
import { useTasks } from "../../app/store/tasks";
import { TaskItem } from "./TaskItem";
import { Empty } from "../ui/Empty";
import { TaskDetailsModal } from "./TaskDetailsModal";
import type { Task } from "../../app/store/tasks";


export const TaskListPreview: React.FC = () => {
  const theme = useAppTheme();
  const { listByFilter } = useTasks();
  const [selected, setSelected] = useState<Task | null>(null);

  const preview = listByFilter.slice(0, 5);

  return (
    <View style={{ gap: theme.spacing.md }}>
      {preview.length === 0 ? (
        <Empty message="No hay tareas para este filtro" />
      ) : (
        preview.map(t => <TaskItem key={t.id} task={t} onPress={() => setSelected(t)} />)
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
        </Text>
      </Pressable>

      {/* Modal de detalle */}
      <TaskDetailsModal visible={!!selected} task={selected} onClose={() => setSelected(null)} />
    </View>
  );
};

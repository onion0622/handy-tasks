// componente que pinta toda la tarea como solo un bloque
import React from "react";
import { View, Text } from "react-native";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { useAppTheme } from "../../theme";
import type { Task } from "../../app/store/tasks";

type Props = { task: Task };

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const dd = d.getDate().toString().padStart(2, "0");
  const mm = (d.getMonth() + 1).toString().padStart(2, "0");
  return `${dd}/${mm}`;
};

export const TaskItem: React.FC<Props> = ({ task }) => {
  const theme = useAppTheme();
  const stateLabel = task.done ? "Completada" : "Pendiente";
  const badgeType = task.done ? "success" : "warning";

  return (
    <Card style={{ padding: theme.spacing.lg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: theme.spacing.sm }}>
        <Text
          numberOfLines={2}
          style={{ ...theme.typography.body, color: theme.colors.text, flex: 1, fontWeight: "600" }}
        >
          {task.titulo}
        </Text>

        <Badge label={stateLabel} type={badgeType as any} />
      </View>

      <View style={{ flexDirection: "row", gap: theme.spacing.md, marginTop: theme.spacing.xs }}>
        <Text style={{ ...theme.typography.labelSm, color: theme.colors.textMuted }}>
          Vence: {formatDate(task.dueAt)}
        </Text>
        <Text style={{ ...theme.typography.labelSm, color: theme.colors.textMuted }}>
          Prioridad: {task.prioridad}
        </Text>
      </View>
    </Card>
  );
};

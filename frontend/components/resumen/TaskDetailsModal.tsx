// components/resumen/TaskDetailsModal.tsx
import React from "react";
import { Modal, View, Text, Pressable } from "react-native";
import { useAppTheme } from "../../theme";
import type { Task } from "../../app/store/tasks";
import { Badge } from "../ui/Badge";

type Props = {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const dd = d.getDate().toString().padStart(2, "0");
  const mm = (d.getMonth() + 1).toString().padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

export const TaskDetailsModal: React.FC<Props> = ({ visible, task, onClose }) => {
  const theme = useAppTheme();
  if (!task) return null;
  const stateLabel = task.done ? "Completada" : "Pendiente";
  const badgeType = task.done ? "success" : "warning";

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
          alignItems: "center",
          justifyContent: "center",
          padding: theme.layout.screenPadding,
        }}
      >
        <Pressable
          onPress={() => {}}
          style={{
            width: "100%",
            borderRadius: theme.radii.lg,
            backgroundColor: theme.colors.cardBg,
            borderWidth: 1,
            borderColor: theme.colors.cardBorder,
            padding: theme.layout.cardPadding,
            gap: theme.spacing.md,
          }}
        >
          <View style={{ gap: theme.spacing.xs }}>
            <Text style={{ ...theme.typography.titleLg, color: theme.colors.text, fontWeight: "700" }}>
              {task.titulo}
            </Text>
            <Badge label={stateLabel} type={badgeType as any} />
          </View>

          <View style={{ gap: theme.spacing.xs }}>
            <Text style={{ ...theme.typography.body, color: theme.colors.text }}>
              <Text style={{ fontWeight: "700" }}>Vence: </Text>
              {formatDate(task.dueAt)}
            </Text>
            <Text style={{ ...theme.typography.body, color: theme.colors.text }}>
              <Text style={{ fontWeight: "700" }}>Prioridad: </Text>
              {task.prioridad}
            </Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: theme.spacing.sm }}>
            <Pressable
              onPress={onClose}
              android_ripple={{ color: theme.colors.surfaceMuted }}
              style={{ paddingVertical: 8, paddingHorizontal: theme.spacing.lg }}
            >
              <Text style={{ color: theme.colors.text, ...theme.typography.subtitle }}>Cerrar</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

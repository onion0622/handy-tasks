// components/tareas/TaskFormModal.tsx
import React, { useMemo, useState } from "react";
import { Modal, Pressable, View, Text, TextInput, Platform } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useAppTheme } from "../../theme";
import type { NewTaskInput } from "../../app/store/tasks";

/**
 * Componente modal de formulario para crear una tarea.
 * - Controlado por props `visible` y `onClose`.
 * - Devuelve los datos válidos por `onSubmit`.
 */
type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: NewTaskInput) => void;
  initial?: Partial<NewTaskInput>; // opcional, por si luego lo usas para editar
};

export const TaskFormModal: React.FC<Props> = ({ visible, onClose, onSubmit, initial }) => {
  const theme = useAppTheme();

  // Estado interno del formulario (controlado dentro del modal)
  const [titulo, setTitulo] = useState(initial?.titulo ?? "");
  const [fecha, setFecha] = useState<Date>(initial?.dueAt ? new Date(initial!.dueAt) : new Date());
  const [prioridad, setPrioridad] = useState<"alta" | "media" | "baja">(initial?.prioridad ?? "media");

  // Mostrar/ocultar pop del DatePicker en Android (en iOS puede quedarse inline si quieres)
  const [showPicker, setShowPicker] = useState(false);

  // Habilitar botón Guardar solo si hay título
  const canSave = useMemo(() => titulo.trim().length > 0, [titulo]);

  // Manejar cambio de fecha del picker
  const onChangeDate = (event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === "android") setShowPicker(false); // cierra el pop en Android
    if (selected) setFecha(selected);
  };

  // Enviar datos válidos al padre
  const handleSubmit = () => {
    if (!canSave) return;
    const payload: NewTaskInput = {
      id: Date.now().toString(),
      titulo: titulo.trim(),
      dueAt: fecha.toISOString(),
      prioridad,
    };
    onSubmit(payload);
    // Limpieza básica al cerrar
    setTitulo("");
    setFecha(new Date());
    setPrioridad("media");
  };

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      {/* Fondo */}
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
        {/* Caja del formulario (el onPress vacío evita cerrar al tocar dentro) */}
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
          <Text style={{ ...theme.typography.titleLg, color: theme.colors.text }}>
            Nueva tarea
          </Text>

          {/* Título */}
          <View style={{ gap: 6 }}>
            <Text style={{ ...theme.typography.labelSm, color: theme.colors.textMuted }}>Título</Text>
            <TextInput
              placeholder="Ej: Estudiar cálculo"
              placeholderTextColor={theme.colors.textMuted}
              value={titulo}
              onChangeText={setTitulo}
              style={{
                borderWidth: 1,
                borderColor: theme.colors.border,
                borderRadius: theme.radii.md,
                paddingHorizontal: theme.spacing.md,
                paddingVertical: 10,
                color: theme.colors.text,
                ...theme.typography.body,
              }}
            />
          </View>

          {/* Fecha con DatePicker */}
          <View style={{ gap: 6 }}>
            <Text style={{ ...theme.typography.labelSm, color: theme.colors.textMuted }}>Fecha límite</Text>

            {/** En iOS podrías dejar el picker visible inline.
             *  Para experiencia consistente, usamos botón + popup en ambas plataformas. */}
            <Pressable
              onPress={() => setShowPicker(true)}
              style={{
                borderWidth: 1,
                borderColor: theme.colors.border,
                borderRadius: theme.radii.md,
                paddingVertical: 12,
                paddingHorizontal: theme.spacing.md,
              }}
            >
              <Text style={{ color: theme.colors.text }}>
                {fecha.toLocaleDateString()}
              </Text>
            </Pressable>

            {showPicker && (
              <DateTimePicker
                value={fecha}
                mode="date"
                display={Platform.select({ ios: "inline", android: "calendar" })}
                onChange={onChangeDate}
              />
            )}
          </View>

          {/* Prioridad (chips) */}
          <View style={{ gap: 6 }}>
            <Text style={{ ...theme.typography.labelSm, color: theme.colors.textMuted }}>Prioridad</Text>
            <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
              {(["alta", "media", "baja"] as const).map((p) => {
                const selected = prioridad === p;
                return (
                  <Pressable
                    key={p}
                    onPress={() => setPrioridad(p)}
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
                        ...theme.typography.body,
                        color: selected ? "#fff" : theme.colors.text,
                        fontWeight: "600",
                        textTransform: "capitalize",
                      }}
                    >
                      {p}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Acciones */}
          <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: theme.spacing.sm }}>
            <Pressable
              onPress={onClose}
              style={{ paddingVertical: 10, paddingHorizontal: 16 }}
            >
              <Text style={{ ...theme.typography.subtitle, color: theme.colors.text }}>Cancelar</Text>
            </Pressable>

            <Pressable
              onPress={handleSubmit}
              disabled={!canSave}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 16,
                borderRadius: theme.radii.md,
                backgroundColor: canSave ? theme.colors.primary : theme.colors.surface,
                borderWidth: 1,
                borderColor: canSave ? theme.colors.primary : theme.colors.border,
              }}
            >
              <Text
                style={{
                  ...theme.typography.subtitle,
                  color: canSave ? "#fff" : theme.colors.textMuted,
                  fontWeight: "600",
                }}
              >
                Guardar
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

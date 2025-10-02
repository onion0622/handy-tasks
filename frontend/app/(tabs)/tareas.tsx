// app/(tabs)/tareas.tsx
import React, { useState } from "react";
import { SafeAreaView,ScrollView, View, Text, Modal, Pressable, TextInput } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useAppTheme } from "../../theme";
import { FAB } from "../../components/ui/FAB";
import { useTasks } from "../store/tasks"; // Aquí traemos el contexto (donde está addTask)

export default function TareasScreen() {
  const theme = useAppTheme(); // Tema global (colores, tipografía, etc.)
  const headerHeight = useHeaderHeight(); // Altura del header para que nada quede debajo
  const [open, setOpen] = useState(false); // Estado que controla si el modal (formulario) está abierto o cerrado

  // Estados del formulario
  const [titulo, setTitulo] = useState(""); // texto que escribe el usuario como título
  const [dueAt, setDueAt] = useState(""); // fecha de vencimiento
  const [prioridad, setPrioridad] = useState<"alta" | "media" | "baja">("media"); // prioridad seleccionada

  const { addTask,listByFilter } = useTasks(); // función que viene del store, agrega una tarea

  // Función que se ejecuta al darle "guardar"
  const handleSave = () => {
    if (!titulo.trim()) return; // si está vacío, no deja guardar
    addTask({
      id: Date.now().toString(), // genera un id único
      titulo,
      dueAt: dueAt || new Date().toISOString(), // si no se pone fecha, se usa la de hoy
      done: false, // siempre arranca como pendiente
      prioridad,
    });
    // limpia el formulario para la próxima vez
    setTitulo("");
    setDueAt("");
    setPrioridad("media");
    setOpen(false); // cierra el modal
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Contenido de la pantalla principal */}
      <ScrollView
      
        style={{
          flexGrow: 1,
          padding: theme.layout.screenPadding,
          paddingTop: headerHeight, // deja espacio para que no tape el header
          //alignItems: "center",   // centra horizontal
          //justifyContent: "center", // centra vertical
        }}
      >
        <Text style={{ ...theme.typography.subtitle, color: theme.colors.textMuted }}>
          -- Lista de tareas --
        </Text>
        
      {listByFilter.length === 0 ? (
          // Si no hay tareas, mostramos un mensajito
          <Text style={{ ...theme.typography.body, color: theme.colors.textMuted }}>
            No hay tareas todavía.
          </Text>
        ) : (
          // Si hay tareas, usamos map para mostrarlas todas
          listByFilter.map(task => (
            <View
              key={task.id}
              style={{
                marginBottom: 12,
                padding: theme.layout.cardPadding,
                borderRadius: theme.radii.md,
                borderWidth: 1,
                borderColor: theme.colors.cardBorder,
                backgroundColor: theme.colors.cardBg,
              }}
            >
              {/* Título de la tarea */}
              <Text style={{ ...theme.typography.body, color: theme.colors.text, fontWeight: "600" }}>
                {task.titulo}
              </Text>

              {/* Línea secundaria con fecha y prioridad */}
              <Text style={{ ...theme.typography.labelSm, color: theme.colors.textMuted }}>
                Vence: {new Date(task.dueAt).toLocaleDateString()} | Prioridad: {task.prioridad}
              </Text>

              {/* Estado: completada o pendiente */}
              <Text
                style={{
                  ...theme.typography.labelSm,
                  marginTop: 4,
                  color: task.done ? theme.colors.kpiPositive : theme.colors.kpiPending,
                }}
              >
                {task.done ? "Completada" : "Pendiente"}
              </Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* Botón flotante (abajo a la derecha) que abre el modal */}
      <FAB
        onPress={() => setOpen(true)}
        style={{
          position: "absolute",
          right: 24,
          bottom: 24,
        }}
      />

      {/* Modal que aparece encima con el formulario */}
      <Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
        {/* Fondo oscuro para que se vea "modal" */}
        <Pressable
          onPress={() => setOpen(false)} // si haces tap fuera del formulario, se cierra
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            alignItems: "center",
            justifyContent: "center",
            padding: theme.layout.screenPadding,
          }} 
        >

          {/* Caja blanca del formulario */}
          <Pressable
            onPress={() => {}} // evita que el modal se cierre si presionas dentro
            style={{
              width: "100%",
              borderRadius: theme.radii.lg,
              backgroundColor: theme.colors.cardBg,
              borderWidth: 1,
              borderColor: theme.colors.cardBorder,
              padding: theme.layout.cardPadding,
            }}
          >
            <Text style={{ ...theme.typography.titleLg, color: theme.colors.text, marginBottom: 16 }}>
              Nueva tarea
            </Text>

            {/* Input de título */}
            <TextInput
              placeholder="Título de la tarea"
              value={titulo}
              onChangeText={setTitulo}
              style={{
                borderWidth: 1,
                borderColor: theme.colors.border,
                borderRadius: theme.radii.md,
                padding: 8,
                marginBottom: 12,
                color: theme.colors.text,
              }}
              placeholderTextColor={theme.colors.textMuted}
            />

            {/* Input de fecha */}
            <TextInput
              placeholder="Fecha (YYYY-MM-DD)"
              value={dueAt}
              onChangeText={setDueAt}
              style={{
                borderWidth: 1,
                borderColor: theme.colors.border,
                borderRadius: theme.radii.md,
                padding: 8,
                marginBottom: 12,
                color: theme.colors.text,
              }}
              placeholderTextColor={theme.colors.textMuted}
            />

            {/* Botoncitos de prioridad */}
            <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
              {["alta", "media", "baja"].map(p => (
                <Pressable
                  key={p}
                  onPress={() => setPrioridad(p as "alta" | "media" | "baja")}
                  style={{
                    flex: 1,
                    padding: 8,
                    borderRadius: theme.radii.md,
                    borderWidth: 1,
                    borderColor: prioridad === p ? theme.colors.primary : theme.colors.border,
                    backgroundColor: prioridad === p ? theme.colors.primary : theme.colors.surface,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: prioridad === p ? "#fff" : theme.colors.text,
                    }}
                  >
                    {p}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Botón guardar */}
            <Pressable
              onPress={handleSave}
              android_ripple={{ color: theme.colors.surfaceMuted }}
              style={{
                alignSelf: "flex-end",
                marginTop: 8,
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: theme.radii.md,
                backgroundColor: theme.colors.primary,
              }}
            >
              <Text style={{ ...theme.typography.subtitle, color: "#fff" }}>Guardar</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

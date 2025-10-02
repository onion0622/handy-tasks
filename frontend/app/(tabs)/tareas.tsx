// app/(tabs)/tareas.tsx
import React, { useState } from "react";
import { SafeAreaView,ScrollView, View, Text, Modal, Pressable, TextInput } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useAppTheme } from "../../theme";
import { FAB } from "../../components/ui/FAB";
import { Ionicons } from "@expo/vector-icons";
import { useTasks } from "../store/tasks"; // Aquí traemos el contexto (donde está addTask)
import { TaskFormModal } from "../../components/tareas/TaskFormModal"; // Formulario en modal

export default function TareasScreen() {
  const theme = useAppTheme(); // Tema global (colores, tipografía, etc.)
  const headerHeight = useHeaderHeight(); // Altura del header para que nada quede debajo
  const [open, setOpen] = useState(false); // Estado que controla si el modal (formulario) está abierto o cerrado

  // Estados del formulario
  const [titulo, setTitulo] = useState(""); // texto que escribe el usuario como título
  const [dueAt, setDueAt] = useState(""); // fecha de vencimiento
  const [prioridad, setPrioridad] = useState<"alta" | "media" | "baja">("media"); // prioridad seleccionada

  const { addTask,listByFilter,toggleDone,deleteTask } = useTasks(); // función que viene del store, agrega una tarea

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
          {/* Muestra la cantidad de tareas que hay según el filtro actual */}
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
            {/* Fila superior: botón de estado + título */}
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Pressable
                onPress={() => toggleDone(task.id)}
                accessibilityRole="button"
                accessibilityLabel={task.done ? "Marcar como pendiente" : "Marcar como completada"}
                android_ripple={{ color: theme.colors.surfaceMuted }}
                style={{ padding: 4 }}
              >
                <Ionicons
                  name={task.done ? "checkmark-circle" : "ellipse-outline"}
                  size={22}
                  color={task.done ? theme.colors.kpiPositive : theme.colors.textMuted}
                />
              </Pressable>

              <Text style={{ ...theme.typography.body, color: theme.colors.text, fontWeight: "600", flex: 1 }}>
                {task.titulo}
              </Text>

              {/* Botón eliminar */}
              <Pressable onPress={() => deleteTask(task.id)} style={{ padding: 4 }}>
                <Ionicons name="trash" size={20} color={theme.colors.kpiPending} />
              </Pressable>
              
              </View>

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

      {/* Usa el nuevo formulario modal */}
      <TaskFormModal
        visible={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) => {
          addTask(data);
          setOpen(false);
        }}
      />
    </SafeAreaView>
  );
}

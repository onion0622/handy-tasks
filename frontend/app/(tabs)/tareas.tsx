// app/(tabs)/tareas.tsx
import React, { useState } from "react";
import { SafeAreaView, View, Text, Modal, Pressable } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useAppTheme } from "../../theme";
import { FAB } from "../../components/ui/FAB";// importa el boton flotante

export default function TareasScreen() {
  const theme = useAppTheme();
  const headerHeight = useHeaderHeight(); // IMPORTANTE alto del header actual
  const [open, setOpen] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* contenido temporal */}
      <View style={{ 
        flex: 1,
        padding: theme.layout.screenPadding,  
        paddingTop: headerHeight, // IMPORTANTE para que no quede debajo del header
        alignItems: "center",   // centra horizontal
        //justifyContent: "center", // centra vertical
        }}
        >
        <Text style={{ ...theme.typography.subtitle, color: theme.colors.textMuted }}>
          -- Lista de tareas --
        </Text>
      </View>

      {/* FAB flotante */} 
      <FAB
        onPress={() => setOpen(true)}
        style={{
          position: "absolute",
          right: 24,
          bottom: 24,
        }}
      />

      {/* Modal vacío (placeholder) */}
      <Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable
          onPress={() => setOpen(false)}
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
            }}
          >
            <Text style={{ ...theme.typography.titleLg, color: theme.colors.text, marginBottom: 8 }}>
              Nueva tarea
            </Text>
            <Text style={{ ...theme.typography.body, color: theme.colors.textMuted }}>
              Aquí pondremos el formulario en el siguiente paso.
            </Text>

            <Pressable
              onPress={() => setOpen(false)}
              android_ripple={{ color: theme.colors.surfaceMuted }}
              style={{ alignSelf: "flex-end", marginTop: 16, paddingVertical: 8, paddingHorizontal: 16 }}
            >
              <Text style={{ ...theme.typography.subtitle, color: theme.colors.text }}>Cerrar</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

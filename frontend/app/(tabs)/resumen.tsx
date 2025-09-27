// app/(tabs)/resumen.tsx
import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { useAppTheme } from "../../theme"; //Todo lo que tenga theme. extrae el css de theme/indextsx
import { StatsCards } from "../../components/resumen/StatsCards";
import { ProgressBar } from "../../components/resumen/ProgressBar";
import { useHeaderHeight } from "@react-navigation/elements";
import { Filters } from "../../components/resumen/Filters";
import { TaskListPreview } from "../../components/resumen/TaskListPreview";

export default function ResumenScreen() {
  const theme = useAppTheme();
  const headerHeight = useHeaderHeight(); // IMPORTANTE alto del header actual

  return (
    //SafeAreaView es un contenedor especial de react el cual asegura que el contenido de la app no 
    //se esconda en bajo la camara o la barra superior del celuco
    <SafeAreaView style={{ flex: 1/**Ocupa toda la pantalla */, backgroundColor: theme.colors.background }}>        
      
      <ScrollView
        contentContainerStyle={{
          padding: theme.layout.screenPadding,
          gap: theme.layout.sectionGap,
          paddingTop: headerHeight, // IMPORTANTE para que no quede debajo del header
        }}
      >
        <StatsCards />
        <ProgressBar />
        <Filters />
        <TaskListPreview />
      </ScrollView>
    </SafeAreaView>
    //ScrollView permite un scroll por si se alarga la pantalla ^^
  );
}

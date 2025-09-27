//Layout no es una pantalla como tal, es un layout que envuelve todas las pantallas que estan el las carpetas
//Tipo de navegacion --> tabs
import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { TasksProvider } from "../store/tasks"; // Estos son los mocks para las pruebas

export default function TabsLayout() {
  return (
    <TasksProvider>
      <Tabs screenOptions={{ 
        headerTitleAlign: "center",
        headerTransparent: true,
        headerStyle: { 
        backgroundColor: "rgba(0, 0, 0, 0.3)" 
        },
        headerTitleStyle: { color: "#f5a7a7ff", fontWeight: "600" }, // título del header en blanco
        headerTintColor: "#fff",                                 // íconos del header en blanco
        tabBarActiveTintColor: "#f0a0a0ff",   // ← cuando el tab está activo
        tabBarInactiveTintColor: "#e9442eff", // ← cuando está inactivo
        tabBarStyle: { backgroundColor: "#111" }, // fondo de la barra
        }}>
        <Tabs.Screen
          //Aqui hace la conexion del tab con cada una de los archivos
          name="tareas"
          options={{
            title: "Tareas",
            //Configuracion del icono y si esta focused entonces se activa y añade el borde
            //Mayormente configuraciones por defecto
            tabBarIcon: ({ focused, size, color }) => (
              <Ionicons name={focused ? "add-circle" : "add-circle-outline"} size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="resumen"
          options={{
            title: "Resumen",
            tabBarIcon: ({ focused, size, color }) => (
              <Ionicons name={focused ? "stats-chart" : "stats-chart-outline"} size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="config"
          options={{
            title: "Config",
            tabBarIcon: ({ focused, size, color }) => (
              <Ionicons name={focused ? "settings" : "settings-outline"} size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </TasksProvider>
  );
}


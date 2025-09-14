import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true, // 👈 muestra el header arriba
        tabBarActiveTintColor: "blue", // color cuando está activa la tab
        tabBarInactiveTintColor: "gray", // color cuando no está activa
      }}
    >
      {/* Tab de Inicio */}
      <Tabs.Screen
        name="index"
        options={{
          title: "toDo-List",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
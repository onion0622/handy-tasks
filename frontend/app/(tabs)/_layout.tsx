import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerTitleAlign: "center" }}>
      <Tabs.Screen
        name="tareas"
        options={{
          title: "Tareas",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name={focused ? "add-circle" : "add-circle-outline"} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="resumen"
        options={{
          title: "Resumen",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name={focused ? "stats-chart" : "stats-chart-outline"} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: "Config",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name={focused ? "settings" : "settings-outline"} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

import React, { useState } from "react";
import { Button, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ToDoList() {
  const [tasks, setTasks] = useState<{ id: number; text: string; done: boolean }[]>([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;

    const newTask = {
      id: Date.now(), // número único que define la tarea
      text: input,
      done: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10, }}>Mi Todo-List</Text>

      {/* Input para agregar tareas */}
      <TextInput
        placeholder="Escribe una tarea"
        value={input}
        onChangeText={setInput}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />

      <Button title="Agregar" onPress={addTask} />

      {/* Lista de tareas */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              setTasks(
                tasks.map((t) =>
                  t.id === item.id ? { ...t, done: !t.done } : t
                )
              )
            }
          >
            <Text
              style={{
                fontSize: 18,
                textDecorationLine: item.done ? "line-through" : "none",
                marginVertical: 5,
              }}
            >
              {item.text}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

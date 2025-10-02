// app/store/tasks.ts
import React, { createContext, useContext, useMemo, useState } from "react";

// tipo para el filtro de tareas completadas, pendientes , totales
export type StatusFilter = "all" | "done" | "pending";

/** Define la tarea --> task */
export type Task = {
  id: string;
  titulo: string;
  done: boolean;
  dueAt: string; // ISO fecha 
  prioridad: "alta" | "media" | "baja";
};

export type NewTaskInput = {
  id: string;
  titulo: string;
  dueAt: string; // ISO fecha
  done?: boolean;
  prioridad: "alta" | "media" | "baja";
};

export type TaskFilter = "todos" | "hoy" | "semana";

/** Helpers de fecha */
const toISO = (d: Date) => d.toISOString();
const startOfDay = (d = new Date()) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};
const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const isToday = (iso: string) => isSameDay(new Date(iso), new Date());

const isThisWeek = (iso: string) => {
  const now = new Date();
  const day = now.getDay(); // 0=Dom
  const mondayOffset = day === 0 ? -6 : 1 - day; // Lunes como inicio
  const monday = startOfDay(addDays(now, mondayOffset));
  const sunday = addDays(startOfDay(monday), 6);
  const d = new Date(iso);
  return d >= monday && d <= addDays(sunday, 1); // inclusivo fin de día
};

/** Semillas mock para definir las tareas */
const today = startOfDay();
const mockTasks: Task[] = [
  { id: "1", titulo: "Diseñar tarjetas de KPIs", done: false, dueAt: toISO(addDays(today, -1)), prioridad: "media" },
  { id: "2", titulo: "Implementar ProgressBar", done: false, dueAt: toISO(addDays(today, 0)), prioridad: "alta" },
  { id: "3", titulo: "Crear filtros (Todos/Hoy/Semana)", done: false, dueAt: toISO(addDays(today, 1)), prioridad: "alta" },
  { id: "4", titulo: "TaskItem con badge de estado", done: false, dueAt: toISO(addDays(today, -2)), prioridad: "baja" },
  { id: "5", titulo: "Lista previa de tareas (3–5)", done: false, dueAt: toISO(addDays(today, 3)), prioridad: "media" },
  { id: "6", titulo: "Estado Empty y Loading", done: false, dueAt: toISO(addDays(today, 2)), prioridad: "media" },
  { id: "7", titulo: "Pulir dark/light theme", done: false, dueAt: toISO(addDays(today, -3)), prioridad: "baja" },
  { id: "8", titulo: "Accesibilidad básica (labels)", done: false, dueAt: toISO(addDays(today, 4)), prioridad: "baja" },
  { id: "9", titulo: "Animaciones suaves en montaje", done: true, dueAt: toISO(addDays(today, -4)), prioridad: "media" },
  { id: "10", titulo: "Ver todas → navegación", done: false, dueAt: toISO(addDays(today, 5)), prioridad: "baja" },
  { id: "11", titulo: "Refactor tokens semánticos", done: true, dueAt: toISO(addDays(today, -1)), prioridad: "alta" },
  { id: "12", titulo: "QA visual en pantallas pequeñas", done: false, dueAt: toISO(addDays(today, 6)), prioridad: "media" },
];

/** Contexto */


type TasksContextValue = {
  tasks: Task[];
  filter: TaskFilter;
  setFilter: (f: TaskFilter) => void;
  status: StatusFilter;
  setStatus: (s:StatusFilter) => void;
  // métricas
  total: number;
  completadas: number;
  pendientes: number;
  progressPercent: number; // 0..100
  // datos derivados
  listByFilter: Task[];
  addTask: (t: NewTaskInput) => void;
  toggleDone: (id: string) => void;
  deleteTask: (id: string) => void;
};

const TasksContext = createContext<TasksContextValue | null>(null);

export const TasksProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [tasks,setTasks] = useState<Task[]>(mockTasks);
  const [filter, setFilter] = useState<TaskFilter>("todos");
  const [status, setStatus] = useState<StatusFilter>("all");

  const addTask = (t: NewTaskInput) => {
  const nueva: Task = {
    id: Date.now().toString(),
    titulo: t.titulo.trim(),
    done: false,
    dueAt: t.dueAt,
    prioridad: t.prioridad,
  };
  setTasks(prev => [nueva, ...prev]);
};

const toggleDone = (id: string) => {
  setTasks(prev =>
    prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
  );
};
const deleteTask = (id: string) => {
  setTasks(prev => prev.filter(t => t.id !== id));
};



  // Parte para la barra de tareas
  const { total, completadas, pendientes, progressPercent, listByFilter } = useMemo(() => {
    const total = tasks.length;
    const completadas = tasks.filter(t => t.done).length;
    const pendientes = total - completadas;
    const progressPercent = total === 0 ? 0 : Math.round((completadas / total) * 100);
    // aplica filtro por fecha
    let listByFilter: Task[] = tasks;
    if (filter === "hoy") listByFilter = tasks.filter(t => isToday(t.dueAt));
    if (filter === "semana") listByFilter = tasks.filter(t => isThisWeek(t.dueAt));

    //aplica filtro por estado
    if (status === "done") listByFilter = listByFilter.filter(t => t.done);
    if (status === "pending") listByFilter = listByFilter.filter(t => !t.done);

    // Orden: primero pendientes por fecha más cercana, luego completadas al final
    listByFilter = [...listByFilter].sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      return +new Date(a.dueAt) - +new Date(b.dueAt);
    });

    return { total, completadas, pendientes, progressPercent, listByFilter };
  }, [tasks, filter,status]);

  const value: TasksContextValue = {
    tasks,
    filter,
    setFilter,
    status,
    setStatus,
    total,
    completadas,
    pendientes,
    progressPercent,
    listByFilter,
    addTask,
    toggleDone,
    deleteTask
  };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};

export const useTasks = () => {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks debe usarse dentro de <TasksProvider>");
  return ctx;
};

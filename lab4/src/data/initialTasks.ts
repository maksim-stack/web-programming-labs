import type { Task } from "../types/task";

export const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Реализовать компонент Layout",
    description: "Создать Header и Nav с NavLink и Outlet",
    status: "todo",
    priority: "high",
    createdAt: new Date("2026-03-20"),
  },
  {
    id: "2",
    title: "Добавить TaskCard компонент",
    description: "Отобразить название, приоритет, статус и кнопки действий",
    status: "in-progress",
    priority: "medium",
    createdAt: new Date("2026-03-19"),
  },
  {
    id: "3",
    title: "Сделать страницу TasksPage",
    description: "Вывести список задач через TaskCard",
    status: "done",
    priority: "low",
    createdAt: new Date("2026-03-18"),
  },
  {
    id: "4",
    title: "Сделать страницу TaskDetailPage",
    description: "Показать детали задачи и возможность редактирования статуса",
    status: "todo",
    priority: "medium",
    createdAt: new Date("2026-03-17"),
  },
];
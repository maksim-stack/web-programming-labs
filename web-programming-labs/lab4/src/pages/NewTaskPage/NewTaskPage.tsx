import { useState } from "react";
import { useNavigate } from "react-router";
import type { Task, TaskPriority, TaskStatus } from "../../types/task";

interface NewTaskPageProps {
  onAdd: (task: Task) => void;
}

export default function NewTaskPage({ onAdd }: NewTaskPageProps) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Назва задачі обов'язкова!");
      return;
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status: "todo" as TaskStatus,
      priority,
      createdAt: new Date(),
    };

    onAdd(newTask);
    navigate("/tasks");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <h2>➕ Нова задача</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <label>
          Назва:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введіть назву задачі"
            required
          />
        </label>

        <label>
          Опис:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Введіть опис задачі (необов'язково)"
          />
        </label>

        <label>
          Пріоритет:
          <select value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}>
            <option value="low">Низький</option>
            <option value="medium">Середній</option>
            <option value="high">Високий</option>
          </select>
        </label>

        <button type="submit">Створити задачу</button>
      </form>
    </div>
  );
}
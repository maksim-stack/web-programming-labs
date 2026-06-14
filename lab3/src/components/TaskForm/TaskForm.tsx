import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import styles from "./TaskForm.module.css";

// --- 5.1 Схема валідації Zod ---
const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Заголовок має містити щонайменше 3 символи")
    .max(100, "Заголовок не може перевищувати 100 символів"),
  description: z.string().max(500, "Опис не може перевищувати 500 символів"),
  priority: z.enum(["low", "medium", "high"], { message: "Оберіть пріоритет" }),
});

export type TaskFormData = z.infer<typeof taskSchema>;

// --- 5.2 Компонент TaskForm ---
interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
}

const TaskForm = ({ onSubmit }: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const submitHandler = (data: TaskFormData) => {
    onSubmit(data); // App додасть id, status та createdAt
    reset(); // скидаємо форму
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
      {/* TITLE */}
      <div className={styles.field}>
        <label>Заголовок</label>
        <input type="text" {...register("title")} />
        {errors.title && <span className={styles.error}>{errors.title.message}</span>}
      </div>

      {/* DESCRIPTION */}
      <div className={styles.field}>
        <label>Опис</label>
        <textarea {...register("description")} />
        {errors.description && (
          <span className={styles.error}>{errors.description.message}</span>
        )}
      </div>

      {/* PRIORITY */}
      <div className={styles.field}>
        <label>Пріоритет</label>
        <select {...register("priority")}>
          <option value="">Оберіть пріоритет</option>
          <option value="low">Низький</option>
          <option value="medium">Середній</option>
          <option value="high">Високий</option>
        </select>
        {errors.priority && <span className={styles.error}>{errors.priority.message}</span>}
      </div>

      {/* SUBMIT */}
      <button type="submit" className={styles.submit}>
        Додати задачу
      </button>
    </form>
  );
};

export default TaskForm;
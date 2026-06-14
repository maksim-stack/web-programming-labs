import { clsx } from 'clsx';
import styles from './TaskCard.module.css';

import type { Task, TaskStatus } from '../../types/task';

interface TaskCardProps {
    task: Task;
    onDelete: (id: string) => void;
    onStatusChange: (id: string, status: TaskStatus) => void;
}

const TaskCard = ({ task, onDelete, onStatusChange }: TaskCardProps) => {
    const formattedDate =  new Date(task.createdAt).toLocaleDateString("uk-UA");

    return (
        <div className={clsx(styles.card, styles[task.priority])}>

            <h3>{task.title}</h3>

            {task.description.trim() !== "" && (
                <p className={styles.description}>{task.description}</p>
            )}

            <p>
                <strong>Пріоритет:</strong> {task.priority}
            </p>

            <p>
                <strong>Статус:</strong> {task.status}
            </p>

            <p>
                <strong>Створено:</strong> {formattedDate}
            </p>

            <select value={task.status} onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
            </select>

            <button onClick={() => onDelete(task.id)}>Видалити</button>
        </div>
    );
};

export default TaskCard;
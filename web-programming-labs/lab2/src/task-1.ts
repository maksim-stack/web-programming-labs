export { };

type Status = "todo" | "in_progress" | "done" | "cancelled";
type Priority = "low" | "medium" | "high" | "critical";

interface Task {
    id: number;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    assignee: string | null;
    createdAt: Date;
    dueDate: Date | null;
}

interface HasId {
    id: number;
}

interface Project extends HasId {
    name: string;
    description: string;
    tasks: Task[];
    ownerId: number;
}

// Очікуваний тип результату:
// { total: number; byStatus: Record<Status, number>; overdue: number }
function getTaskStats(tasks: Task[]): {
    total: number;
    byStatus: Record<Status, number>;
    overdue: number;
} {
    const byStatus: Record<Status, number> = {
        todo: 0,
        in_progress: 0,
        done: 0,
        cancelled: 0,
    };

    let overdue = 0;
    const now = new Date();

    for (const task of tasks) {
        byStatus[task.status]++;

        if (task.dueDate !== null &&
            task.dueDate < now &&
            task.status !== "done" &&
            task.status !== "cancelled"
        ) {
            overdue++;
        }
    }

    return {
        total: tasks.length,
        byStatus,
        overdue,
    }
}

// Допоміжна функція для форматування задачі у строку
function formatTask(task: Task): string {
    // Форматуємо строку за шаблоном з ТЗ.
    return `[#${task.id}] ${task.title} (${task.priority}, ${task.status})`;
}

// Приклад використання
const exampleTasks: Task[] = [
    {
        id: 1,
        title: "Завершити звіт",
        description: "Потрібно завершити звіт до кінця дня",
        status: "in_progress",
        priority: "high",
        assignee: "Іван",
        createdAt: new Date(),
        dueDate: new Date("2024-06-10T17:00:00"),
    },
    {
        id: 2,
        title: "Підготувати презентацію",
        description: "Потрібно підготувати презентацію для зустрічі",
        status: "todo",
        priority: "medium",
        assignee: null,
        createdAt: new Date(),
        dueDate: null,
    },
    {
        id: 3,
        title: "Виправити помилки в коді",
        description: "Потрібно виправити помилки, знайдені в коді",
        status: "done",
        priority: "critical",
        assignee: "Марія",
        createdAt: new Date("2024-06-01T10:00:00"),
        dueDate: new Date("2024-06-01T18:00:00"),
    },
    {
        id: 4,
        title: "Організувати зустріч",
        description: "Потрібно організувати зустріч з клієнтом",
        status: "cancelled",
        priority: "high",
        assignee: "Петро",
        createdAt: new Date("2024-06-05T09:00:00"),
        dueDate: new Date("2024-06-05T12:00:00"),
    },
    {
        id: 5,
        title: "Підготувати звіт про продажі",
        description: "Потрібно підготувати звіт про продажі за минулий місяць",
        status: "in_progress",
        priority: "low",
        assignee: "Олена",
        createdAt: new Date("2024-06-03T14:00:00"),
        dueDate: new Date("2024-06-15T17:00:00"),
    },
];

console.log("=== Завдання 1: Базові типи, інтерфейси та type aliases ===");
for (const task of exampleTasks) {
    console.log(formatTask(task));
}

console.log("\n=== Статистика задач ===");
console.log(getTaskStats(exampleTasks));
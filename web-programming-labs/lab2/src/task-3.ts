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

class TaskManager {
    #tasks: Task[];
    #nextId: number = 1;

    constructor(initialTasks: Task[] = []) {
        this.#tasks = initialTasks;
        this.#nextId = initialTasks.length > 0 ? Math.max(...initialTasks.map(t => t.id)) + 1 : 1;
    }

    addTask(dto: Omit<Task, "id" | "createdAt">): Task {
        const newTask: Task = {
            ...dto,
            id: this.#nextId++,
            createdAt: new Date()
        };
        this.#tasks.push(newTask);
        return newTask;
    }

    updateTask(id: number, update: Partial<Omit<Task, "id" | "createdAt">>): Task | null { 
        const task = this.#tasks.find(t => t.id === id);
        if (!task) return null;

        const updatedTask = { ...task, ...update };
        this.#tasks = this.#tasks.map(t => t.id === id ? updatedTask : t);
        return updatedTask;        
    }

    deleteTask(id: number): boolean {
        const initialLength = this.#tasks.length;
        this.#tasks = this.#tasks.filter(t => t.id !== id);
        return this.#tasks.length < initialLength;
    }

    get tasks(): Task[] {
        return [...this.#tasks];
    }

    get count(): number {
        return this.#tasks.length;
    }

    getById(id: number): Task | undefined {
        return this.#tasks.find(t => t.id === id);
    }
}

class FilteredTaskManager extends TaskManager {
    getByStatus(status: Status): Task[] {
        return this.tasks.filter(t => t.status === status);
    }

    getByPriority(priority: Priority): Task[] {
        return this.tasks.filter(t => t.priority === priority);
    }

    getByAssignee(assignee: string): Task[] {
        return this.tasks.filter(t => t.assignee === assignee);
    }

    getOverdue(): Task[] {
        const now = new Date();
        return this.tasks.filter(t => t.dueDate && t.dueDate < now);
    }
}

console.log("=== Завдання 3: Класи та модифікатори доступу ===");

const manager = new FilteredTaskManager();

const task1 = manager.addTask({
  title: "Розробити API",
  description: "REST API для задач",
  status: "in_progress",
  priority: "high",
  assignee: "Іван",
  dueDate: new Date("2025-02-01"),
});

console.log("Додано:", task1);
console.log("Кількість задач:", manager.count);

// ... додайте ще 3-4 задачі та продемонструйте всі методи
const task2 = manager.addTask({
  title: "Написати тести",
    description: "Unit-тести для логіки", 
    status: "todo",
    priority: "medium",
    assignee: null,
    dueDate: new Date("2025-02-15"),
});

const task3 = manager.addTask({
  title: "Налаштувати БД",
    description: "Підключити PostgreSQL", 
    status: "done",
    priority: "critical",
    assignee: "Олена",
    dueDate: new Date("2025-01-20"),
});

console.log("Задачі в процесі:", manager.getByStatus("in_progress"));
console.log("Задачі з високим пріоритетом:", manager.getByPriority("high"));
console.log("Задачі, призначені Івану:", manager.getByAssignee("Іван"));
console.log("Задачі, що прострочені:", manager.getOverdue());
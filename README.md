# 🚀 Лабораторна робота №7 — CRUD API на Nest.js

## 📌 Опис проєкту

Цей проєкт — RESTful CRUD API, створений на **Nest.js**.

Дозволяє керувати списком задач із повною реалізацією операцій:
- створення (Create)
- читання (Read)
- оновлення (Update)
- видалення (Delete)

Дані зберігаються в пам’яті (масив), без використання бази даних, згідно з умовою лабораторної роботи.

---

## 🎯 Мета роботи

Реалізувати повноцінний CRUD API з використанням:

- архітектури Nest.js (Module / Controller / Service)
- Dependency Injection
- DTO (Data Transfer Objects)
- валідації через class-validator
- глобального ValidationPipe
- HTTP статус-кодів

---

## ⚙️ Використані технології

- Node.js (v18+)
- Nest.js
- TypeScript
- class-validator
- class-transformer
- REST API

---

## 📁 Структура проєкту
```
src/
├── tasks/
│ ├── dto/
│ │ ├── create-task.dto.ts
│ │ └── update-task.dto.ts
│ ├── entities/
│ │ └── task.entity.ts
│ ├── tasks.controller.ts
│ ├── tasks.service.ts
│ └── tasks.module.ts
├── app.module.ts
└── main.ts
```


---

## 📦 Модель Task

Кожна задача має поля:

```ts
id: string;
title: string;
description?: string;
status: 'todo' | 'in-progress' | 'done';
priority: 'low' | 'medium' | 'high';
createdAt: Date;
```
## 🌐 API ендпоінти
| Метод	|  URL	                | Опис	                | Статус            |
| :--   |  :--                  | :--                   |   :--             |
| GET   | /tasks                | Отримати всі задачі   | 200               |
| GET	| /tasks/:id	        | Отримати задачу по ID	| 200 / 404         |
| GET	| /tasks/search?status  | Фільтр по статусу     | 200               |
| POST	| /tasks                | Створити задачу	    | 201 / 400         |
| PATCH | /tasks/:id            | Оновити задачу        |	200 / 400 / 404 |
| DELETE|/tasks/:id             | Видалити задачу	    | 204 / 404         |

## 🔐 Валідація
* DTO з class-validator
* глобальний ValidationPipe
* `whitelist: true` — видаляє зайві поля
* `transform: true` — перетворює дані

## 📥 Запуск проєкту
```bash
npm install
npm run start:dev
```
Сервер працює на:
```
http://localhost:3000
```

## 🧪 Тестування
Можна використовувати:
* Postman
* curl
Приклад:
```bash
curl http://localhost:3000/tasks
```

## 📌 Реалізовано

- [x] CRUD API
- [x] DTO валідація
- [x] Dependency Injection
- [x] Service / Controller архітектура
- [x] HTTP статус-коди
- [x] In-memory зберігання даних

## 📚 Контрольні запитання
### 1. Яка відповідальність Service у Nest.js? Чому він не повинен містити HTTP-виключення?

*Відповідь:*

Service відповідає лише за бізнес-логіку та роботу з даними (створення, пошук, оновлення, видалення).
Він не повинен знати нічого про HTTP (статуси, запити, відповіді).

HTTP-виключення (`NotFoundException`, `BadRequestException`) належать до рівня Controller, оскільки саме контролер взаємодіє з HTTP-запитами.

---

### 2. Що таке `Dependency Injection`? Чому він кращий за new?

*Відповідь:*

`Dependency Injection (DI)` — це механізм, при якому залежності (наприклад, сервіси) передаються в клас автоматично через конструктор.

Переваги:
* не потрібно вручну створювати об’єкти через `new`
* легше тестувати (можна підміняти залежності)
* слабке зв’язування коду
* Nest сам керує життєвим циклом сервісів

---

### 3. Різниця між `CreateTaskDto` та `UpdateTaskDto`?

*Відповідь:*
* `CreateTaskDto` — використовується при створенні об’єкта, містить обов’язкові поля
* `UpdateTaskDto` — використовується при оновленні, всі поля необов’язкові

Причина:
PATCH оновлює лише частину даних, а не весь об’єкт повністю.

---

### 4. Що робить whitelist: true у ValidationPipe?

*Відповідь:*

`whitelist: true` автоматично видаляє всі поля, яких немає в DTO.

Наприклад, якщо клієнт надішле:
```json
{ "title": "Test", "isAdmin": true }
```
то поле isAdmin буде видалено.

Це захищає від:
* зайвих даних
* mass assignment атак
* зміни заборонених полів

---

### 5. Що повертає сервіс, якщо задача не знайдена? Де кидається виключення?

*Відповідь:*

Service повертає:
* `null` (для findOne / update)
* `false` (для remove)

HTTP-виключення (`NotFoundException`) кидається в Controller, оскільки він відповідає за HTTP-рівень.
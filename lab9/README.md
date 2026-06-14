# Лабораторна робота №9  
## Аутентифікація в Nest.js застосунку

---

## 📌 Опис проєкту

Цей проєкт реалізує систему аутентифікації на базі **NestJS + TypeORM + PostgreSQL + JWT**.

Реалізовано:
- реєстрацію користувачів
- логін з перевіркою пароля
- хешування паролів (bcrypt)
- видачу JWT токенів
- захищений маршрут `/auth/me`
- власний JWT Guard
- власний декоратор `@CurrentUser`

---

## ⚙️ Технології

- NestJS
- TypeORM
- PostgreSQL
- JWT (passport-jwt)
- bcrypt
- class-validator
- dotenv (ConfigModule)

---

## 📁 Структура проєкту
```
src/
├── auth/
│ ├── auth.controller.ts
│ ├── auth.service.ts
│ ├── auth.module.ts
│ ├── jwt.strategy.ts
│ ├── jwt-auth.guard.ts
│ └── current-user.decorator.ts
│
├── users/
│ ├── user.entity.ts
│ ├── users.service.ts
│ └── users.module.ts
│
├── app.module.ts
```

---
## 🔐 Ендпоінти API

### 📌 Реєстрація
`POST /auth/register`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "createdAt": "date"
}
```
---
### 📌 Логін
`POST /auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "access_token": "jwt_token"
}
```
---

### 📌 Поточний користувач

`GET /auth/me`

**Headers:**
```json
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com"
}
```
---

### 🔐 JWT структура
```json
{
  "sub": "userId",
  "email": "user@example.com",
  "iat": 123456789,
  "exp": 123456789
}
```
---

### 🧠 Основні принципи
- Паролі зберігаються тільки у вигляді hash (bcrypt)
- JWT використовується для авторизації
- Guard захищає приватні маршрути
- Strategy валідирует токен
- Custom decorator упрощает доступ к user
---

### 🚀 Запуск проекту
**1. Встановити залежності**
```bash
npm install
```

**2. Створити .env файл**
```.env
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1h
```
**3. Запустити PostgreSQL (Docker)**
```
docker-compose up -d
```
**4. Запустити сервер**
```bash
npm run start:dev
```
---

### 🧪 Тестування.

Рекомендується використовувати:

- Postman
- Bruno
- curl
---
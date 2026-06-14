# Лабораторна робота №11
## 🟦 ЧАСТИНА 1 - BACKEND (NestJS)
### 🎯 Що робить

Сервер відповідає за:

- прийом файлу
- перевірку (тип, розмір)
- збереження
- видачу файлу за URL
- зберігання метаданих

---

### 📡 API

1. POST /files

👉 завантаження файлу

**Що відбувається:**

- приймається multipart/form-data
- поле: file
- перевірка:
  - image/jpeg
  - image/png
  - image/webp
  - max 5MB
- файл зберігається з UUID ім'ям
- повертаються метадані
---
2. GET /files

👉 список усіх файлів

**Повертає:**
```json
[
  {
    "name": "uuid.jpg",
    "originalName": "cat.jpg",
    "size": 12345,
    "mimetype": "image/jpeg",
    "url": "/files/uuid.jpg"
  }
]
```
---
3. GET /files/:name

👉 віддає файл безпосередньо

---

### 🧠 Внутрішня логіка
- Multer (FileInterceptor)
- ParseFilePipe:
  - MaxFileSizeValidator
  - FileTypeValidator
- UUID для імені файлу
- storage=filesystem
---
### 🔐 Безпека
- не використовуємо originalname
- обмеження розміру
- перевірка MIME
- збереження у /uploads
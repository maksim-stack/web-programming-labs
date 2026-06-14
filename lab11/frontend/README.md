# Лабораторна робота №11
## 🟩 ЧАСТИНА 2 - FRONTEND (React)
### 🎯 Що робить

**Клієнт:**

- вибирає файл
- показує preview
- валідує файл
- завантажує на сервер
- показує прогрес
- відображає результат

---

### 🖥 UI логіка
1. Вибір файлу
- input type="file"
- accept="image/*"

---

2. Preview
- URL.createObjectURL(file)
- показує зображення
- після зміни файлу → revokeObjectURL

---

3. Валідація

**Перед відправкою:**

- тип файлу
- розмір (<5MB)

---

4. Upload

**Використовується:**

- FormData
- axios
- onUploadProgress

---

5. Progress bar

`0% → 100%`

---

6. Результат

**Після відповіді сервера:**

- показуємо зображення за URL

---

### 🌐 API шар
- POST /files → upload
- GET /files → список

---

### 🧠 Важливі технології
- FormData
- axios
- useState
- useEffect
- File API
- URL.createObjectURL
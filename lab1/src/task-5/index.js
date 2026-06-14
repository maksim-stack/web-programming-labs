import { LIBRARY_NAME, books } from './data.js';
import BookCollection, { 
    getBooksByGenre, 
    getAveragePages as avgPages,
    getOldestBook 
} from './utils.js';

console.log("=== Завдання 5: Модулі ===\n");

console.log("Бібліотека:", LIBRARY_NAME);
console.log("Всього книг:", books.length);

// Demo getBooksByGenre
console.log("\n--- Книги за жанром 'Programming' ---");
const programmingBooks = getBooksByGenre(books, "Programming");
console.log(programmingBooks);

// Demo getAveragePages
console.log("\n--- Середня кількість сторінок ---");
console.log("Average pages:", avgPages(books));

// Demo getOldestBook
console.log("\n--- Найстаріша книга ---");
const oldest = getOldestBook(books);
console.log(`"${oldest.title}" (${oldest.year})`);

// Demo BookCollection
console.log("\n--- BookCollection ---");
const collection = new BookCollection(books);
console.log("Кількість книг у колекції:", collection.count);

console.log("\nКниги, відсортовані за роком:");
const sortedBooks = collection.getSortedByYear();
sortedBooks.forEach(book => {
    console.log(`  [${book.year}] "${book.title}" - ${book.author} (${book.pages} стр.)`);
});

// Adding a new book
console.log("\n--- Додавання нової книги ---");
collection.addBook({
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    year: 2014,
    pages: 268,
    genre: "Programming"
});
console.log("Нова кількість книг:", collection.count);
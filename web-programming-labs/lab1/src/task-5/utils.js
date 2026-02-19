export const getBooksByGenre = (books, genre) => {
    return books.filter(book => book.genre === genre);
}

export const getAveragePages = (books) => {
    if (books.length === 0) return 0;
    const totalPages = books.reduce((sum, book) => sum + book.pages, 0);
    return (totalPages / books.length).toFixed(2);
}

export const getOldestBook = (books) => {
    if (books.length === 0) return null;
    return books.reduce((oldest, book) => 
        book.year < oldest.year ? book : oldest
    );
}

export default class BookCollection {
    constructor(books) {
        this.books = books;
    }
    
    getSortedByYear() {
        return [...this.books].sort((a, b) => a.year - b.year);
    }
    
    addBook(book) {
        this.books.push(book);
    }
    
    get count() {
        return this.books.length;
    }
}
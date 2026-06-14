const user1 = {
    firstName : "Олександр",
    lastName : "Ковальчук",
    middleName: "Артемович",
};

const user2 = {
    firstName : "Дарія",
    lastName : "Жукова",
};

// Task 1.1 
const getFullName = ({ firstName, lastName, middleName = '' }) => {
    const firstInitial = firstName.charAt(0) + '.';
    const middleInitial = middleName ? ' ' + middleName.charAt(0) + '.' : '';

    return `${lastName} ${firstInitial}${middleInitial}`;
}

// Task 1.2
const mergeObjects = (...objects) => {
    return objects.reduce((acc, obj) => ({ ...acc, ...obj }), {});
}

// Task 1.3
const removeDuplicates = (...arrays) => {
    return [...new Set([...arrays].flat())];
}

// Task 1.4
const createUpdateUser = (user, updates) => {
    return { ...user, ...updates, address: { ...user.address, ...updates.address } };
}

const user3 = { name: "John", age: 25, address: { city: "Kyiv", zip: "01001" } };
const updatedUser3 = createUpdateUser(user3, { age: 26, address: { zip: "01002" } });

// Printing results
console.log(" === Завдання 1: Дуструктуризація та Spread/Rest ===");
console.log(
    "1.1:",
    getFullName({
        firstName: "Петро",
        lastName: "Іванов",
        middleName: "Сергійович"
    }), ", ",
    getFullName({
        firstName: "Марія",
        lastName: "Петрова"
    }),
);
console.log(
    "1.2:",
    mergeObjects({ a: 1 }, { b: 2 }, { a: 3, c: 4 }),
);
console.log(
    "1.3:",
    removeDuplicates([1, 2, 3], [2, 3, 4], [4, 5]),
);
console.log(
    "1.4:",
    user3,
    updatedUser3,
);

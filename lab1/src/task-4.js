// Task 4.1
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Task 4.2
const simulateFetch = (url) => {
    return new Promise((resolve, reject) => {
        const randomDelay = Math.random() * (500 - 200) + 200;
        
        setTimeout(() => {
            if (!url.startsWith("https")) {
                reject(new Error(`Invalid URL: ${url}`));
            } else {
                const success = Math.random() < 0.7;
                if (success) {
                    resolve({ url, status: 200, data: "OK" });
                } else {
                    reject(new Error("Server error: 500"));
                }
            }
        }, randomDelay);
    });
}

// Task 4.3
const fetchWithRetry = async (url, attempts) => {
    let lastError;
    
    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            console.log(`Спроба ${attempt}...`);
            const result = await simulateFetch(url);
            console.log(`✓ Спроба ${attempt} успішна`);
            return result;
        } catch (error) {
            lastError = error;
            console.log(`✗ Спроба ${attempt} невдала: ${error.message}`);
            
            if (attempt < attempts) {
                await delay(500);
            }
        }
    }
    
    throw lastError;
}

// Task 4.4
const fetchMultiple = async (urls) => {
    const promises = urls.map(url => simulateFetch(url));
    const results = await Promise.allSettled(promises);
    
    const successful = [];
    const failed = [];
    
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            successful.push(result.value);
        } else {
            failed.push(result.reason.message);
        }
    });
    
    return { successful, failed };
}

// Printing results
async function main() {
    console.log("=== Завдання 4: async/await ===\n");

    // 4.1
    console.time("delay");
    await delay(1000);
    console.timeEnd("delay");

    // 4.2
    try {
        const result = await simulateFetch("https://jsonplaceholder.typicode.com/posts");
        console.log("Успіх:", result);
    } catch (error) {
        console.error("Помилка:", error.message);
    }

    // 4.3
    try {
        const result = await fetchWithRetry("https://jsonplaceholder.typicode.com/posts", 5);
        console.log("fetchWithRetry результат:", result);
    } catch (error) {
        console.error("Всі спроби невдалі:", error.message);
    }

    // 4.4
    const results = await fetchMultiple([
        "https://jsonplaceholder.typicode.com/posts",
        "http://invalid-url",
        "https://jsonplaceholder.typicode.com/users",
    ]);
    console.log("Результати:", results);
}

main();
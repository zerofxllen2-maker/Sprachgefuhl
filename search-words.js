function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

function searchWords(query) {
    let results = words.filter(word => word.includes(query));
    shuffleArray(results); // Shuffle results before returning
    return results;
}

// Assuming some existing function that populates the words list
let words = ["apple", "banana", "orange", "grape", "cherry"]; // Example words list
// Further code for handling search functionality...
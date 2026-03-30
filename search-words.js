const fs = require('fs');
const path = require('path');

// Load word data - handle both JSON and plain text formats
function loadWordData() {
  try {
    const filePath = path.join(__dirname, 'every word');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Try parsing as JSON first
    try {
      return JSON.parse(fileContent);
    } catch (jsonError) {
      // If JSON parsing fails, treat as newline-delimited words
      const words = fileContent.split('\n').filter(word => word.trim());
      const wordData = {};
      words.forEach(word => {
        wordData[word.trim()] = { word: word.trim() };
      });
      return wordData;
    }
  } catch (error) {
    console.error('Error loading word data:', error);
    return {};
  }
}

const wordData = loadWordData();

/**
 * Search words by prefix
 * @param {string} prefix - The prefix to search for
 * @returns {Object} Matching words with their data
 */
function searchByPrefix(prefix) {
  const results = {};
  for (const [word, data] of Object.entries(wordData)) {
    if (word.toLowerCase().startsWith(prefix.toLowerCase())) {
      results[word] = data;
    }
  }
  return results;
}

/**
 * Search words by suffix
 * @param {string} suffix - The suffix to search for
 * @returns {Object} Matching words with their data
 */
function searchBySuffix(suffix) {
  const results = {};
  for (const [word, data] of Object.entries(wordData)) {
    if (word.toLowerCase().endsWith(suffix.toLowerCase())) {
      results[word] = data;
    }
  }
  return results;
}

/**
 * Search words by both prefix and suffix
 * @param {string} prefix - The prefix to search for
 * @param {string} suffix - The suffix to search for
 * @returns {Object} Matching words with their data
 */
function searchByPrefixAndSuffix(prefix, suffix) {
  const results = {};
  for (const [word, data] of Object.entries(wordData)) {
    if (word.toLowerCase().startsWith(prefix.toLowerCase()) && word.toLowerCase().endsWith(suffix.toLowerCase())) {
      results[word] = data;
    }
  }
  return results;
}

/**
 * Get all words
 * @returns {Object} All words with their data
 */
function getAllWords() {
  return wordData;
}

/**
 * Search words containing a specific substring
 * @param {string} substring - The substring to search for
 * @returns {Object} Matching words with their data
 */
function searchByContains(substring) {
  const results = {};
  for (const [word, data] of Object.entries(wordData)) {
    if (word.toLowerCase().includes(substring.toLowerCase())) {
      results[word] = data;
    }
  }
  return results;
}

// Export functions
module.exports = {
  searchByPrefix,
  searchBySuffix,
  searchByPrefixAndSuffix,
  searchByContains,
  getAllWords
};

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch(command) {
    case 'prefix':
      console.log(searchByPrefix(args[1]));
      break;
    case 'suffix':
      console.log(searchBySuffix(args[1]));
      break;
    case 'both':
      console.log(searchByPrefixAndSuffix(args[1], args[2]));
      break;
    case 'contains':
      console.log(searchByContains(args[1]));
      break;
    case 'all':
      console.log(getAllWords());
      break;
    default:
      console.log('Usage:');
      console.log('  node search-words.js prefix <prefix>');
      console.log('  node search-words.js suffix <suffix>');
      console.log('  node search-words.js both <prefix> <suffix>');
      console.log('  node search-words.js contains <substring>');
      console.log('  node search-words.js all');
  }
}
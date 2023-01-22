// Typescript code

import { spellChecker } from "./spellChecker.service";

// Add training text from a file
spellChecker.trainFromFile("INPUT_Dictionary_programmingnotes_org.txt");

// Optionally, add training text from a string
//spellChecker.train();

// Correct a word and display results
console.log(spellChecker.correct("KENNtH"));

// Declare words to check spelling.
// The first word in the set is the current spelling, the second word
// is the expected corrected spell checker result
const cases = [
    ["KENNtH", "KENNetH"],
    ["Jennierr", "Jennifer"],
    ["LYnNn", "LYNn"],
    ["Soole", "Sole"],
    ["speling", "spelling"],
    ["korrectud", "corrected"],
    ["bycycle", "bicycle"],
    ["inconvient", "inconvenient"],
    ["arrainged", "arranged"],
    ["peotry", "poetry"],
    ["peotryy", "poetry"],
    ["word", "word"],
    ["quintessential", ""], // Doesn't exist in training data
    ["transportibility", "transportability"],
    ["addresable", "addressable"],
    ["auxiliaryy", "auxiliary"],
    ["WirD", "WorD"],
    ["prplee", "purple"],
    ["Succesfuil", "Successful"],
    ["AMEIRICUA", "AMERICA"],
    ["Langauege", "Language"],
    ["bicycle", "bicycle"], // Correctly spelled should return the same word
];

// Correct the words in the test cases
for (const pair of cases) {
    // Correct word
    const correction = spellChecker.correct(pair[0]);

    // Check to see if correction matches the expected result
    const casePassed = correction === pair[1];

    // Display results
    if (casePassed) {
        console.log(`Passed - Original: ${pair[0]}, Correction: ${correction}`);
    } else {
        console.log(` *** Failed - Original: ${pair[0]}, Correction: ${correction}, Expected: ${pair[1]}`);
    }
}
const readline = require('readline');
const fs = require('fs');
const chalk = require('chalk');
const pathLib = require('path');

const success = chalk.green.bold;
const info = chalk.blue
const warn = chalk.yellow.bold;
const error = chalk.red.bold;

const BibleBooks = [
    // Old Testament
    'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua',
    'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings',
    '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Tobit', 'Judith',
    'Esther', '1 Maccabees', '2 Maccabees', 'Job', 'Psalms', 'Proverbs',
    'Ecclesiastes', 'Song of Solomon', 'Wisdom', 'Sirach', 'Isaiah', 'Jeremiah',
    'Lamentations', 'Baruch', 'Ezekiel', 'Daniel', 'Hosea', 'Joel',
    'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
    'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',

    // New Testament
    'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans',
    '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians',
    '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon',
    'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John',
    '3 John', 'Jude', 'Revelation',
];

console.log(warn('[WARNING] Make sure you enter the correct directory path. If you don\'t, the script will not work as expected and may parse unexpected files.'));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function normalizeSpaces(content) {
    // Replace multiple spaces with a single space
    return content.replace(/ {2,}/g, ' ');
}

function ensureDirSync(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function toXmlChapter(book, chapter, translationName, translationId, language, languageID, verses) {
    return `<chapter book="${book}" number="${chapter}" translation="${translationName}" translationID="${translationId}" language="${language}" languageID="${languageID}">\n` +
        verses.map((v, i) => `  <verse number="${i+1}">${v}</verse>`).join('\n') +
        `\n</chapter>`;
}

function toHtmlChapter(book, chapter, translationName, translationId, language, languageID, verses) {
    return `<div class="chapter" data-book="${book}" data-chapter="${chapter}" data-translation="${translationName}" data-translation-id="${translationId}" data-language="${language}" data-language-id="${languageID}">\n` +
        verses.map((v, i) => `<p class="verse" data-verse="${i+1}">${v}</p>`).join('\n') +
        `\n</div>`;
}

function askQuestions(questions, callback) {
    const answers = [];
    function ask(i) {
        if (i < questions.length) {
            rl.question(questions[i], answer => {
                answers.push(answer);
                ask(i + 1);
            });
        } else {
            callback(answers);
        }
    }
    ask(0);
}

askQuestions([
    'Directory to parse (./bible/plain): ',
    'Language: ',
    'Language ID: '
], ([directory, language, languageID]) => {
    const path = directory || './bible/plain';

    function parseFile(filePath) {
        const log = console.log;
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const lines = content.split(/\r?\n/);
            if (lines.length < 2) {
                log(error(`File too short: ${filePath}`));
                return;
            }
            const translationId = lines[0].trim().toLowerCase();
            const translationName = lines[1].trim();
            const body = normalizeSpaces(lines.slice(2).join('\n'));

            // Split into books and chapters
            let currentBook = null, currentChapter = null, chapterLines = [];
            let bookChapters = {}; // { book: { chapter: [lines] } }

            const bookRegex = new RegExp(`^(${BibleBooks.join('|')})\\s+(\\d+):`, 'i');
            const chapterVerseRegex = /^(\d+):(\d+)\s+(.*)$/;

            body.split('\n').forEach(line => {
                let bookMatch = bookRegex.exec(line);
                if (bookMatch) {
                    currentBook = bookMatch[1];
                    currentChapter = bookMatch[2];
                    if (!bookChapters[currentBook]) bookChapters[currentBook] = {};
                    if (!bookChapters[currentBook][currentChapter]) bookChapters[currentBook][currentChapter] = [];
                    chapterLines = bookChapters[currentBook][currentChapter];
                    // Remove book/chapter prefix from line, keep the rest
                    let rest = line.replace(bookRegex, '').trim();
                    if (rest) chapterLines.push(rest);
                    return;
                }
                let chapVerseMatch = chapterVerseRegex.exec(line);
                if (chapVerseMatch && currentBook) {
                    // Only update currentChapter if changed
                    if (currentChapter !== chapVerseMatch[1]) {
                        currentChapter = chapVerseMatch[1];
                        if (!bookChapters[currentBook][currentChapter]) bookChapters[currentBook][currentChapter] = [];
                        chapterLines = bookChapters[currentBook][currentChapter];
                    }
                    // Always push the verse text to the current chapter
                    chapterLines.push(`${chapVerseMatch[2]} ${chapVerseMatch[3]}`.trim());
                    return;
                }
                if (currentBook && currentChapter) {
                    chapterLines.push(line.trim());
                }
            });

            // Write out files for each format
            const formats = ['txt', 'json', 'xml', 'html'];
            for (const format of formats) {
                console.log(info(`Processing ${format} format for ${translationName} (${translationId})...`));
                // Only one file per chapter per format
                for (const book in bookChapters) {
                    console.log(info(`Processing book: ${book} (${translationName})`));
                    for (const chapter in bookChapters[book]) {
                        // For TXT, keep verse numbers; for others, remove leading verse number
                        let verses = bookChapters[book][chapter].filter(Boolean);
                        let versesForOtherFormats = verses.map(line => {
                            // Remove leading verse number and optional dot/colon/space
                            return line.replace(/^(\d+)[.:]?\s*/, '');
                        });

                        // Convert book name to lowercase for the directory path
                        const baseDir = `./bible/${format}/${translationId}/${book.toLowerCase()}`;
                        ensureDirSync(baseDir);

                        if (format === 'txt') {
                            const outPath = `${baseDir}/${chapter}.txt`;
                            fs.writeFileSync(outPath, verses.join('\n'), 'utf8');
                        } else if (format === 'json') {
                            const data = {};
                            versesForOtherFormats.forEach((verseText, idx) => {
                                data[(idx + 1).toString()] = { text: verseText };
                            });
                            const jsonObj = {
                                info: {
                                    book,
                                    chapter,
                                    translation: translationName,
                                    translationID: translationId,
                                    language,
                                    languageID
                                },
                                data
                            };
                            const outPath = `${baseDir}/${chapter}.json`;
                            fs.writeFileSync(outPath, JSON.stringify(jsonObj, null, 4), 'utf8');
                        } else if (format === 'xml') {
                            const outPath = `${baseDir}/${chapter}.xml`;
                            const outContent = toXmlChapter(book, chapter, translationName, translationId, language, languageID, versesForOtherFormats);
                            fs.writeFileSync(outPath, outContent, 'utf8');
                        } else if (format === 'html') {
                            const outPath = `${baseDir}/${chapter}.html`;
                            const outContent = toHtmlChapter(book, chapter, translationName, translationId, language, languageID, versesForOtherFormats);
                            fs.writeFileSync(outPath, outContent, 'utf8');
                        }
                    }
                }
            }
            log(success(`Processed: ${filePath}`));
        } catch (err) {
            log(error(`Failed to process file: ${filePath}`), error(err));
        }
    }

    async function parseDirectoryTXT(directory) {
        const entries = fs.readdirSync(directory, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = `${directory}/${entry.name}`;
            if (entry.isDirectory()) {
                await parseDirectoryTXT(fullPath);
            } else if (entry.isFile()) {
                parseFile(fullPath);
            }
        }
    }

    if (fs.existsSync(path)) {
        console.log('Directory exists');
        parseDirectoryTXT(path);
    }
    else {
        console.log(error(`Directory does not exist: ${path}`));
        rl.close();
    }
    rl.close();
});
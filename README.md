<div align="center">
    <img width="800" height="400" src="assets/Banner.png" alt="Biblia.db">

![Discord Community](https://img.shields.io/github/last-commit/mrfab7/biblia.db?style=for-the-badge&logo=github&logoColor=%23ffffff&label=Last%20Commit&labelColor=%2323272A%20)
![Static Badge](https://img.shields.io/badge/-Join%20the%20Discord!-Blue?style=for-the-badge&logo=discord&logoColor=%23ffffff&labelColor=%235865F2&color=%2323272A%20&link=https%3A%2F%2Fdiscord.gg%2F9zzGTZtzcC)
</div>

Welcome to Biblia's official Bible database! Our goal is to provide many different translations of the Bible, curated to developers.
Everything here is free to use for commercial and non-commercial purposes.

<details>
<summary>English translations</summary>
    
- Anglicised King James Version (akjv)
- American Standard Version (asv)
- Berean Standard Bible (bsb)
- Catholic Public Domain Version (cpdv)
- Darby Bible Translation (dbt)
- Doray-Rheims Bible (drb)
- English Revised Version (erv)
- King James Version (kjv)
- Smith's Literal Translation (slt)
- Webster Bible Translation (wbt)
- World English Bible (web)
- Young's Literal Translation (ylt)
</details>


## To-do
- [ ] Highlight Jesus' words in either red (HTML) or **bold** (JSON, XML)
- [ ] Spanish translations
- [ ] Portuguese translations
- [ ] French translations
- [ ] German translations
- [ ] Polish translations
- [ ] [ language ] translations
- [ ] Discord community
- [ ] Get a good format that's consistent and detailed
- [ ] Add topics and allow people to contribute via. the discord server.
- [ ] Create an API

## Usage
<details>
<summary>JSON usage</summary>
    
JSON files are structured with 2 main keys; `info` and `data`. Inside `data` you can find all of the verses, alongside a "topic" (basically a header). Inside `info`, you'll find the Chapter, book, translation name and language!

> Topic is a work-in-progress. Soon, you'll be able to suggest topics for the database.

```json
{
  "info": {
    "book": "bookName",
    "chapter": "1",
    "translation": "Catholic Public Domain Version",
    "translationID": "cpdv",
    "language": "English",
    "languageID": "en"
  },
    "data": {
        "1": {
            "text": "Verse text",
            "topic": "Topic 1"
        },
        "2": {
            "text": "Verse text",
            "topic": "Topic 1"
        },
        "3": {
            "text": "Verse text",
            "topic": "Topic 2"
        }
    }
}
```
</details>

<details>
<summary>XML usage</summary>

XML files are structured with 1 key, chapter. Chapter contains all of your info like book, chapter, translation and language.
Inside of chapter are all the verses of that chapter, with verse number and topic.

> Topic is a work-in-progress. Soon, you'll be able to suggest topics for the database.

```xml
<chapter book="bookName" number="1" translation="Catholic Public Domain Version" translationID="cpdv" language="English" languageID="en">
    <verse number="1" topic="Topic 1">Verse text</verse>
    <verse number="2" topic="Topic 1">Verse text</verse>
    <verse number="3" topic="Topic 2">Verse text</verse>
    <verse number="4" topic="Topic 2">Verse text</verse>
    <verse number="5" topic="Topic 2">Verse text</verse>
</chapter>
```
</details>

</details>

<details>
<summary>HTML usage</summary>

> ⚠️ Soon, HTML's structure will change completely to incorporate topics and highlighted words.

HTML files are structured with 1 div. The div contains all of your info like book, chapter, translation and language.
Inside of the div are all the verses of that chapter (as paragraphs), with verse number and topic.

All verses have the class 'verse' and the main div has class 'chapter'.

```html
<div class="chapter" data-book="bookName" data-chapter="1" data-translation="Catholic Public Domain Version" data-translation-id="cpdv" data-language="English" data-language-id="en">
    <p class="verse" data-verse="1">Verse text</p>
    <p class="verse" data-verse="2">Verse text</p>
    <p class="verse" data-verse="3">Verse text</p>
    <p class="verse" data-verse="4">Verse text</p>
    <p class="verse" data-verse="5">Verse text</p>
</div>
```
</details>

<details>
<summary>TXT usage</summary>

It is not recommended to use txt files, as they are less useful while developing. Just use the other formats.
```
1 Verse text
2 Verse text
3 Verse text
4 Verse text
5 Verse text
```
</details>


    
    
</details>

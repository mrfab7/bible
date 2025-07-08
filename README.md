# Bible
![GitHub commit activity](https://img.shields.io/github/commit-activity/t/mrfab7/bible?logo=github&label=Commits) ![GitHub contributors](https://img.shields.io/github/contributors-anon/mrfab7/bible?logo=github&label=Contributors) ![GitHub License](https://img.shields.io/github/license/mrfab7/bible?label=License)

Welcome to the Bible repository! This project provides a comprehensive collection of Bible data in various easy-to-use formats, suitable for developers, researchers, and anyone looking to integrate biblical texts into their applications or studies.

## Usage
To begin, simply clone the repository using this command:
```bash
git clone --filter=blob:none --no-checkout https://github.com/mrfab7/bible.git
cd bible
git sparse-checkout set --cone
git checkout main
git sparse-checkout set bible/json
```
> [!TIP]
> You can replace 'json' with 'txt', 'xml', or 'html' to access other formats.

All formats have the same amount of data in them, except for .txt, which misses out on all of the extra info (it'll have it eventually, I'm just kind of lazy)

In other formats, you'll find an info section containing the book, chapter, translation, translation_id (think about it like an abbreviation of translation), language and language_id (abbreviation of language)

**1. JSON Structure**
```json
{
    "info": {
        "book": "John",
        "chapter": "1",
        "translation": "Catholic Public Domain Version",
        "translationID": "cpdv",
        "language": "English",
        "languageID": "en"
    },
    "data": {
        "1": {
            "text": "In the beginning was the Word, and the Word was with God, and God was the Word."
        },
        "2": {
            "text": "He was with God in the beginning."
        },
        "3": {
            "text": "All things were made through Him, and nothing that was made was made without Him."
        },
        "4": {
            "text": "Life was in Him, and Life was the light of men."
        },
        "5": {
            "text": "And the light shines in the darkness, and the darkness did not comprehend it."
        }
}
```

**2. XML Structure**
```xml
<chapter book="2 Timothy" number="1" translation="Catholic Public Domain Version" translationID="cpdv" language="English" languageID="en">
  <verse number="1">Paul, an Apostle of Jesus Christ through the will of God, in accord with the promise of the life which is in Christ Jesus,</verse>
  <verse number="2">to Timothy, most beloved son. Grace, mercy, peace, from God the Father and from Christ Jesus our Lord.</verse>
  <verse number="3">I give thanks to God, whom I serve, as my forefathers did, with a pure conscience. For without ceasing I hold the remembrance of you in my prayers, night and day,</verse>
  <verse number="4">desiring to see you, recalling your tears so as to be filled with joy,</verse>
  <verse number="5">calling to mind the same faith, which is in you unfeigned, which also first dwelt in your grandmother, Lois, and in your mother, Eunice, and also, I am certain, in you.</verse>
</chapter>
```

**3. HTML Structure**
```html
<div class="chapter" data-book="Acts" data-chapter="1" data-translation="Catholic Public Domain Version" data-translation-id="cpdv" data-language="English" data-language-id="en">
<p class="verse" data-verse="1">Certainly, O Theophilus, I composed the first discourse about everything that Jesus began to do and to teach,</p>
<p class="verse" data-verse="2">instructing the Apostles, whom he had chosen through the Holy Spirit, even until the day on which he was taken up.</p>
<p class="verse" data-verse="3">He also presented himself alive to them, after his Passion, appearing to them throughout forty days and speaking about the kingdom of God with many elucidations.</p>
<p class="verse" data-verse="4">And dining with them, he instructed them that they should not depart from Jerusalem, but that they should wait for the Promise of the Father, “about which you have heard,” he said, “from my own mouth.</p>
<p class="verse" data-verse="5">For John, indeed, baptized with water, but you shall be baptized with the Holy Spirit, not many days from now.”</p>
</div>
```

**4. TXT Structure**
```
1	My son, pay attention to my wisdom, and incline your ear to my prudence,
2	so that you may guard your thinking, and so that your lips may preserve discipline. Do not pay attention to the deceit of a woman.
3	For the lips of a loose woman are like a dripping honeycomb, and her voice is smoother than oil.
4	But in the end, she is as bitter as wormwood, and as sharp as a two-edged sword.
5	Her feet descend into death, and her steps reach even to Hell.
```


const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto')

const { Document } = require('flexsearch');

const indexOptions = {
    charset: "cyrillic",
    tokenize: "forward",
    document: {
        id: "uid",
        index: ["title", "content"]
    }
}
const index = new Document(indexOptions);

const diaryFilePath = process.env.NODE_ENV === 'test'
    ? path.join(__dirname, './test_data/diary.json')
    : path.join(__dirname, './data/diary.json');

function loadEntries() {
    if (!fs.existsSync(diaryFilePath)) {
        fs.writeFileSync(diaryFilePath, JSON.stringify({}));
    }
    const data = fs.readFileSync(diaryFilePath, 'utf8');
    return JSON.parse(data);
}

function saveEntry(uid, entry) {
    const entries = loadEntries();
    entries[uid] = entry;
    if (index.contain(uid)) {
        index.update(uid, entry);
    } else {
        index.add(uid, entry);
    }
    fs.writeFileSync(diaryFilePath, JSON.stringify(entries, null, 2));
}

function deleteEntry(uid) {
    const entries = loadEntries();
    delete entries[uid];
    index.remove(uid);
    fs.writeFileSync(diaryFilePath, JSON.stringify(entries, null, 2));
}

function buildIndex(entries) {
    for (let uid in entries) {
        if (index.contain(uid)) {
            break;
        }
        index.add(entries[uid]);
    }
}

function search(pattern) {
    let searchObj = index.search(pattern);
    let uidsSet = new Set();
    for (let i in searchObj) {
        let result = searchObj[i].result;
        for (let j in result) {
            uidsSet.add(result[j]);
        }
    }

    return uidsSet;
}

contextBridge.exposeInMainWorld('diaryAPI', {
    loadEntries: () => loadEntries(),
    saveEntry: (uid, entry) => saveEntry(uid, entry),
    buildIndex: (entries) => buildIndex(entries),
    search: (pattern) => search(pattern),
    uuid: () => crypto.randomUUID(),
    deleteEntry: (uid) => deleteEntry(uid),
});

if (process.env.NODE_ENV === 'test' && typeof module !== 'undefined') {
    module.exports = {loadEntries, saveEntry, buildIndex, search, deleteEntry};
}

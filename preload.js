const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

const diaryFilePath = path.join(__dirname, 'diary.json');

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
    fs.writeFileSync(diaryFilePath, JSON.stringify(entries, null, 2));
}

contextBridge.exposeInMainWorld('diaryAPI', {
    loadEntries: () => loadEntries(),
    saveEntry: (uid, entry) => saveEntry(uid, entry),
});

const search =  window.location.search;
const uid = search.split('=')[1];

let entries = window.diaryAPI.loadEntries();
let currentEntry = entries[uid];

let dateElement = document.getElementsByClassName('date')[0];
dateElement.innerText = currentEntry.date;

// entryTitleEditor and entryBodyEditor are from editor.js
entryTitleEditor.setText(currentEntry.title);
entryBodyEditor.setText(currentEntry.content);

let searchEntriesLink = document.getElementById("search-entries");
let newEntryLink = document.getElementById("new-entry");

searchEntriesLink.addEventListener("click", updateEntry);
newEntryLink.addEventListener("click", updateEntry);

let saveEntryButton = document.getElementsByClassName("save-button")[0];
saveEntryButton.addEventListener("click", updateEntry);

function updateEntry(event) {
    // save current entry to file / sqlite
    let title = entryTitleEditor.getText(0);
    let content = entryBodyEditor.getText(0);

    const entry = {
            uid: currentEntry.uid,
            title: title,
            date: currentEntry.date,
            content: content
        };

    window.diaryAPI.saveEntry(currentEntry.uid, entry);

    showContentSavedState();
}

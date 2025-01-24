const search =  window.location.search;
const uid = search.split('=')[1];

let entries = window.diaryAPI.loadEntries();
let currentEntry = entries[uid];

let dateElement = document.getElementsByClassName('date')[0];
dateElement.innerText = currentEntry.date;

let leftTickOfSaveIcon = document.getElementsByClassName("left-tick")[0];

const entryTitleEditor = new Quill('#entry-title', {
    theme: 'bubble',
    placeholder: 'Entry title'
});

entryTitleEditor.setText(currentEntry.title);

function updateTitle(delta, oldDelta, source) {
    if (source === 'api') {
        return;
    }

    leftTickOfSaveIcon.style.fill = "#D3CFCF"; // gray
}

entryTitleEditor.on('text-change', updateTitle);

let entryBodyEditor = new Quill('#page-0', {
    theme: 'bubble',
    placeholder: 'Entry body'
});

entryBodyEditor.setText(currentEntry.content);

function updatePage(delta, oldDelta, source) {
    if (source === 'api') {
        return;
    }

    leftTickOfSaveIcon.style.fill = "#D3CFCF"; // gray
}

entryBodyEditor.on('text-change', updatePage);

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

    leftTickOfSaveIcon.style.fill = "#E07A5F"; // terracotta
}

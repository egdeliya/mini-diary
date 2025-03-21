dateElement = document.getElementsByClassName('date')[0];
let today = new Date();
let opts = {day: "numeric", month: "long", year: "numeric"};
const date = today.toLocaleString("en-EN", opts);
dateElement.innerText = date;

const entryUid = window.diaryAPI.uuid();

let saveEntryButton = document.getElementsByClassName("save-button")[0];
saveEntryButton.addEventListener("click", saveEntry);

let searchEntriesLink = document.getElementById("search-entries");
searchEntriesLink.addEventListener("click", saveEntry);

function saveEntry() {
    // save current entry to file
    // entryTitleEditor and entryBodyEditor are from editor.js
    let title = entryTitleEditor.getText(0);
    let content = entryBodyEditor.getText(0);
    if (title.trim() === "" && content.trim() === "") {
        return;
    }

    const entry = {
        uid: entryUid,
        title: title,
        date: date,
        content: content
    };


    window.diaryAPI.saveEntry(entryUid, entry);

    showContentSavedState();
}

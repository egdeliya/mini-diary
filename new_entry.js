dateElement = document.getElementsByClassName('date')[0];
let today = new Date();
let opts = {day: "numeric", month: "long", year: "numeric"};
const date = today.toLocaleString("ru-RU", opts);
dateElement.innerText = date;

let leftTickOfSaveIcon = document.getElementsByClassName("left-tick")[0];

const entryTitleEditor = new Quill('#entry-title', {
    theme: 'bubble',
    placeholder: 'Entry title'
});

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

function updatePage(delta, oldDelta, source) {
    if (source === 'api') {
        return;
    }

    leftTickOfSaveIcon.style.fill = "#D3CFCF"; // gray
}

entryBodyEditor.on('text-change', updatePage);


const entryUid = uuidv4();

let saveEntryButton = document.getElementsByClassName("save-button")[0];
saveEntryButton.addEventListener("click", saveEntry);

let searchEntriesLink = document.getElementById("search-entries");
searchEntriesLink.addEventListener("click", saveEntry);

function saveEntry() {
    // save current entry to file
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

    leftTickOfSaveIcon.style.fill = "#E07A5F"; // terracotta
}

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}

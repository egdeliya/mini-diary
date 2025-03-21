dateElement = document.getElementsByClassName('date')[0];
let today = new Date();
let opts = {day: "numeric", month: "long", year: "numeric"};
const date = today.toLocaleString("ru-RU", opts);
dateElement.innerText = date;

let localStorage = window.localStorage;

const entryTitleEditor = new Quill('#entry-title', {
    theme: 'bubble',
    placeholder: 'Entry title'
});

function updateTitle(delta, oldDelta, source) {
    if (source === 'api') {
        return;
    }

    localStorage.setItem(`current-entry-title`, entryTitleEditor.getText());
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

    localStorage.setItem(`current-entry`, entryBodyEditor.getText());
}

entryBodyEditor.on('text-change', updatePage);

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}

searchEntriesLink = document.getElementById("search-entries");
searchEntriesLink.addEventListener("click", (e) => {
    // save current entry to file / sqlite
    let title = entryTitleEditor.getText(0);
    let content = entryBodyEditor.getText(0);
    if (title.trim() === "" && content.trim() === "") {
        return;
    }

    let uid = uuidv4();

    const entry = {
        uid: uid,
        title: title,
        date: date,
        content: content
    };


    window.diaryAPI.saveEntry(uid, entry);
});

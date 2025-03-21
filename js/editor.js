let leftTickOfSaveIcon = document.getElementsByClassName("left-tick")[0];

function showContentUpdatedState() {
    leftTickOfSaveIcon.style.fill = "#D3CFCF"; // gray
}

function showContentSavedState() {
    leftTickOfSaveIcon.style.fill = "#E07A5F"; // terracotta
}

const entryTitleEditor = new Quill('#entry-title', {
    theme: 'bubble',
    placeholder: 'Entry title'
});

function updateTitle(delta, oldDelta, source) {
    if (source === 'api') {
        return;
    }

    showContentUpdatedState();
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

    showContentUpdatedState();
}

entryBodyEditor.on('text-change', updatePage);
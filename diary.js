const pageContainer = document.querySelector('.page-container');

const entryTitleEditor = new Quill('#entry-title', {theme: 'bubble', placeholder: 'Entry title'});

let pageEditor = new Quill('#page-0', {
    theme: 'bubble'
});

let currentPage = document.querySelector('.page-0');

let localStorage = window.localStorage;

// Quill event handler on 'text-change'
function addNewPage(delta, oldDelta, source) {
    localStorage.setItem(`${currentPageId-1}`, pageEditors[currentPageId-1].getText());


}

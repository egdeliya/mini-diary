const pageContainer = document.querySelector('.page-container');

// TODO думала, что js файл будет отрабатывать 1 раз при загрузке всех html страниц, но это не так.
// в итоге для search_all не находится элемент с id entry-title
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

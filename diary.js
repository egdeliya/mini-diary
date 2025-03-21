const pageContainer = document.querySelector('.page-container');

const entryTitleEditor = new Quill('#entry-title', {theme: 'bubble', placeholder: 'Entry title'});

let pageEditors = [];
let currentPageEditor = new Quill('#page-0', {
    theme: 'bubble'
});
pageEditors.push(currentPageEditor);

let currentPageId = 0;

let currentPage = document.querySelector('.page-0');
let initialHeight = currentPage.offsetHeight;

currentPageEditor.on('text-change', addNewPage);

// Quill event handler on 'text-change'
function addNewPage(delta, oldDelta, source) {
    if (currentPage.offsetHeight <= initialHeight) {
        return;
    }

    console.log("-------------> here we have an overflow! so there is a need to create a new page")
    console.log("current change ---> ", delta);

    pageEditors[currentPageId].disable();

    currentPageId++;

    let blankPage = createBlankPage(currentPageId);
    pageContainer.appendChild(blankPage);

    // TODO use editor.addContainer after moving to the first blank page
    const blankPageEditor = new Quill(`#page-${currentPageId}`, {
        theme: 'bubble'
    });
    pageEditors.push(blankPageEditor);

    // TODO think of a more clever way to detect overflow
    let overflowStopper = document.createElement('div');
    overflowStopper.classList.add('overflow-stopper');
    overflowStopper.tabIndex = -1;
    // overflowStopper.hidden = true;

    blankPage.appendChild(overflowStopper);
    blankPageEditor.focus();

    currentPage = document.querySelector(`#page-${currentPageId}`);
    initialHeight = currentPage.offsetHeight;

    currentPageEditor = pageEditors[currentPageId];
    currentPageEditor.on('text-change', addNewPage)
}

function createBlankPage(pageId) {
    let newPage = document.createElement('div');
    newPage.classList.add('blank-page');

    newPage.id = `page-${pageId}`;

    // TODO move overflowing text to the next page
    // newPage.textContent = text;

    return newPage;
}

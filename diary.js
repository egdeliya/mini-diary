const entryBody = document.querySelector('.entry-body');
const pageContainer = document.querySelector('.page-container');

const entryTitleEditor = new Quill('#entry-title', {
    theme: 'bubble',
    placeholder: 'Entry title',

});
const entryBodyEditor = new Quill('#entry-body', {
    theme: 'bubble'
});

let prevHeight = entryBody.offsetHeight;

entryBodyEditor.on('text-change', (delta, oldDelta, source) => {
    if (source == 'api') {
        console.log('An API call triggered this change.');
    } else if (source == 'user') {
        console.log('A user action triggered this change.');
    }
    console.log("old change ---> ", oldDelta);

    // TODO maybe detect overflow with y-coordinates
    if (entryBody.offsetHeight <= prevHeight) {
        return;
    }

    console.log("-------------> here we have an overflow!")
    console.log("current change ---> ", delta);

    entryBodyEditor.disable();

    newPage = createNewPage();
    pageContainer.appendChild(newPage);

    let newPageId = `#new-page-${currentPageId}`
    // TODO create an array of page editors
    const newPageEditor = new Quill(newPageId, {
        theme: 'bubble'
    });

    let overflowStopper = document.createElement('div');
    overflowStopper.classList.add('overflow-stopper');
    overflowStopper.tabIndex = -1;
    // overflowStopper.hidden = true;

    newPage.appendChild(overflowStopper);
});

let currentPageId = 0;

function createNewPage() {
    let newPage = document.createElement('div');
    newPage.classList.add('new-page');

    currentPageId++;
    newPage.id = `new-page-${currentPageId}`;

    // TODO move overflowing text to the next page
    // newPage.textContent = text;

    return newPage;
}

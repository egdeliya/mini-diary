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

    if (entryBody.offsetHeight <= prevHeight) {
        return;
    }

    console.log("-------------> here we have an overflow!")
    console.log("current change ---> ", delta);

    newPage = createNewPage()
    pageContainer.appendChild(newPage);
});

function createNewPage() {
    let newPage = document.createElement('div');
    newPage.classList.add('new-page');
    // newPage.textContent = text;
    return newPage;
}

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

// calculating current height and width of content
let style = window.getComputedStyle(currentPage, null);
// in px
let fontSize = parseFloat(style.fontSize);
const fontSizeRem = 1.2;
let lineHeight = Math.floor(parseFloat(style.lineHeight) * fontSizeRem);

let lineWidth = currentPage.clientWidth;
let charsPerLine = Math.ceil(lineWidth / fontSize);

// из предположений, что font=Nunito, font-size=1.5rem, lineWidth=736px
const averageCharsPerLine = 73;
const averageCharWidth = Math.ceil(lineWidth / averageCharsPerLine);

console.log("--------> fontSize ", fontSize)
console.log("--------> lineHeight ", lineHeight)
console.log("--------> lineWidth ", lineWidth)
console.log("--------> charsPerLine ", charsPerLine)
console.log("--------> averageCharWidth ", averageCharWidth)

// Quill event handler on 'text-change'
function addNewPage(delta, oldDelta, source) {
    console.log("---------------------------------------")
    console.log("current delta ---> ", delta);
    console.log("old delta ---> ", oldDelta);
    console.log("delta retain ------> ", delta.ops[0].retain)

    if (delta.ops.length < 2 || !delta.ops[1].hasOwnProperty("insert")) {
        console.log("there wasn't an insert (nothing to move to the next page)")
        return;
    }

    let retainChars = delta.ops[0].retain;

    // В общем можно вычислять размер методом getBounds, в поле bottom будет высота контента
    console.log("quil.getBounds ------> ", pageEditors[currentPageId].getBounds(retainChars));
    console.log("-------------> initialHeight ", initialHeight)

    if (!delta.ops[1].hasOwnProperty("insert")) {
        console.log("there wasn't an insert (nothing to move to the next page)")
        return;

    }
    let height = pageEditors[currentPageId].getBounds(retainChars).height;
    let bottom = pageEditors[currentPageId].getBounds(retainChars).bottom;
    let deltaHeight = 0;
    if (delta.ops[1].insert === '\n') {
        deltaHeight = height;

    }

    // check if this is the end of the page
    // - если перенести курсор на строку ниже \n, то  getBounds.bottom вернет значение с опозданием, не прибавится
    // высота строки. deltaHeight это фиксит
    // - даже если удалить последний символ из quill, dev page все равно вставит его, подумает, что произошла прокрутка и
    // добавит scroll. поэтому оставляем еще одну высоту строки height для предотвращения появления скроллера
    if (bottom + deltaHeight <= initialHeight - height) {
        return;

    }
    console.log("-------------> here we have an overflow! so there is a need to create a new page")
    console.log("-------------> deltaHeight ", deltaHeight)


    let lastInsert = delta.ops[1].insert;
    console.log("----------> delta.ops[1].insert ", delta.ops[1].insert)

    pageEditors[currentPageId].disable();
    // нужно сделать так, чтобы при добавлении символа не появилась прокрутка из-за overflow, удалить дельту из эдитора
    pageEditors[currentPageId].deleteText(retainChars, 1);

    currentPageId++;

    let blankPage = createBlankPage(currentPageId);
    pageContainer.appendChild(blankPage);

    let text = "";
    if (!isWhitespace(lastInsert)) {
        let oldContent = oldDelta.ops[0].insert;
        // перенести последнее слово на новую страницу
        text = oldContent.slice(
            // quill всегда добавляет \n в конце строки, поэтому нужно взять slice до oldContent.length - 1
            oldContent.lastIndexOf(' ') + 1, oldContent.length - 1
        );
        text += lastInsert;
    }
    blankPage.innerText = text;

    // TODO use editor.addContainer after moving to the first blank page
    const blankPageEditor = new Quill(`#page-${currentPageId}`, {
        theme: 'bubble'
    });
    pageEditors.push(blankPageEditor);

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

    return newPage;
}

function isWhitespace(c) {
    return c === ' '
        || c === '\n'
        || c === '\t'
        || c === '\r'
        || c === '\f'
        || c === '\v'
        || c === '\u00a0'
        || c === '\u1680'
        || c === '\u2000'
        || c === '\u200a'
        || c === '\u2028'
        || c === '\u2029'
        || c === '\u202f'
        || c === '\u205f'
        || c === '\u3000'
        || c === '\ufeff'
}

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
const lineBreakWidth = 0.6;
const lineBreakChars = Math.ceil(lineBreakWidth * averageCharsPerLine);

console.log("--------> fontSize ", fontSize)
console.log("--------> lineHeight ", lineHeight)
console.log("--------> lineWidth ", lineWidth)
console.log("--------> charsPerLine ", charsPerLine)
console.log("--------> averageCharWidth ", averageCharWidth)
console.log("--------> lineBreakChars ", lineBreakChars)

let lineBreak = 0;
let lineBreaksPerPage = 0;

// Quill event handler on 'text-change'
function addNewPage(delta, oldDelta, source) {
    console.log("current change ---> ", delta);
    console.log("old delta ---> ", oldDelta);
    console.log("old delta ops ---> ", oldDelta.ops);
    console.log("retain ------> ", delta.ops[0].retain)
    console.log("averageCharsPerLine ------> ", averageCharsPerLine)

    if (delta.ops.length < 2 || !delta.ops[1].hasOwnProperty("insert")) {
        console.log("there wasn't an insert (nothing to move to the next page)")
        return;
    }

    let retainChars = delta.ops[0].retain;
    let oldContent = oldDelta.ops[0].insert;
    if (oldContent[oldContent.length-1] === '\n') {
        lineBreaksPerPage++;
        lineBreak = 1;
        console.log("---------> line break")
    }

    // let textWidth = (retainChars + lineBreaksPerPage * lineBreakChars) * averageCharWidth;

    // console.log("textWidth ------> ", textWidth)
    // let curLinesNum = Math.round(textWidth / lineWidth);
    // console.log("curLinesNum ------> ", curLinesNum)
    // console.log("curLinesNum float ------> ", textWidth / lineWidth)

    // let curHeight = curLinesNum * lineHeight;
    // console.log("curHeight ------> ", curHeight)

    // В общем можно вычислять размер методом getBounds, в поле bottom будет высота контента
    console.log("quil.getBounds ------> ", pageEditors[currentPageId].getBounds(retainChars));

    if (!delta.ops[1].hasOwnProperty("insert")) {
        console.log("there wasn't an insert (nothing to move to the next page)")
        return;
    }

    let height = pageEditors[currentPageId].getBounds(retainChars).height;
    let bottom = pageEditors[currentPageId].getBounds(retainChars).bottom;
    if (bottom + height * lineBreak <= initialHeight) {
        return;
    }

    console.log("-------------> here we have an overflow! so there is a need to create a new page")
    console.log("-------------> bottom + height * lineBreak ", bottom + height * lineBreak);
    console.log("-------------> initialHeight ", initialHeight)

    // wait until the end of the line
    let deltaHeight = 0;
    if (delta.ops[1].insert === '\n') {
        deltaHeight = height;
    }

    console.log("-------------> deltaHeight ", deltaHeight)

    if (bottom + deltaHeight <= initialHeight) {
        return;
    }

    let lastInsert = delta.ops[1].insert;

    pageEditors[currentPageId].disable();
    // нужно сделать так, чтобы при переносе строки не было прокрутки, удалить дельту из эдитора
    pageEditors[currentPageId].deleteText(retainChars, 1);

    currentPageId++;

    let blankPage = createBlankPage(currentPageId);
    pageContainer.appendChild(blankPage);

    let text = "";
    if (!isWhitespace(lastInsert)) {
        // перенести последнее слово на новую страницу
        text = oldDelta.ops[0].insert.slice(
            oldDelta.ops[0].insert.lastIndexOf(' ') + 1
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
    lineBreaksPerPage = 0;
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

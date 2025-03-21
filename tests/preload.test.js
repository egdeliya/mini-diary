jest.mock('electron');

const preload = require('../preload.js');

let testUid = crypto.randomUUID();
let testEntry = {
    uid: testUid,
    title: "test title " + testUid,
    date: new Date().toDateString(),
    content: "test content"
}

let entries = preload.loadEntries();

beforeAll(() => {
    preload.buildIndex(entries);
})

afterAll(() => {
    preload.deleteEntry(testUid);
})

test("saveEntry saves entry", () => {
    expect(preload.search(testUid).size).toBe(0);

    preload.saveEntry(testUid, testEntry);

    expect(preload.search(testUid).size).toBe(1);
})
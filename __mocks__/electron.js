module.exports = {
    contextBridge: {
        exposeInMainWorld: jest.fn(),
    },
    ipcRenderer: {
        send: jest.fn(),
        invoke: jest.fn(),
        on: jest.fn(),
        removeListener: jest.fn(),
    }
};
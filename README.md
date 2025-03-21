# Mini-diary

A journal app focused on simplicity. Users can create and edit using the [Quill](https://quilljs.com/) text editor,
read, and search diary entries. All data is stored locally on the user’s device. 
The minimalistic design helps users focus on writing without distractions.

Tested on MacOS. Built with [Electron](https://www.electronjs.org/).

## 🚀 Features

- Add and edit entries
- View and search entries
- Save data in JSON
- Works locally without the internet

## 📦 Installation

Make sure you have [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed.

Clone the repository:
```bash
https://github.com/egdeliya/mini-diary.git
cd mini-diary
```

Install dependencies:
```bash
npm install
```

## 🏃 Running the Application

Start the application in development mode:
```bash
npm start
```

##  📂 Project Structure
```
mini-diary/
├── css
   └── styles.css        # Application styles
├── img/                 # Application images
├── js/                  # Application images
    ├── editor.js            # Common functions to work with editor
    ├── new_entry.js         # Create new entry logic
    ├── search_entries.js    # Search entries logic
    └── entry.js             # View and edit entry logic
├── main.js              # Main Electron process
├── preload.js           # Preload script (bridge between frontend and backend)
├── new_entry.html       # New entry interface
├── search_entries.html  # Search entries interface
├── entry.html           # View and edit entry interface
├── package.json         # Dependencies and scripts
├── data/diary.json      # File for storing entries
└── node_modules/        # Installed packages
```

## 🙌 TODO

- Add Github actions to build Electron app for different OS
- Use SQLite

## 📝 License

This project is licensed under the [MIT license](LICENSE).

Copyright © 2025 Egdeliia Samirova.

let entries = window.diaryAPI.loadEntries();
window.diaryAPI.buildIndex(entries);

let previews = document.getElementsByClassName("entries-list")[0];

for (let uid in entries) {
    const entry = entries[uid];
    const li = document.createElement('li');
    li.setAttribute('data-uid', uid);
    li.innerHTML = `
    <article class="entry-preview">
        <div>
            <header>
                <div class="title-container">
                    <h1 class="entry-title">${entry.title}</h1>
                    <p class="date">${entry.date}</p>
                </div>
            </header>
    
            <div class="page-0">
                <p>${entry.content}</p>
            </div>
        </div>
        
        <a href="./entry.html?uid=${uid}">
            <img class="angle-right" src="./img/angle-right-solid.svg" alt="go to diary entry">
        </a>
    </article>
    `;
    previews.appendChild(li);
}

let searchInput = document.getElementById("search");

searchInput.addEventListener("keyup", e => {
    let pattern = searchInput.value.toLowerCase();

    const foundUids = window.diaryAPI.search(pattern);

    let listElements = previews.getElementsByTagName("li");
    for (let i = 0; i < listElements.length; i++) {
        let elem = listElements[i];
        let uid = elem.getAttribute("data-uid");

        if (foundUids.has(uid) || pattern === "") {
            elem.removeAttribute("hidden");
        } else {
            elem.setAttribute("hidden", "");
        }
    }
});



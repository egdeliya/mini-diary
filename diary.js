const entryTitleEditor = new Quill('#entry-title', {
    theme: 'bubble',
    placeholder: 'Entry title',

});
const entryBodyEditor = new Quill('#entry-body', {
    theme: 'bubble'
});

// hide menu if back button clicked
const backBtn = document.getElementsByClassName("back")[0];
const navItems = document.getElementsByClassName("nav-items")[0];
const menuCheckbox = document.querySelector("#menu-checkbox");
const menuBtn = document.querySelector(".menu-btn");
console.log(menuCheckbox)
console.log(menuCheckbox.checked);

menuCheckbox.addEventListener("change", (e) => {
    console.log(e)
    console.log(menuCheckbox.checked);

    navItems.style.visibility = "visible";
    menuBtn.style.display = "none";
})

backBtn.addEventListener("click", () => {
    console.log("click!")
    console.log(navItems)
    console.log(menuCheckbox.checked)

    navItems.style.visibility = "hidden";

    menuBtn.style.display = "block";
    menuCheckbox.checked = false;
})

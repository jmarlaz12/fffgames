const navBar = document.querySelector('.normal');
const navHeight = navBar.getBoundingClientRect().height;
console.log(navHeight);

window.addEventListener("scroll", () => {
    const scrollHeight = window.pageYOffset;
    if (scrollHeight > navHeight) {
        navBar.classList.add("fixed");
    } else {
        navBar.classList.remove("fixed");
    }
});
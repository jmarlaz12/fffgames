const navBar = document.querySelector('.normal');
const navHeight = navBar.getBoundingClientRect().height;
var all = document.querySelectorAll('.game');

window.addEventListener("scroll", () => {
    const scrollHeight = window.pageYOffset;
    if (scrollHeight > navHeight) {
        navBar.classList.add("fixed");
    } else {
        navBar.classList.remove("fixed");
    }
});

// Animations
for (var i = 0; i < all.length; i++) {
    gsap.from(all[i], { opacity: 0, duration: .1, delay: 0.5 + (i * 0.1), x: -200 });
}

gsap.from(".normal", { opacity: 0, duration: 2, delay: 0.5, y: -10 });
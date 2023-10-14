// active the current page in the navbar
const current = document.querySelector(".current");
const links = document.querySelectorAll(".nav-link");
links.forEach((link) => {
    if (link.href === window.location.href) {
        link.classList.add("active");
    }
});
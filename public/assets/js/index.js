// active the current page in the navbar
const current = document.querySelector(".current");
const links = document.querySelectorAll(".nav-link");
links.forEach((link) => {
    if (link.href === window.location.href) {
        link.classList.add("active");
    }
});

// set default image
const images = document.querySelectorAll("img");
images.forEach((img) => {
    if (img.src === window.location.href) {
        img.src = "/img/default_image.jpg";
    }
});

// Header active nav item
const header = document.querySelector("header");
const headerBtns = header.getElementsByClassName("nav-link");

// Mobile navigation
const mobileNav = document.querySelector(".mobile-nav");

for (let i = 0; i < headerBtns.length; i++) {
  headerBtns[i].addEventListener("click", function () {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

/**
 * Toggles the mobile nav class "open"
 */
function mobileMenu() {
  mobileNav.classList.toggle("open");
}

export { mobileMenu };

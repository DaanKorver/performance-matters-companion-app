const preloader = document.querySelector(".preloader");

function hidePreloader() {
  setTimeout(() => {
    preloader.classList.add("hide");
  }, 800);
}

export { hidePreloader };

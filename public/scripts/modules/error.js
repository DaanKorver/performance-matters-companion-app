const errorEl = document.querySelector(".error");

function error() {
  setTimeout(() => {
    errorEl.classList.add("visible");
  }, 800);
}

export { error };

addEventListener("DOMContentLoaded", start);

function start() {
  enableNotesToggle();
  createMovingBackground();
}

function enableNotesToggle() {
  const collapseToggle = document.querySelector("#collapse-toggle");
  const collapsible = document.querySelector(".collapsible");

  collapseToggle.addEventListener("click", () => {
    collapsible.classList.toggle("is-not-collapsed");
  });
}

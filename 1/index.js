addEventListener("DOMContentLoaded", start);

function start() {
  enableNotesToggle();
  generate();
}

function enableNotesToggle() {
  const collapseToggle = document.querySelector("#collapse-toggle");
  const collapsible = document.querySelector(".collapsible");

  collapseToggle.addEventListener("click", () => {
    console.log("boop");
    collapsible.classList.toggle("is-collapsed");
  });
}

function generate() {
  const artProjectsByBeeple = 5706;
  const repaintRateMs = 500;
  const artProjectsToRevealPerRepaint = 6000 / repaintRateMs;
  let counter = 0;

  const interval = setInterval(() => {
    paint(artProjectsToRevealPerRepaint);
    counter += artProjectsToRevealPerRepaint;
    if (counter >= artProjectsByBeeple) clearInterval(interval);
  }, repaintRateMs);
}

function paint(artProjectsToRevealPerRepaint) {
  const main = document.querySelector("main");

  for (let i = 0; i < artProjectsToRevealPerRepaint; i++) {
    const art = createArt();
    main.appendChild(art);
  }
}

function createArt() {
  const art = document.createElement("div");
  art.classList.add("art");
  art.style.backgroundColor = getRandomColour();
  return art;
}

function getRandomColour() {
  const colours = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
  ];

  const randomIndex = Math.floor(Math.random() * colours.length);
  return colours[randomIndex];
}

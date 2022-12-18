/**
 * lots of code copied from MDN tutorial on touch events
 * https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
 */

addEventListener("DOMContentLoaded", start);

let canvas;
let logEl;
let offsetX;
let offsetY;
const ongoingTouches = [];

function start() {
  enableNotesToggle();

  canvas = document.querySelector("#canvas");
  logEl = document.querySelector("#log");
  offsetX = canvas.getBoundingClientRect().left;
  offsetY = canvas.getBoundingClientRect().top;

  enableResponsiveResizing(canvas);
  enableResponsiveResizing(logEl);

  canvas.addEventListener("touchstart", handleStart);
  canvas.addEventListener("touchend", handleEnd);
  canvas.addEventListener("touchcancel", handleCancel);
  canvas.addEventListener("touchmove", handleMove);
  log("Initialized.");
}

function handleStart(evt) {
  evt.preventDefault();
  log("touchstart.");
  const el = document.getElementById("canvas");
  const ctx = el.getContext("2d");
  const touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    log(`touchstart: ${i}.`);
    ongoingTouches.push(copyTouch(touches[i]));
    const color = randomHexColor(touches[i]);
    log(`color of touch with id ${touches[i].identifier} = ${color}`);
    ctx.beginPath();
    ctx.arc(
      touches[i].pageX - offsetX,
      touches[i].pageY - offsetY,
      8,
      0,
      2 * Math.PI,
      false
    ); // a circle at the start
    ctx.fillStyle = color;
    ctx.fill();
  }
}

function handleMove(evt) {
  evt.preventDefault();
  const el = document.getElementById("canvas");
  const ctx = el.getContext("2d");
  const touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    const color = randomHexColor(touches[i]);
    const idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      log(`continuing touch ${idx}`);
      ctx.beginPath();
      log(
        `ctx.moveTo( ${ongoingTouches[idx].pageX - offsetX}, ${
          ongoingTouches[idx].pageY - offsetY
        } );`
      );
      ctx.moveTo(
        ongoingTouches[idx].pageX - offsetX,
        ongoingTouches[idx].pageY - offsetY
      );
      log(
        `ctx.lineTo( ${touches[i].pageX - offsetX}, ${
          touches[i].pageY - offsetY
        } );`
      );
      ctx.lineTo(touches[i].pageX - offsetX, touches[i].pageY - offsetY);
      ctx.lineWidth = 6;
      ctx.strokeStyle = color;
      ctx.stroke();
      ongoingTouches.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
    } else {
      log("can't figure out which touch to continue");
    }
  }
}

function handleEnd(evt) {
  evt.preventDefault();
  log("touchend");
  const el = document.getElementById("canvas");
  const ctx = el.getContext("2d");
  const touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    const color = randomHexColor(touches[i]);
    let idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      ctx.lineWidth = 4;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(
        ongoingTouches[idx].pageX - offsetX,
        ongoingTouches[idx].pageY - offsetY
      );
      ctx.lineTo(touches[i].pageX - offsetX, touches[i].pageY - offsetY);
      ctx.fillRect(
        touches[i].pageX - offsetX - 4,
        touches[i].pageY - offsetY - 4,
        12,
        12
      ); // and a square at the end
      ongoingTouches.splice(idx, 1); // remove it; we're done
    } else {
      log("can't figure out which touch to end");
    }
  }
}

function handleCancel(evt) {
  evt.preventDefault();
  log("touchcancel.");
  const touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    let idx = ongoingTouchIndexById(touches[i].identifier);
    ongoingTouches.splice(idx, 1); // remove it; we're done
  }
}

/**
 * Utils
 */
function randomHexColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function copyTouch({ identifier, pageX, pageY }) {
  return { identifier, pageX, pageY };
}

function ongoingTouchIndexById(idToFind) {
  for (let i = 0; i < ongoingTouches.length; i++) {
    const id = ongoingTouches[i].identifier;

    if (id === idToFind) {
      return i;
    }
  }
  return -1; // not found
}

function log(msg) {
  const container = document.getElementById("log");
  container.textContent = `${msg} \n${container.textContent}`;
}

function enableNotesToggle() {
  const collapseToggle = document.querySelector("#collapse-toggle");
  const collapsible = document.querySelector(".collapsible");

  collapseToggle.addEventListener("click", () => {
    collapsible.classList.toggle("is-not-collapsed");
  });
}

function enableResponsiveResizing(element) {
  resize(element);
  window.addEventListener("resize", () => resize(element));
}

function resize(element) {
  const newWidth = `${window.innerWidth - 25}` + "px";
  element.style.width = newWidth;
}

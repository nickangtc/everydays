addEventListener("DOMContentLoaded", start);
let canvas;
let ctx;

function start() {
  enableNotesToggle();
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");

  const graph = new Graph();
  for (let i = 0; i < 10; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const node = new Node(x, y);
    graph.addNode(node);
  }
}

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 10;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  }

  linkTo(node) {
    console.log("link to called");
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(node.x, node.y);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
  }
}

// store the collection of nodes
// and draw the links between them
class Graph {
  constructor() {
    this.nodes = [];
    this.refreshAnimation();
  }

  addNode(node) {
    this.nodes.push(node);
  }

  refreshAnimation() {
    setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.moveAndDrawNodes();
      this.drawLinks();
    }, 200);
  }

  moveAndDrawNodes() {
    this.nodes.forEach((node) => {
      node.x += Math.random() * 10 - 5;
      node.y += Math.random() * 10 - 5;
      node.draw();
    });
  }

  drawLinks() {
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        this.nodes[i].linkTo(this.nodes[j]);
      }
    }
  }
}

function enableNotesToggle() {
  const collapseToggle = document.querySelector("#collapse-toggle");
  const collapsible = document.querySelector(".collapsible");

  collapseToggle.addEventListener("click", () => {
    collapsible.classList.toggle("is-not-collapsed");
  });
  // If we're on localhost, show the notes by default
  if (window.location.origin.includes("http://localhost")) {
    collapsible.classList.toggle("is-not-collapsed");
  }
}

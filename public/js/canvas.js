//canvas setup
let canvas;
let padding = 20;

function setupCanvas() {
  createCanvas(window.innerWidth - padding, window.innerHeight - padding - 50);
  canvasSize();
}
function canvasSize() {
  canvas = resizeCanvas(window.innerWidth - padding, window.innerHeight - padding);
  width = window.innerWidth;
  height = window.innerHeight;
}

//window resized
function windowResized() {
  canvasSize();
  elementPos();
}

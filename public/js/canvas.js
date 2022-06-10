//canvas setup
let canvas;
let padding = 20;

function setupCanvas() {
  createCanvas(window.innerWidth - padding, window.innerHeight - padding);
  canvasSize();

  backgroundColor = color(0, 20, 100);
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


let backgroundColor;
function drawBackground() {
  document.body.style.backgroundColor = color(hue(backgroundColor), 0.8*saturation(backgroundColor), 0.8*brightness(backgroundColor)); //set background color behind canvas
  background(backgroundColor); //set canvas color
}

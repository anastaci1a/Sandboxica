let backgroundColor;

//***
function setup() {
  //canvas & colors
  setupCanvas();
  colorMode(HSB);
  //draw setup
  rectMode(CENTER);
  ellipseMode(CENTER);
  textAlign(CENTER, CENTER);

  //chat message box
  setupChat();

  //setups
  setupMouse();
  setupGameState();
}

//***
function draw() {
  //background
  if (backgroundColor == null) backgroundColor = (frameCount / 2) % 360;
  background(backgroundColor, 20, 100); //set canvas color
  document.body.style.backgroundColor = color(backgroundColor, 20, 90); //set background color behind canvas

  //game
  gameState();

  //input
  mouse.update();
}

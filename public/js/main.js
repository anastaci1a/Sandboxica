p5.disableFriendlyErrors = true; // better performance

//***
function setup() {
  //canvas & colors
  colorMode(HSB, 360, 100, 100, 255);
  setupCanvas();
  //draw setup
  rectMode(CENTER);
  ellipseMode(CENTER);
  textAlign(CENTER, CENTER);

  //chat message box
  setupChat();
  lockMessage(true);

  //setups
  setupInput();
  setupGameState();
}

//***
function draw() {
  //game
  gameState();

  //input
  mouse.update();
}

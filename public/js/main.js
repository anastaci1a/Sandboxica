//***
function setup() {
  //canvas & colors
  colorMode(HSB);
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
  //background
  drawBackground();
  backgroundColor = color((frameCount / 2) % 360, 20, 100);

  //game
  gameState();

  //input
  mouse.update();
}

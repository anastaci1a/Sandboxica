let socket;

//***
function setup() {
  //canvas & colors
  setupCanvas();
  colorMode(HSB);

  //connect to server
  socket = io();
  //reload page by server's request
  socket.on('reload', reloadPage);
  function reloadPage() {
    location.reload();
  }
  //alert page by server's request
  socket.on('directAlert', reloadPage);
  function reloadPage(str) {
    alert(str);
  }
  //join message
  function joinMessage() {
    let data = {
      user: messageName.value()
    }
    if (data.user != '') socket.emit('joinMessage', data);
  }

  //chat message box
  setupChat();
  joinMessage();

  //setups
  setupGameState();
}

//***
function draw() {
  //background
  let col = (frameCount / 2) % 360;
  background(col, 20, 100); //set canvas color
  document.body.style.backgroundColor = color(col, 20, 90); //set background color behind canvas

  //game
  gameState();
}

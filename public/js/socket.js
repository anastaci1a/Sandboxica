let socket;

//connect to server
socket = io();

//reload page by server's request
socket.on('reload', function() {
  location.reload();
});

//alert page by server's request
socket.on('directAlert', function(str) {
  alert(str);
});

//join message
function joinMessage() {
  let data = {
    user: messageName.value()
  }
  if (data.user != '') socket.emit('joinMessage', data);
}

//request username
let username = null;
let requested = false;
function requestUsername() {
  if (!requested) {
    let data = { username: messageName.value() }
    socket.emit('usernameTest', data);
    requested = true;
  }
}
socket.on('usernameAvailable', usernameIsAvailable);
function usernameIsAvailable(data) {
  if (data.available) username = messageName.value();
  else username = '_UNAVAILABLE_';
  requested = false;
}

//request game
let game = null;
function requestGame() {
  socket.emit('requestGame');
}
socket.on('sendGame', function(data) {
  game = data;
});

//update players
let players = [];
socket.on('updatePlayers', function(data) {
  //update local array
  players = data;
});

//get bloperties
socket.on('bloperties', function(data) {
  bloperties = data;
  combineState = 2;
});

//get held block
socket.on('heldBlock', function(block) {
  player.gui.receiveBlock(block);
});

socket.on('holdBlock', function(data) {
  print(data);

  if (data.b == -1) {
    gs = GameStates.COMBINE;
  }
  else {
    player.gui.heldBlock = data.block;
    player.gui.mode = 1;
  }
});

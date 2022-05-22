let socket;

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

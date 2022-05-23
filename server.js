//console log of all messages
let consolelog = [];
//usernames
let usernames = [];

// file system module to perform file operations
'use strict';
const fs = require('fs');

//import module being used (express is something that I have access to in node program)
let express = require('express');
let app = express();
let server = app.listen(process.env.PORT || 3000);
app.use(express.static('public')); //redirect users connecting to ip to public folder

//favicon
app.use('/favicon.ico', express.static('public/data/images/favicon.ico'));

//server started message
addToConsole(true, 'Server started...');

//socket.io
let socket = require('socket.io');
let io = socket(server);

//server connected message
addToConsole(true, 'Server connected.');


//load


//connections with clients
io.sockets.on('connection', function(socket) {
  let superuser = false;
  addToConsole(true, 'New Connection: ' + socket.id);

  //when the socket receives a message with the name 'message' run function chatMessage
  socket.on('message', function(data) {
    sendMessage(data);
  });

  //when the socket receives a message with the name 'joinMessage' run function joinMessage
  socket.on('joinMessage', function(data) {
    sendServerMessage(data.user + " has joined the game.");
  });

  //test if username is taken or available
  let username = null;
  socket.on('usernameTest', function(data) {
    let u = data.username.toLowerCase();

    let taken = false;
    for (let i = 0; i < usernames.length; i++) {
      if (u == usernames[i]) { taken = true; }
    }

    let r = { available: false }
    if (!taken) {
      username = u;
      r.available = true;
      usernames.splice(0, 0, u);
    }

    socket.emit('usernameAvailable', r);
  });

   socket.on('disconnect', function() {
      addToConsole(true, 'Disconnected: ' + socket.id);

      let i = usernames.indexOf(username);
      usernames.splice(i, 1);
   });
});

//emitting to clients
function sendServerMessage(msg) {
  let data = {
    user: "server",
    msg: msg
  };
  data = msgStyle(data);
  io.sockets.emit('message', data); //all clients
  addToConsole(true, '[' + data.user + '] ' + data.msg);
}
function sendMessage(data) {
  data = msgStyle(data);
  io.sockets.emit('message', data); //all clients
  addToConsole(true, '[' + data.user + '] ' + data.msg);
}
function directMessage(socketId, data) {
  data = msgStyle(data);
  io.to(socketId).emit('message', data);
  addToConsole(true, '[' + data.user + '] ' + data.msg + ' >> [' + socketId + ']');
}
function directAlert(socketId, data) {
  io.to(socketId).emit('directAlert', data);
  addToConsole(true, 'Alerted [' + socketId + '] "' + data.msg + '"');
}
function reloadClients() {
  io.sockets.emit('reload');
}

function getTime(mode) {
  //get time for console time
  let date_ob = new Date();
  // current date
  // adjust 0 before single digit date
  let year = date_ob.getFullYear(); // current year
  let month = ('0' + (date_ob.getMonth() + 1)).slice(-2); // current month
  let date = ('0' + date_ob.getDate()).slice(-2); // current date
  let hours = date_ob.getHours(); // current hours
  let minutes = date_ob.getMinutes(); // current minutes
  let seconds = ('0' + date_ob.getSeconds()).slice(-2); //current seconds
  // returns repending on mode
  let r = '';
  if (mode == 'fulltime') {
    r = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
  }
  if (mode == 'date') {
    r = year + '-' + month + '-' + date;
  }
  return r;
}

//console
function addToConsole(time, msg) {
  let print; //string var that's going to be saved to consolelog var
  if (time) print = '<' + getTime('fulltime') + '> ' + msg;
  else print = msg;

  //print & save
  console.log(print);
  consolelog.push(print);

  // fs = require('fs');
  // fs.writeFile('log_' + getTime('date') + '.json', 'Hello World!', function (err) {
  //   if (err) return console.log(err);
  //   console.log('Backup written');
  // });
}

//set styling for messages
function msgStyle(data) {
  let nameCases = [
    {
      user: 'admin',
      style: 'color: blue;'
    },
    {
      user: 'server',
      style: 'font-weight: 200; font-style: italic;'
    }
  ]

  //loop through name cases
  for (let i = 0; i < nameCases.length; i++) {
    let user = data.user.substring(0, nameCases[i].user.length).toLowerCase();
    let nameCase = nameCases[i].user;
    //test if name is correct name
    if (user == nameCase) {
      //new styling of msg
      data.style = nameCases[i].style;

      //new data
      return data;
    }
  }

  //old data
  return data;
}

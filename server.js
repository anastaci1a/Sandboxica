//console log of all messages
let consolelog = [];
//game
let game = [];
//players
let players = [{
  id: 0,
  username: 0,
  x: 0,
  y: 0
}];
let usernames = [];

//blocks
let blockIndex = [
  //0
  {
    name: 'Stone',
    properties: '',
    col: {
      hue: 0,
      sat: 0,
      bri: 29,
      hran: 0,
      sran: 0,
      bran: 10
    }
  },
  //1
  {
    name: 'Dirt',
    properties: '',
    col: {
      hue: 22,
      sat: 54,
      bri: 42,
      hran: 10,
      sran: 0,
      bran: 10
    }
  },
  //2
  {
    name: 'Water',
    properties: '',
    col: {
      hue: 204,
      sat: 49,
      bri: 84,
      hran: 10,
      sran: 0,
      bran: 5
    }
  },
  //3
  {
    name: 'Fire',
    properties: '',
    col: {
      hue: 13,
      sat: 69,
      bri: 100,
      hran: 20,
      sran: 0,
      bran: 10
    }
  }
];

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
addToConsole('Server started...');

//socket.io
let socket = require('socket.io');
let io = socket(server);

//server connected message
addToConsole('Server connected.');

//load
setupGame();


//connections with clients
io.sockets.on('connection', function(socket) {
  addToConsole('New Connection: ' + socket.id);

  //when the socket receives a message with the name 'message' run function chatMessage
  socket.on('message', function(data) {
    sendMessage(data);
  });

  //when the socket receives a message with the name 'joinMessage' run function joinMessage
  socket.on('joinMessage', function(data) {
    sendServerMessage(data.user + " has joined the game.");

    if (getPlayerIndex(socket.id) == null) {
      players.push({
        id: socket.id,
        username: data.user,
        x: 0,
        y: 0
      });
    }
  });

  //test if username is taken or available
  let username = null;
  socket.on('usernameTest', function(data) {
    let u = data.username.toLowerCase();

    let taken = false;
    for (let i = 0; i < usernames.length; i++) {
      if (u == usernames[i]) { taken = true; }
    }

    let r = { available: false, test: usernames };
    if (!taken) {
      username = u;
      r.available = true;
      usernames.splice(0, 0, u);
    }

    socket.emit('usernameAvailable', r);
  });

  socket.on('disconnect', function() {
    addToConsole('Disconnected: ' + username + ' ' + socket.id);

    usernames.splice(usernames.indexOf(username), 1);
    players.splice(getPlayerIndex(socket.id), 1);

    updatePlayers();
  });

  socket.on('requestGame', function() {
   socket.emit('sendGame', game);
   addToConsole('Sent game to ' + username + ' ' + socket.id);
  });

  //players stuff
  socket.on('sendPos', function(pos) {
   let i = getPlayerIndex(socket.id);
   if (i != null) {
     players[i].x = pos.x;
     players[i].y = pos.y;
   }

   updatePlayers();
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
  addToConsole('[' + data.user + '] ' + data.msg);
}
function sendMessage(data) {
  data = msgStyle(data);
  io.sockets.emit('message', data); //all clients
  addToConsole('[' + data.user + '] ' + data.msg);
}
function directMessage(socketId, data) {
  data = msgStyle(data);
  io.to(socketId).emit('message', data);
  addToConsole('[' + data.user + '] ' + data.msg + ' >> [' + socketId + ']');
}
function directAlert(socketId, data) {
  io.to(socketId).emit('directAlert', data);
  addToConsole('Alerted [' + socketId + '] "' + data.msg + '"');
}
function reloadClients() {
  io.sockets.emit('reload');
}
function updatePlayers() {
  io.sockets.emit('updatePlayers', players);
}
function getPlayer(id) {
  for (i = 0; i < players.length; i++) {
    if (players[i].id = id) {
      return players[i];
    }
  }
}
function getPlayerIndex(id) {
  for (i = 0; i < players.length; i++) {
    if (players[i].id == id) {
      return i;
    }
  }
  return null;
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
function addToConsole(msg) {
  let time = true;
  let print = '<' + getTime('fulltime') + '> ' + msg;

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



//setup game
function setupGame() {
  //see if save file exists
  let saveFileExists = checkFileExists('save.json');
  let f = {};
  //load save file
  if (saveFileExists) {
    addToConsole('Loading save file...');
    const fs = require('fs');
    try {
      const jsonData = JSON.parse(fs.readFileSync('save.json', 'utf-8'));
    } catch(err) {
      saveFileExists = false;
      addToConsole('Error loading save file at: ' + err);
    }
    if (saveFileExists) {
      f = jsonData;
    }
  }
  //autosaves & new save files
  if (!saveFileExists) {
    addToConsole('Checking autosaves...');
    //check and load newest autosave
    //else create new save file
    addToConsole('Creating new save file...');

    game = createGame(100);

    addToConsole('Done!');
  }
}


function createGame(s) {
  let r = [];
  for (x = 0; x < s; x++) {
    r[x] = [];
    for (y = 0; y < s; y++) {
      let block = parseInt(4*Math.random());
      r[x][y] = loadBlockIndex(block);
    }
  }
  return r;
}

function loadBlockIndex(block) {
  let b = blockIndex[block];
  let r = {
    name: b.name,
    properties: b.properties,
    col: {
      hue: b.col.hue + b.col.hran*Math.random() - b.col.hran/2,
      sat: b.col.sat + b.col.sran*Math.random() - b.col.sran/2,
      bri: b.col.bri + b.col.bran*Math.random() - b.col.bran/2
    }
  }
  return r;
}







function checkFileExists(filepath){
  let flag = true;
  try {
    fs.accessSync(filepath, fs.constants.F_OK);
  } catch(e) {
    flag = false;
  }
  return flag;
}

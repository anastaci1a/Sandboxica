//chat inputs
let messageInput, messageName;
let messageSend;
//chat messages
let chatlog = [];
let chatlogDiv, chatlogP = [];

//run after everything initialized
function setupChat() {
  //username textbox
  messageName = createInput('user' + int(random(100, 999)));
  messageName.style('width: 100px; text-align: center; name: "messageName";');
  messageName.id('messageName');
  //chat textbox
  messageInput = createInput();
  messageInput.id('messageInput');
  //button
  messageSend = createButton('Send');
  messageSend.id('messageSend');
  //pressing enter to send
  $(document).keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      msgSend();
    }
  });

  //chatlog div
  chatlogDiv = createElement('div', '');
  chatlogDiv.id('chatlogDiv');
  // chatlogDiv.style('background-color:green; display: flex; justify-content: left; align-items: flex-end;');

  //load username from localStorage
  let username = localStorage.getItem('username');
  if (username != null) messageName.value(username);
  //save username to localStorage
  messageName.elt.addEventListener('input', function() {
    localStorage.setItem('username', messageName.value());
  });

  //send message (button click)
  messageSend.mousePressed(msgSend);
  function msgSend() {
    let msg = messageInput.value();
    let data = { //msg data to send
      user: messageName.value(),
      msg: msg,
      style: ''
    }
    //user message
    if (messageInput.value() != '' && messageName.value() != '') {
      socket.emit('message', data); //send to server
      messageInput.value(''); //clear message box
    }
  }

  //receive message
  socket.on('message', msgReceive);

  function msgReceive(data) {
    addMessage(data);
  }
  //add message to chatlog
  function addMessage(data) {
    let i = chatlogP.length; //chat message index

    //test if current message-name is the same as the last one
    let sameName = false;
    // if (i != 0) {sameName = data.name == chatlog[i-1].name; //brokennnn
    // console.log(data.name, chatlog[i-1].name);}

    //add message to div
    if (!sameName) chatlogP[i] = createP('[' + data.user + '] ' + data.msg); //add username
    else chatlogP[i] = createP(data.msg); //no username

    chatlogP[i].style('font-family: Arial, Helvetica, sans-serif; ' + data.style);
    chatlogP[i].parent('chatlogDiv');
    //scroll down once a message is received
    let objDiv = document.getElementById('chatlogDiv');
    objDiv.scrollTop = objDiv.scrollHeight;

    chatlog.push(data);
  }

  //run function from server
  socket.on('directAlert', directAlert);

  function directAlert(data) {
    alert(data.msg);
  }

  elementPos();
}

//set positions of elements
function elementPos() {
  messageName.position(padding, height - 3.5 * padding);
  messageInput.position(padding, height - 2 * padding);
  messageSend.position(9 * padding, height - 2 * padding);

  chatlogDiv.position(padding, height / 2);
  chatlogDiv.size(12 * padding, height / 2 - 5 * padding);
}

let gs;

function setupGameState() {
  gs = 0;
}

function gameState() {
  switch(gs) {
    //home menu
    case 0: {
      let bt = new Button("Join Game!", (frameCount / 1.5) % 360, width/2, height/2, height/10);
      bt.manage();

      if (bt.released) { gs = 1; }
      break;
    }

    //username test
    case 1: {
      let u = messageName.value();
      u = u.trim();
      const yn = confirm('Do you want your username to be "' + u + '"?');

      requestUsername();
      messageName.value(u);

      if (yn) gs = 2;
      else gs--;

      break;
    }

    //loading
    case 2: {
      textSize(height/10);
      text("Loading...", width/2, height/2);

      if (username != null) {
        if (username == "_UNAVAILABLE_") {
          alert('Username "' + messageName.value() + '" is unavailable.');
          gs = 0;
          break;
        } else {
          gs = 3;
          break;
        }
      }

      break;
    }

    //join message
    case 3: {
      joinMessage();
      lockUsername(true);

      gs = 4;

      break;
    }

    //game
    case 4: {
      break;
    }

    //admin room
    case 4: {
      break;
    }
  }
}

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

    //loading username
    case 2: {
      textSize(height/20);
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

    case 3: {
      textSize(height/20);
      text("Downloading Chunks...", width/2, height/2);

      gs++;

      break;
    }

    //join message
    case 4: {
      joinMessage();
      lockUsername(true);

      gs++;

      break;
    }

    //game
    case 5: {
      break;
    }

    //admin room
    case 6: {
      break;
    }
  }
}

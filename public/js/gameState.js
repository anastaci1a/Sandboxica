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
          requestGame();
          break;
        }
      }
      break;
    }

    //load chunks
    case 3: {
      textSize(height/20);
      text("Downloading Chunks...", width/2, height/2);

      break;
    }

    //join message
    case 4: {
      joinMessage();
      lockUsername(true);
      lockMessage(false);

      gs++;

      break;
    }

    //the overlook
    case 5: {
      overlook();

      break;
    }

    //welcome screen
    case 6: {
      welcomeScreen();

      break;
    }

    //game
    case 7: {
      runGame();

      break;
    }

    //map
    case 8: {
      let bt = new Button("Back to game", (frameCount / 1.5) % 360, width/2, height/11, height/12);

      drawMap();
      bt.manage();

      if (bt.released) { gs = 7; }
    }



    // //admin room
    // case 6: {
    //   break;
    // }
  }
}

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
          gs++;
          break;
        }
      }
      break;
    }

    //double-check username
    case 3: {
      if (username == "_UNAVAILABLE_") {
        alert('Username "' + messageName.value() + '" is unavailable.');
        gs = 0;
      } else {
        requestGame();
        gs++;
      }

      break;
    }

    //load chunks
    case 4: {
      textSize(height/20);
      text("Downloading Chunks...", width/2, height/2);

      break;
    }

    //join message
    case 5: {
      joinMessage();
      lockUsername(true);
      lockMessage(false);

      gs++;

      break;
    }

    //the overlook
    case 6: {
      overlook();

      break;
    }

    //welcome screen
    case 7: {
      welcomeScreen();

      break;
    }

    //game
    case 8: {
      let h = height/15;
      textSize(h/3);
      let bt1pos = textWidth('View Map')/2 + height/20;
      let bt1 = new Button('View Map', (frameCount / 1.5) % 360, bt1pos, bt1pos, h);
      let bt2pos = textWidth('The Overlook')/2 + height/20;
      let bt2 = new Button("The Overlook", (frameCount / 1.5) % 360, bt2pos, 1.5*bt2pos, h);

      runGame();
      bt1.manage();
      bt2.manage();

      if (bt1.released) { gs++; }
      if (bt2.released) { gs = 6; }

      break;
    }

    //map
    case 9: {
      let bt = new Button('Back to Game', (frameCount / 1.5) % 360, width/2, height/11, height/12);

      drawMap();
      bt.manage();

      if (bt.released) { gs--; }
    }



    // //admin room
    // case 6: {
    //   break;
    // }
  }
}

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

      if (bt.released) gs = 1;
      break;
    }

    //loading
    case 1: {
      textSize(height/10);
      text("Loading...", width/2, height/2);

      gs = 2;

      break;
    }

    //join message
    case 2: {
      joinMessage();
      gs = 3;
      break;
    }

    //game
    case 3: {
      break;
    }

    //admin room
    case 4: {
      break;
    }
  }
}

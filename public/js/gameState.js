let gs;

function setupGameState() {
  gs = 0;
}

const GameStates = {
  HOME_MENU: 0,
  USERNAME_TEST: 1,
  LOADING_USERNAME: 2,
  DOUBLE_CHECK_USERNAME: 3,
  LOAD_CHUNKS: 4,
  JOIN_MESSAGE: 5,
  OVERLOOK: 6,
  WELCOME_SCREEN: 7,
  GAME: 8,
  MAP: 9,
  COMBINE: 10
}

function gameState() {
  if (gs == GameStates.WELCOME_SCREEN) {
    backgroundColor = color(0, 0, 0);
  } else {
    backgroundColor = color((frameCount / 2) % 360, 20, 100);
  }

  if (gs != GameStates.GAME) { // Don't refresh background ingame (already drawing blocks over everything)
	drawBackground();
  }

  switch(gs) {
    case GameStates.HOME_MENU: {
      let bt = new Button("Join Game!", (frameCount / 1.5) % 360, width/2, height/2, height/10);
      bt.manage();

      if (bt.released) { gs = GameStates.USERNAME_TEST; }
      break;
    }

	  case GameStates.USERNAME_TEST: {
      let u = messageName.value();
      u = u.trim();
      const yn = confirm('Do you want your username to be "' + u + '"?');

      requestUsername();
      messageName.value(u);

      if (yn) gs = GameStates.LOADING_USERNAME;
      else gs = GameStates.HOME_MENU;

      break;
    }

	  case GameStates.LOADING_USERNAME: {
      textSize(height/20);
      text("Loading...", width/2, height/2);

      if (username != null) {
        if (username == "_UNAVAILABLE_") {
          alert('Username "' + messageName.value() + '" is unavailable.');
          gs = GameStates.HOME_MENU;
          break;
        } else {
		      gs = GameStates.DOUBLE_CHECK_USERNAME;
          break;
        }
      }
      break;
    }

  	case GameStates.DOUBLE_CHECK_USERNAME: {
      if (username == "_UNAVAILABLE_") {
        alert('Username "' + messageName.value() + '" is unavailable.');
		    gs = GameStates.HOME_MENU;
      } else {
        requestGame();
        gs = GameStates.LOAD_CHUNKS;
      }

      break;
    }

  	case GameStates.LOAD_CHUNKS: {
      textSize(height/20);
      text("Downloading Chunks...", width/2, height/2);

      break;
    }

  	case GameStates.JOIN_MESSAGE: {
      joinMessage();
      lockUsername(true);
      lockMessage(false);

      gs++;

      break;
    }

	  case GameStates.OVERLOOK: {
      overlook();

      break;
    }

  	case GameStates.WELCOME_SCREEN: {
      welcomeScreen();

      break;
    }

  	case GameStates.GAME: {
      let h = height/15;
      textSize(h/3);
      let bt1Text = 'View Map';
      let bt1pos = textWidth(bt1Text)/2 + height/20;
      let bt1 = new Button(bt1Text, (frameCount / 1.5) % 360, bt1pos, bt1pos, h);
      let bt2Text = 'The Overlook';
      let bt2pos = textWidth(bt2Text)/2 + height/20;
      let bt2 = new Button(bt2Text, (frameCount / 1.5) % 360, bt2pos, 1.5*bt2pos, h);

      runGame();
      bt1.manage();
      bt2.manage();

      if (bt1.released) { gs = GameStates.MAP; }
	  if (bt2.released) { gs = GameStates.OVERLOOK; }

      break;
    }

  	case GameStates.MAP: {
      let bt = new Button('Back to Game', (frameCount / 1.5) % 360, width/2, height/11, height/12);

      drawMap();
      bt.manage();

      if (bt.released) { gs = GameStates.GAME }
    }

    case GameStates.COMBINE: {
      runCombine();
    }
  }
}

let gs;

function setupGameState() {
  gs = 0;
}

function gameState() {
  switch(gs) {
    //home menu
    case 0: {
      let bt = new Button("click meeeeeee", width/2, height/2, height/10);
      bt.manage();
      if (bt.released) gs = 1;
      break;
    }
    //
    case 1: {}
  }
}

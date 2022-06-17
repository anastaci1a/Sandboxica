let overlookZoom = 1;
let overlooked = false; // zoomy zoom
let overlookedPos;
let overlookedZoom = 1;
function overlook() {
  if (!overlooked) {
    let mw = 1 + -mouse.wheel/10;
    overlookZoom *= mw;
    overlookZoom = constrain(overlookZoom, 1, 1.5);
  }

  push();

  let bSize = height/game.length*overlookZoom;
  let size = createVector(bSize*game.length, bSize*game[0].length);

  //mouse vars
  if (!overlooked) {
    mx = -((width/2 - mouseX)/(4 - 2*overlookZoom) + width/2 - size.x/2) + mouseX;
    my = -((height/2 - mouseY)/(4 - 2*overlookZoom) + height/2 - size.y/2) + mouseY;
  }
  else {
    mx = -((width/2 - overlookedPos.x)/(4 - 2*overlookZoom) + width/2 - size.x/2) + overlookedPos.x;
    my = -((height/2 - overlookedPos.y)/(4 - 2*overlookZoom) + height/2 - size.y/2) + overlookedPos.y;
  }

  if (!overlooked) {
    translate((width/2 - mouseX)/(4 - 2*overlookZoom), (height/2 - mouseY)/(4 - 2*overlookZoom));
    translate(width/2 - size.x/2, height/2 - size.y/2);
  } else {
    translate((width/2 - overlookedPos.x)/(4 - 2*overlookZoom), (height/2 - overlookedPos.y)/(4 - 2*overlookZoom));
    translate(width/2, height/2);
    scale(overlookedZoom);
    translate(-size.x/2, -size.y/2);
    overlookedZoom = pow(overlookedZoom, 1.2);
  };

  noStroke();
  for (x = 0; x < game.length; x++) {
    for (y = 0; y < game[0].length; y++) {
      if (!inBounds(x, y, 0, 0, game.length, game[0].length)) {
        continue;
  	  } else if (dist(x * bSize, y * bSize, mx, my) > 8 * bSize && dist(x * bSize, y * bSize, mx, my) < 10 * bSize) {
    		let b = game[x][y];
    		fill(b.col.hue, b.col.sat / 4, b.col.bri / 4);
  	  } else {
        let b = game[x][y];
        fill(b.col.hue, b.col.sat, b.col.bri);
      }

      rect(x*bSize, y*bSize, 1.05*bSize, 1.05*bSize);
    }
  }

//   for (x = 0; x < game.length; x++) {
//     for (y = 0; y < game[0].length; y++) {
//       let b = game[x][y];
//       noStroke();
//       fill(b.col.hue, b.col.sat, b.col.bri);
    //   if (dist(x*bSize, y*bSize, mx, my) < 8*bSize) fill(b.col.hue, b.col.sat, b.col.bri);
//       else if (dist(x*bSize, y*bSize, mx, my) < 10*bSize) fill(b.col.hue, b.col.sat/4, b.col.bri/4);
//       rect(x*bSize, y*bSize, 1+bSize, 1+bSize);
//     }
//   }

  for (let i = 0; i < players.length; i++) {
    let p = players[i];
    if (p.username != username) {
      push();
      translate(p.x*bSize, p.y*bSize);
      stroke(0);
      strokeWeight(1*bSize);
      noFill();
      ellipse(0, 0, 5*bSize, 5*bSize);
      pop();
    }
  }

  pop();

  if (mouse.tap && !overlooked && inBounds(mx, my, 0, 0, bSize*game.length, bSize*game[0].length)) {
    overlooked = true;
    overlookedPos = createVector(mouseX, mouseY);
    overlookedZoom = 1.001;

    player = new Player(int(mx/bSize), int(my/bSize));
    camera = new Camera(player.pos);
  }

  if (overlookedZoom > 40) {
    overlookZoom = 1;
    overlooked = false;
    overlookedPos;
    overlookedZoom = 1;

    gs++;
  }
}



let welcomeReset = 90;
let welcomeCountdown = welcomeReset;
function welcomeScreen() {
  fill(100);
  textSize(width/20);
  text('Welcome to Sandboxica.', width/2, height/2);

  welcomeCountdown--;

  if (welcomeCountdown < 0) {
    // welcomeCountdown = welcomeReset;
    player.sendPos();

    gs++;
  }
}



function runGame() {
  push();

  translate(width/2, height/2);
  bSize = height/20;
  scale(bSize);

  camera.update(player.pos);
  camera.move();

  let wSize = width / bSize;
  let hSize = height / bSize;

  noStroke();
  for (x = floor(camera.pos.x - wSize/2); x < ceil(camera.pos.x + wSize/2); x++) {
  	for (y = floor(camera.pos.y - hSize/2); y < ceil(camera.pos.y + hSize/2); y++) {
  	  if (!inBounds(x, y, 0, 0, game.length, game[0].length)) {
  		    fill(backgroundColor);
  	  } else {
    		let b = game[x][y];
    		fill(b.col.hue, b.col.sat, b.col.bri);
  	  }
      rect(x, y, 1.01, 1.01);
    }
  }

  player.manage();

  for (let i = 0; i < players.length; i++) {
    let p = players[i];

    if (p.username != username && (camera.pos.x -wSize/2 - 0.5 < p.x && p.x < camera.pos.x + wSize/2 + 0.5) && (camera.pos.y - hSize/2 - 0.5 < p.y && p.y < camera.pos.y + hSize/2 + 0.5)) {
      push();
      translate(p.x, p.y);
      player.drawPlayer(p.username, p);
      pop();
    }
  }

  pop();

  player.fx.manage();
}


function drawMap() {
  push();

  translate(width/2, height/2);
  bSize = min(width, height)/(game.length*1.5);
  scale(bSize);
  translate(-game.length/2, -game[0].length/2);

  for (x = 0; x < game.length; x++) {
    for (y = 0; y < game[0].length; y++) {
      let b = game[x][y];
      noStroke();
      fill(b.col.hue, b.col.sat, b.col.bri);
      rect(x, y, 1.1, 1.1);
    }
  }

  pop();
}

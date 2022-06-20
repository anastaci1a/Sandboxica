let player;
class Player {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.spd = 0.1;
    this.fx = new Effects();
    this.gui = new GUI();
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    this.drawPlayer(username, this.pos);
    pop();
  }

  drawPlayer(u, p) {
    let b = this.blockOn(p);

    strokeWeight(0.1);
    stroke(0);
    if (b.properties.burn) stroke(0, 100, 100*(1+sin(frameCount/10))/2);
    if (b.properties.freeze) stroke(180, 25, 100*(1+sin(frameCount/20))/2);
    fill(0);
    ellipse(0, 0, 1, 1);

    noStroke();
    textSize(0.5);
    text(u, 0, -1);
  }

  update() {
    let dir = createVector(0, 0);
    if (keys.w) dir.add(0, -1);
    if (keys.s) dir.add(0, 1);
    if (keys.a) dir.add(-1, 0);
    if (keys.d) dir.add(1, 0);
    let acc = dir.normalize().copy().mult(this.spd);

    this.vel.add(acc).limit(this.spd);
    this.vel.mult(this.blockOn(this.pos).properties.friction);
    this.pos.add(this.vel);

    this.pos.x %= game.length;
    this.pos.y %= game[0].length;

    if (this.vel.mag() > 0) this.sendPos();

    this.fx.burn = this.blockOn(this.pos).properties.burn;
    this.fx.freeze = this.blockOn(this.pos).properties.freeze;
  }

  blockOn(_p) {
    let p = createVector(round(_p.x), round(_p.y));
    return game[p.x][p.y];
  }

  sendPos() {
    let data = {
      x: this.pos.x,
      y: this.pos.y
    }

    socket.emit('sendPos', data);
  }
}

class GUI {
  constructor() {
    this.blocks = [];
    this.mode = 0;
    this.heldBlock = null;
  }

  manage(p, m) {
    this.update(p, m);
    this.display();
  }

  update(p, m) {
    if (this.mode == 0) {
      let currBlock = null;
      if (dist(player.pos.x, player.pos.y, m.x, m.y) < 5) {
        try {
          currBlock = game[round(m.x)][round(m.y)];
        }
        catch(e) {}

        if (mouse.tap && currBlock != null) {
          if (this.blocks.length < 2) {
            this.blocks.push(currBlock);
          }
        }
      }
    }
    if (this.mode == 1) {

    }
  }

  display() {
    let h = height/15;
    textSize(h/3);


    if (this.mode == 0) {
      let bt1, bt2;

      if (this.blocks.length >= 1) {
        let bt1Text = '   ' + this.blocks[0].name + '   ';
        let bt1Pos = textWidth(bt1Text)/2
        bt1 = new Button(bt1Text, this.blocks[0].col.hue, width/2 - bt1Pos, height - 1.5*h, h);
        bt1.manage();
      }

      if (this.blocks.length == 2) {
        let bt2Text = '   ' + this.blocks[1].name + '   ';
        let bt2Pos = textWidth(bt2Text)/2 + height/20;
        bt2 = new Button(bt2Text, this.blocks[1].col.hue, width/2 + bt2Pos, height - 1.5*h, h);
        bt2.manage();

        let btClear = new Button('Clear Selection', (frameCount / 1.5) % 360, (bt1.pos.x + bt2.pos.x)/2, height - 4.25*h, h);
        btClear.manage();
        if (btClear.click) { this.blocks = []; }

        let btCombine = new Button('Combine Blocks', (frameCount / 1.5) % 360, (bt1.pos.x + bt2.pos.x)/2, height - 3*h, h);
        btCombine.manage();
        if (btCombine.click) {
          gs = GameStates.COMBINE;
        }
      }
    }

    if (this.mode == 1) {

    }
  }
}


let camera;
class Camera {
  constructor(pos) {
    this.tpos = pos;
    this.pos = createVector(game.length/2, game[0].length/2);
  }

  update(tpos) {
    this.tpos = tpos;
    this.pos.add(this.tpos.copy().sub(this.pos).div(20));
  }

  move() {
    translate(-this.pos.x, -this.pos.y);
  }
}


class Effects {
  constructor() {
    this.burn = false;
    this.pburn = false;
    this.burnCount = 0;
    this.freeze = false;
    this.pfreeze = false;
    this.freezeCount = 0;
  }

  manage() {
    this.update();
    this.display();
  }

  update() {
    if (this.burn && !this.pburn && this.burnCount <= 0) this.burnCount = 0;
    if (!this.burn && this.pburn && this.burnCount >= 100) this.burnCount = 100;
    if (this.burn) this.burnCount++;
    else this.burnCount--;

    if (this.freeze && !this.pfreeze && this.freezeCount <= 0) this.freezeCount = 0;
    if (!this.freeze && this.pfreeze && this.freezeCount >= 100) this.freezeCount = 100;
    if (this.freeze) this.freezeCount++;
    else this.freezeCount--;

    this.pburn = this.burn;
    this.pfreeze = this.freeze;
  }

  display() {
    rectMode(CORNER);
    noStroke();

    //burn
    fill(21, 100, 73, constrain(this.burnCount, 0, 100));
    rect(0, 0, width, height);

    //freeze
    fill(180, 25, 100, constrain(this.freezeCount, 0, 100));
    rect(0, 0, width, height);

    rectMode(CENTER);
  }
}

let player;
class Player {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.spd = 0.1;
    this.fx = new Effects();
  }

  manage() {
    this.update();
    this.display();
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    this.drawPlayer(username);
    pop();
  }

  drawPlayer(u, p) {
    strokeWeight(0.1);
    stroke(0);
    if (this.blockOn().properties.burn) stroke(0, 100, 100*(1+sin(frameCount/10))/2);
    if (this.blockOn().properties.freeze) stroke(180, 25, 100*(1+sin(frameCount/20))/2);
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
    this.vel.mult(this.blockOn().properties.friction);
    this.pos.add(this.vel);

    this.pos.x %= game.length;
    this.pos.y %= game[0].length;

    if (dir.mag() > 0) this.sendPos();

    this.fx.burn = this.blockOn().properties.burn;
    this.fx.freeze = this.blockOn().properties.freeze;
  }

  blockOn() {
    let p = createVector(round(this.pos.x), round(this.pos.y));
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

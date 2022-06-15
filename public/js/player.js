let player;
class Player {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.spd = 0.1;
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

  drawPlayer(u) {
    fill(0);
    textSize(0.5);
    text(u, 0, -1);
    ellipse(0, 0, 1, 1);
  }

  update() {
    let dir = createVector(0, 0);
    if (keys.w) dir.add(0, -1);
    if (keys.s) dir.add(0, 1);
    if (keys.a) dir.add(-1, 0);
    if (keys.d) dir.add(1, 0);
    this.pos.add(dir.normalize().copy().mult(this.spd));

    if (dir.mag() > 0) this.sendPos();
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

let mouse;

function setupMouse() {
  mouse = new Mouse();
}

class Mouse {
  constructor() {
    this.pressed = false;
    this.ppressed = false;
    this.tap = false;
    this.released = false;
    this.wheel = false;
    this.pwheel = false;
  }

  update() {
    this.pressed = mouseIsPressed;
    this.tap = this.pressed && !this.ppressed;
    this.released = !this.pressed && this.ppressed;
    this.ppressed = mouseIsPressed;
    this.pwheel = this.wheel;
    this.wheel = 0;
  }
}

function mouseWheel(event) {
  mouse.wheel = event.delta/abs(event.delta);
}

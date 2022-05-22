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
  }

  update() {
    this.pressed = mouseIsPressed;
    this.tap = this.pressed && !this.ppressed;
    this.released = !this.pressed && this.ppressed;
    this.ppressed = mouseIsPressed;
  }
}

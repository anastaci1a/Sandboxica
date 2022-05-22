class Button {
  constructor(text, x, y, h) {
    this.text = text;
    this.pos = createVector(x, y);

    this.h = h;
    this.textSize = this.h/3;
    textSize(this.textSize);
    this.w = textWidth(this.text) + this.h/2;

    this.hover = false;
    this.click = false;
    this.pressed = false;
    this.released = false;
  }

  manage() {
    this.update();
    this.display();
  }

  update() {
    this.hover = inBounds(mouseX, mouseY, this.pos.x - this.w/2, this.pos.y - this.h/2, this.pos.x + this.w/2, this.pos.y + this.h/2);
    this.click = this.hover && mouse.tap
    this.pressed = this.hover && mouse.pressed;
    this.released = this.hover && mouse.released
  }

  display() {
    if (this.hover && !this.pressed) {
      fill(0, 0, 80);
      stroke(0);
      strokeWeight(this.h/20);
    } else if (this.pressed) {
      fill(0, 0, 70);
      stroke(0);
      strokeWeight(this.h/20);
    } else {
      fill(0, 0, 80);
      stroke(0);
      strokeWeight(this.h/30);
    }

    rect(this.pos.x, this.pos.y, this.w, this.h, 20);

    fill(0);
    noStroke();
    textSize(this.textSize);
    text(this.text, this.pos.x, this.pos.y);
  }
}

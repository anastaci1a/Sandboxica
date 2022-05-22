class Button {
  Button(text, x, y, w, h) {
    this.text = text;
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
  }

  display() {
    fill(0);
    rect(this.pos.x, this.pos.y, this.w, this.h);
  }
}

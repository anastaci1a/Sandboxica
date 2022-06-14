function setupInput() {
  setupKeys();
  setupMouse();
}

let keys;
function setupKeys() {
  keys = new Keyboard();
}

class Keyboard {
  constructor() {
    this.a = false;
    this.b = false;
    this.c = false;
    this.d = false;
    this.e = false;
    this.f = false;
    this.g = false;
    this.h = false;
    this.i = false;
    this.j = false;
    this.k = false;
    this.l = false;
    this.m = false;
    this.n = false;
    this.o = false;
    this.p = false;
    this.q = false;
    this.r = false;
    this.s = false;
    this.t = false;
    this.u = false;
    this.v = false;
    this.w = false;
    this.x = false;
    this.y = false;
    this.z = false;
    this.space = false;
  }

  update() {
  }

  keyManage(Key) {
    switch(key) {
      case 'a':
        return this.a = Key;
      case 'A':
        return this.a = Key;
      case 'b':
        return this.b = Key;
      case 'B':
        return this.b = Key;
      case 'c':
        return this.c = Key;
      case 'C':
        return this.c = Key;
      case 'd':
        return this.d = Key;
      case 'D':
        return this.d = Key;
      case 'e':
        return this.e = Key;
      case 'E':
        return this.e = Key;
      case 'f':
        return this.f = Key;
      case 'F':
        return this.f = Key;
      case 'g':
        return this.g = Key;
      case 'G':
        return this.g = Key;
      case 'h':
        return this.h = Key;
      case 'H':
        return this.h = Key;
      case 'i':
        return this.i = Key;
      case 'I':
        return this.i = Key;
      case 'j':
        return this.j = Key;
      case 'J':
        return this.j = Key;
      case 'k':
        return this.k = Key;
      case 'K':
        return this.k = Key;
      case 'l':
        return this.l = Key;
      case 'L':
        return this.l = Key;
      case 'm':
        return this.m = Key;
      case 'M':
        return this.m = Key;
      case 'n':
        return this.n = Key;
      case 'N':
        return this.n = Key;
      case 'o':
        return this.o = Key;
      case 'O':
        return this.o = Key;
      case 'p':
        return this.p = Key;
      case 'P':
        return this.p = Key;
      case 'q':
        return this.q = Key;
      case 'Q':
        return this.q = Key;
      case 'r':
        return this.r = Key;
      case 'R':
        return this.r = Key;
      case 's':
        return this.s = Key;
      case 'S':
        return this.s = Key;
      case 't':
        return this.t = Key;
      case 'T':
        return this.t = Key;
      case 'u':
        return this.u = Key;
      case 'U':
        return this.u = Key;
      case 'v':
        return this.v = Key;
      case 'V':
        return this.v = Key;
      case 'w':
        return this.w = Key;
      case 'W':
        return this.w = Key;
      case 'x':
        return this.x = Key;
      case 'X':
        return this.x = Key;
      case 'y':
        return this.y = Key;
      case 'Y':
        return this.y = Key;
      case 'z':
        return this.z = Key;
      case 'Z':
        return this.z = Key;
      case ' ':
        return this.space = Key;
      default:
        return Key;
    }
  }

  keyCodeManage(Key) {}
}

function keyPressed() {
  keys.keyManage(true);
  keys.keyCodeManage(true);
}
function keyReleased() {
  keys.keyManage(false);
  keys.keyCodeManage(false);
}






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

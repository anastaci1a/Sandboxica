function inBounds(x, y, x1, y1, x2, y2) {
  return (x1 < x && x < x2) && (y1 < y && y < y2);
}

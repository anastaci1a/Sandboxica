function inBounds(x, y, x1, y1, x2, y2) {
  return (x1 < x && x < x2) && (y1 < y && y < y2);
}

function constrainAdd(val, add, min, max) {
  val += add;
  if (val > max) val = min;
  if (val < min) val = max;
  return val;
}

function truncateDecimal(n, val) {
  return floor(val*n)/n;
}

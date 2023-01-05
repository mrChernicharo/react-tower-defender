export function getGridWidth(tiles) {
  return tiles.reduce((acc, next) => next.x > acc && (acc = next.x), 0) + 1;
}

export function getGridHeight(tiles) {
  return tiles[tiles.length - 1].y;
}

export function getDistance(x1, y1, x2, y2) {
  let y = x2 - x1;
  let x = y2 - y1;

  return Math.sqrt(x * x + y * y);
}

export function rad2Deg(rad) {
  return (rad * 180) / Math.PI;
}

export function deg2Rad(deg) {
  return (deg * Math.PI) / 180;
}

export function getAngle(sx, sy, ex, ey) {
  var dy = ey - sy;
  var dx = ex - sx;
  var theta = Math.atan2(dy, dx);
  theta *= 180 / Math.PI;
  if (theta < 0) theta = 360 + theta;
  return theta;
}

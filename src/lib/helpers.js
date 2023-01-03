export function getGridWidth(tiles) {
  return tiles.reduce((acc, next) => next.x > acc && (acc = next.x), 0) + 1;
}

export function getGridHeight(tiles) {
  return tiles[tiles.length - 1].y;
}

export function getDistance(x1, y1, x2, y2){
  let y = x2 - x1;
  let x = y2 - y1;
  
  return Math.sqrt(x * x + y * y);
}
export function getGridWidth(tiles) {
  return tiles.reduce((acc, next) => next.x > acc && (acc = next.x), 0) + 1;
}

export function getGridHeight(tiles) {
  return tiles[tiles.length - 1].y;
}
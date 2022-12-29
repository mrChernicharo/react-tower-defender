export const TILE_SIZE = 100;

export const TILE_COLORS = {
  grass: "green",
  wall: "#444",
  path: "orange",
};

export const HIGHLIGHTED_TILE_COLORS = {
  grass: "rgba(30, 200, 100, 0.8)",
  wall: "rgba(106, 106, 106, 0.8)",
  path: "orange",
};

export const STAGE_MAPS = {
  0: {
    id: 0,
    name: "Rio Woods",
    tiles: [
      { id: "0:0", x: 0, y: 0, type: "wall" },
      { id: "1:0", x: 1, y: 0, type: "grass" },
      { id: "2:0", x: 2, y: 0, type: "path" },
      { id: "3:0", x: 3, y: 0, type: "grass" },
      { id: "4:0", x: 4, y: 0, type: "grass" },
      { id: "0:1", x: 0, y: 1, type: "wall" },
      { id: "1:1", x: 1, y: 1, type: "wall" },
      { id: "2:1", x: 2, y: 1, type: "grass" },
      { id: "3:1", x: 3, y: 1, type: "grass" },
      { id: "4:1", x: 4, y: 1, type: "grass" },
      { id: "0:2", x: 0, y: 2, type: "grass" },
      { id: "1:2", x: 1, y: 2, type: "grass" },
      { id: "2:2", x: 2, y: 2, type: "grass" },
      { id: "3:2", x: 3, y: 2, type: "grass" },
      { id: "4:2", x: 4, y: 2, type: "grass" },
      { id: "0:3", x: 0, y: 3, type: "grass" },
      { id: "1:3", x: 1, y: 3, type: "grass" },
      { id: "2:3", x: 2, y: 3, type: "grass" },
      { id: "3:3", x: 3, y: 3, type: "grass" },
      { id: "4:3", x: 4, y: 3, type: "grass" },
      { id: "0:4", x: 0, y: 4, type: "grass" },
      { id: "1:4", x: 1, y: 4, type: "wall" },
      { id: "2:4", x: 2, y: 4, type: "grass" },
      { id: "3:4", x: 3, y: 4, type: "grass" },
      { id: "4:4", x: 4, y: 4, type: "grass" },
      { id: "0:5", x: 0, y: 5, type: "grass" },
      { id: "1:5", x: 1, y: 5, type: "wall" },
      { id: "2:5", x: 2, y: 5, type: "grass" },
      { id: "3:5", x: 3, y: 5, type: "grass" },
      { id: "4:5", x: 4, y: 5, type: "grass" },
      { id: "0:6", x: 0, y: 6, type: "grass" },
      { id: "1:6", x: 1, y: 6, type: "grass" },
      { id: "2:6", x: 2, y: 6, type: "grass" },
      { id: "3:6", x: 3, y: 6, type: "wall" },
      { id: "4:6", x: 4, y: 6, type: "grass" },
      { id: "0:7", x: 0, y: 7, type: "grass" },
      { id: "1:7", x: 1, y: 7, type: "grass" },
      { id: "2:7", x: 2, y: 7, type: "grass" },
      { id: "3:7", x: 3, y: 7, type: "grass" },
      { id: "4:7", x: 4, y: 7, type: "grass" },
      { id: "0:8", x: 0, y: 8, type: "wall" },
      { id: "1:8", x: 1, y: 8, type: "grass" },
      { id: "2:8", x: 2, y: 8, type: "grass" },
      { id: "3:8", x: 3, y: 8, type: "grass" },
      { id: "4:8", x: 4, y: 8, type: "wall" },
      { id: "0:9", x: 0, y: 9, type: "wall" },
      { id: "1:9", x: 1, y: 9, type: "wall" },
      { id: "2:9", x: 2, y: 9, type: "grass" },
      { id: "3:9", x: 3, y: 9, type: "grass" },
      { id: "4:9", x: 4, y: 9, type: "grass" },
    ],
  },
};

export const towerIcons = [
  {
    id: 1,
    name: "fire",
    tx: 0,
    ty: -75,
    fill: "red",
  },
  {
    id: 2,
    name: "lightning",
    tx: 75,
    ty: 0,
    fill: "yellow",
  },
  {
    id: 3,
    name: "ice",
    tx: -75,
    ty: 0,
    fill: "blue",
  },
  {
    id: 4,
    name: "earth",
    tx: 0,
    ty: 75,
    fill: "brown",
  },
];


  // const [enemies, setEnemies] = useState([
  //   { r: 20, x: 250, movement: 8, color: "red" },
  //   { r: 16, x: 100, movement: 12, color: "green" },
  //   { r: 18, x: 400, movement: 10, color: "blue" },
  // ]);
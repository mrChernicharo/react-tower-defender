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

export const initialGold = 300;

export const STAGE_MAPS = {
  0: {
    id: 0,
    name: "Ridge Narrows",
    waveCount: 8,
    tiles: [
      { id: "0:0", x: 0, y: 0, type: "grass" },
      {
        id: "1:0",
        x: 1,
        y: 0,
        type: "path",
        startingPoint: true,
        exits: {
          left: { x: 1.25, y: 0 },
          center: { x: 1.5, y: 0 },
          right: { x: 1.75, y: 0 },
        },
      },
      { id: "2:0", x: 2, y: 0, type: "grass" },
      { id: "3:0", x: 3, y: 0, type: "grass" },
      { id: "0:1", x: 0, y: 1, type: "grass" },
      { id: "1:1", x: 1, y: 1, type: "grass" },
      { id: "2:1", x: 2, y: 1, type: "grass" },
      { id: "3:1", x: 3, y: 1, type: "grass" },
      { id: "0:2", x: 0, y: 2, type: "grass" },
      { id: "1:2", x: 1, y: 2, type: "wall" },
      { id: "2:2", x: 2, y: 2, type: "grass" },
      { id: "3:2", x: 3, y: 2, type: "grass" },
      { id: "0:3", x: 0, y: 3, type: "grass" },
      { id: "1:3", x: 1, y: 3, type: "grass" },
      { id: "2:3", x: 2, y: 3, type: "grass" },
      { id: "3:3", x: 3, y: 3, type: "wall" },
      { id: "0:4", x: 0, y: 4, type: "grass" },
      { id: "1:4", x: 1, y: 4, type: "grass" },
      { id: "2:4", x: 2, y: 4, type: "wall" },
      { id: "3:4", x: 3, y: 4, type: "grass" },
      { id: "0:5", x: 0, y: 5, type: "grass" },
      { id: "1:5", x: 1, y: 5, type: "grass" },
      { id: "2:5", x: 2, y: 5, type: "wall" },
      { id: "3:5", x: 3, y: 5, type: "grass" },
      { id: "0:6", x: 0, y: 6, type: "grass" },
      { id: "1:6", x: 1, y: 6, type: "grass" },
      { id: "2:6", x: 2, y: 6, type: "grass" },
      { id: "3:6", x: 3, y: 6, type: "grass" },
      { id: "0:7", x: 0, y: 7, type: "grass" },
      { id: "1:7", x: 1, y: 7, type: "grass" },
      { id: "2:7", x: 2, y: 7, type: "grass" },
      { id: "3:7", x: 3, y: 7, type: "grass" },
      { id: "0:8", x: 0, y: 8, type: "grass" },
      { id: "1:8", x: 1, y: 8, type: "grass" },
      { id: "2:8", x: 2, y: 8, type: "grass" },
      { id: "3:8", x: 3, y: 8, type: "grass" },
      { id: "0:9", x: 0, y: 9, type: "grass" },
      { id: "1:9", x: 1, y: 9, type: "wall" },
      { id: "2:9", x: 2, y: 9, type: "wall" },
      { id: "3:9", x: 3, y: 9, type: "grass" },
      { id: "0:10", x: 0, y: 10, type: "grass" },
      { id: "1:10", x: 1, y: 10, type: "grass" },
      { id: "2:10", x: 2, y: 10, type: "grass" },
      { id: "3:10", x: 3, y: 10, type: "grass" },
    ],
  },
  1: {
    id: 1,
    name: "Rio Woods",
    waveCount: 6,
    tiles: [
      { id: "0:0", x: 0, y: 0, type: "wall" },
      { id: "1:0", x: 1, y: 0, type: "grass" },
      {
        id: "2:0",
        x: 2,
        y: 0,
        type: "path",
        startingPoint: true,
        exits: {
          left: { x: 2.25, y: 0 },
          center: { x: 2.5, y: 0 },
          right: { x: 2.75, y: 0 },
        },
      },
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
      { id: "0:10", x: 0, y: 10, type: "wall" },
      { id: "1:10", x: 1, y: 10, type: "wall" },
      { id: "2:10", x: 2, y: 10, type: "grass" },
      { id: "3:10", x: 3, y: 10, type: "grass" },
      { id: "4:10", x: 4, y: 10, type: "grass" },
    ],
  },
  2: {
    id: 2,
    name: "Lavender Hills",
    waveCount: 7,
    tiles: [
      { id: "0:0", x: 0, y: 0, type: "grass" },
      { id: "1:0", x: 1, y: 0, type: "grass" },
      { id: "2:0", x: 2, y: 0, type: "grass" },
      { id: "3:0", x: 3, y: 0, type: "grass" },
      {
        id: "4:0",
        x: 4,
        y: 0,
        type: "path",
        startingPoint: true,
        exits: {
          left: { x: 4.25, y: 0 },
          center: { x: 4.5, y: 0 },
          right: { x: 4.75, y: 0 },
        },
      },
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
      { id: "0:10", x: 0, y: 10, type: "grass" },
      { id: "1:10", x: 1, y: 10, type: "wall" },
      { id: "2:10", x: 2, y: 10, type: "grass" },
      { id: "3:10", x: 3, y: 10, type: "grass" },
      { id: "4:10", x: 4, y: 10, type: "wall" },
    ],
  },
};

export const ENEMY_WAVES =  [
  {
    name: "goblin",
    lane: "left",
    delay: 0,
  },
  {
    name: "orc",
    lane: "right",
    delay: 4,
  },
  {
    name: "goblin",
    lane: "left",
    delay: 4,
  },
  {
    name: "troll",
    lane: "center",
    delay: 8,
  },
  {
    name: "orc",
    lane: "right",
    delay: 8,
  },
  {
    name: "goblin",
    lane: "left",
    delay: 8,
  },
  {
    name: "goblin",
    lane: "right",
    delay: 12,
  },
  {
    name: "goblin",
    lane: "center",
    delay: 12,
  },
  {
    name: "orc",
    lane: "center",
    delay: 16,
  },
  {
    name: "orc",
    lane: "right",
    delay: 20,
  },
  {
    name: "goblin",
    lane: "left",
    delay: 20,
  },
  {
    name: "goblin",
    lane: "right",
    delay: 24,
  },
  {
    name: "goblin",
    lane: "right",
    delay: 24,
  },
]

// console.log(
//   JSON.stringify(Object.keys(STAGE_MAPS).map((k) => ({
//     ...STAGE_MAPS[k],
//     tiles: STAGE_MAPS[k].tiles.map((t) => ({
//       ...t,
//       x: t.x * TILE_SIZE,
//       y: t.y * TILE_SIZE,
//     })),
//   })))
// );

export const TOWERS = {
  fire: {
    name: "fire",
    damage: 10,
    range: 140,
    rate_of_fire: 6,
    bullet_speed: 100,
    xp: 0,
    fill: "red",
    price: 100,
  },
  ice: {
    name: "ice",
    damage: 40,
    range: 250,
    rate_of_fire: 2,
    bullet_speed: 100,
    xp: 0,
    fill: "blue",
    price: 80,
  },
  lightning: {
    name: "lightning",
    damage: 60,
    range: 200,
    bullet_speed: 300,
    rate_of_fire: 1,
    xp: 0,
    fill: "yellow",
    price: 120,
  },
  earth: {
    name: "earth",
    damage: 30,
    range: 180,
    bullet_speed: 75,
    rate_of_fire: 4,
    xp: 0,
    fill: "brown",
    price: 100,
  },
};

export const ENEMIES = {
  goblin: {
    name: "goblin",
    speed: 10,
    hp: 100,
    gold: 4,
    fill: "forestgreen",
    size: 5,
  },
  orc: {
    name: "orc",
    speed: 8,
    hp: 200,
    gold: 7,
    fill: "darkgreen",
    size: 7,
  },
  troll: {
    name: "troll",
    speed: 5,
    hp: 500,
    gold: 20,
    fill: "#041",
    size: 10,
  },
};

export const towerIcons = [
  {
    id: 1,
    name: "fire",
    tx: 0,
    ty: -75,
    fill: "red",
    towerInfo: TOWERS['fire']
  },
  {
    id: 2,
    name: "lightning",
    tx: 75,
    ty: 0,
    fill: "yellow",
    towerInfo: TOWERS['lightning']
  },
  {
    id: 3,
    name: "ice",
    tx: -75,
    ty: 0,
    fill: "blue",
    towerInfo: TOWERS['ice']
  },
  {
    id: 4,
    name: "earth",
    tx: 0,
    ty: 75,
    fill: "brown",
    towerInfo: TOWERS['earth']
  },
];

export const pathIcons = [
  {
    id: 1,
    name: "top",
    tx: 0,
    ty: -75,
    fill: "white",
    icon: "⬆",
  },
  {
    id: 2,
    name: "right",
    tx: 75,
    ty: 0,
    fill: "white",
    icon: "➡",
  },
  {
    id: 3,
    name: "bottom",
    tx: 0,
    ty: 75,
    fill: "white",
    icon: "⬇",
  },
  {
    id: 4,
    name: "left",
    tx: -75,
    ty: 0,
    fill: "white",
    icon: "⬅",
  },
];

// const [enemies, setEnemies] = useState([
//   { r: 20, x: 250, movement: 8, color: "red" },
//   { r: 16, x: 100, movement: 12, color: "green" },
//   { r: 18, x: 400, movement: 10, color: "blue" },
// ]);

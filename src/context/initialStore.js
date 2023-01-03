import { initialGold, STAGE_MAPS } from "../lib/constants";

export const initialStore = {
  stageNumber: 0,
  waveNumber: 0,
  waveNumber: null,
  stages: STAGE_MAPS,
  towers: [],
  enemies: [],
  tileChain: STAGE_MAPS[0].tiles.filter((t) => t.startingPoint),
  gold: initialGold,
  inBattle: false,
  isPlaying: false,
  gameSpeed: 1,
  selectedTileId: null,
};

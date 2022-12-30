import { useStore } from "./context/createFastContext";
import { useTile } from "./hooks/useTile";
import { STAGE_MAPS } from "./lib/constants";

export function GameHeader({
  clock,
  playing,
  speed,
  pause,
  play,
  toggleSpeed,
}) {
  const { selectedTileId } = useTile();
  const [currentWave] = useStore((store) => store.currentWave);
  const [stageNumber, setStore] = useStore((store) => store.stageNumber);
  const [path] = useStore((store) => store.path);
  const [gold] = useStore((store) => store.gold);
  function handleChangeStage() {
    const nextStage =
      stageNumber === Object.keys(STAGE_MAPS).length - 1 ? 0 : stageNumber + 1;

    // reset tiles and currentWave
    setStore({
      currentWave: null,
      stageNumber: nextStage,
      stages: STAGE_MAPS,
      towers: [],
      path: STAGE_MAPS[nextStage].tiles.filter((t) => t.startingPoint),
      gold: 500,
    });
  }
  return (
    <div className="border sticky top-0 bg-gray-700">
      <div
        className="grid grid-cols-4"
        data-name="game-header"
        id="game-header"
      >
        <div>
          <div>{clock.toFixed(1)}</div>
          <div>{playing ? "Playing" : "Paused"}</div>
        </div>
        <div>
          <button className="btn" onClick={() => play()}>
            Play
          </button>
          <button className="btn" onClick={() => pause()}>
            Pause
          </button>
        </div>
        <div>
          <div>{speed} X</div>
          <button className="btn" onClick={() => toggleSpeed()}>
            Toggle Speed
          </button>
        </div>
        <div>Gold {gold}</div>
      </div>
      <div className="grid grid-cols-3">
        <div>
          <div>Selected Tile: {selectedTileId}</div>
          <div>Wave: {currentWave}</div>
          {/* <div>yPos: {circleY.toFixed(1)}</div> */}
        </div>
        <div>
          <div>Stage : {stageNumber}</div>
          <button className="btn" onClick={handleChangeStage}>
            Change Stage
          </button>
        </div>
        <div>Path: {JSON.stringify(path.map((p) => p.id))}</div>
      </div>
    </div>
  );
}

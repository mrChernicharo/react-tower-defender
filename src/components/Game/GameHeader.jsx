import { useStore } from "../../context/createFastContext";
import { useClick } from "../../hooks/useClick";
import { STAGE_MAPS, initialGold } from "../../lib/constants";

export function GameHeader({
  clock,
  playing,
  speed,
  pause,
  play,
  toggleSpeed,
}) {
  const { selectedTileId } = useClick();
  const [currentWave] = useStore((store) => store.currentWave);
  const [stageNumber, setStore] = useStore((store) => store.stageNumber);
  const tileChain = useStore((store) => store.tileChain);
  const [gold] = useStore((store) => store.gold);
  function handleChangeStage() {
    const nextStage =
      stageNumber === Object.keys(STAGE_MAPS).length - 1 ? 0 : stageNumber + 1;

    // reset tiles and currentWave
    setStore({
      currentWave: null,
      stageNumber: nextStage,
      stages: STAGE_MAPS,
      enemies: [],
      towers: [],
      tileChain: STAGE_MAPS[nextStage].tiles.filter((t) => t.startingPoint),
      gold: initialGold,
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
        <div>
          tileChain{" "}
          {JSON.stringify(
            tileChain.map((p) => p.id),
            null,
            2
          )}
        </div>
      </div>
    </div>
  );
}

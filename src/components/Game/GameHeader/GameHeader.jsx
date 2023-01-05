import { useStore } from "../../../context/createFastContext";
import { STAGE_MAPS, initialGold } from "../../../lib/constants";

export function GameHeader({ clock, pause, play, toggleSpeed }) {
  const [selectedTileId] = useStore((store) => store.selectedTileId);
  const [isPlaying] = useStore((store) => store.isPlaying);
  const [gameSpeed] = useStore((store) => store.gameSpeed);
  const [waveNumber] = useStore((store) => store.waveNumber);
  const [stageNumber, setStore] = useStore((store) => store.stageNumber);
  const [tileChain] = useStore((store) => store.tileChain);
  const [gold] = useStore((store) => store.gold);
  const [inBattle] = useStore((store) => store.inBattle);

  function handleChangeStage() {
    const nextStage =
      stageNumber === Object.keys(STAGE_MAPS).length - 1 ? 0 : stageNumber + 1;

    // RESET reset store
    setStore({
      waveNumber: null,
      stageNumber: nextStage,
      stages: STAGE_MAPS,
      enemies: [],
      towers: [],
      // shots: [],
      tileChain: STAGE_MAPS[nextStage].tiles
        .filter((t) => t.startingPoint)
        .map((t) => {
          // no tile should be connected when starting a new stage
          if (t.connected) delete t.connected;
          return t;
        }),
      gold: initialGold,
      inBattle: false,
      selectedTileId: null,
    });
  }

  return (
    <div className="border sticky top-0 bg-gray-700">
      <div className="grid grid-cols-4">
        <div>Gold {gold}</div>
        <div>inBattle {inBattle.toString()}</div>
        <div>Gold {gold}</div>
        <div>Gold {gold}</div>
      </div>

      <div
        id="game-header"
        data-name="game-header"
        className="grid grid-cols-3"
      >
        <div>
          <div>{clock.toFixed(1)}</div>
          <div>{isPlaying ? "Playing" : "Paused"}</div>
        </div>
        <div>
          <button
            className="btn"
            style={{ opacity: inBattle ? 1 : 0.5 }}
            disabled={!inBattle}
            onClick={() => play()}
          >
            Play
          </button>
          <button className="btn" onClick={() => pause()}>
            Pause
          </button>
        </div>
        <div>
          <div>{gameSpeed} X</div>
          <button className="btn" onClick={() => toggleSpeed()}>
            Toggle Speed
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div>
          <div>Selected Tile: {selectedTileId}</div>
          <div>Wave: {waveNumber}</div>
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

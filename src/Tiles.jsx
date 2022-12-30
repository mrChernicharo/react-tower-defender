import { useStore } from "./context/createFastContext";
import { useTile } from "./hooks/useTile";
import {
  HIGHLIGHTED_TILE_COLORS,
  STAGE_MAPS,
  TILE_COLORS,
  TILE_SIZE,
} from "./lib/constants";
import { getGridHeight, getGridWidth } from "./lib/helpers";
const pathIcon = "⛏";

export default function Tiles() {
  const { selectedTileId } = useTile();

  const [stageNumber] = useStore((store) => store.stageNumber);
  const [currentWave] = useStore((store) => store.currentWave);
  const [towers] = useStore((store) => store.towers);
  const [tiles] = useStore((store) => store.stages[stageNumber].tiles);
  const [waveCount] = useStore((store) => store.stages[stageNumber].waveCount);

  const gridWidth = getGridWidth(tiles);
  const gridHeight = getGridHeight(tiles);

  const firstWaveRow = gridHeight - waveCount;

  // console.log({ gridWidth, gridHeight, waveCount, firstWaveRow, currentWave });
  console.log(tiles);

  return (
    <>
      {tiles.map(
        ({ id, x, y, type, startingPoint = false, enemyEntrance = false }) => (
          <g key={`tile-${id}`}>
            <rect
              className="tile"
              id={id}
              data-name={`tile-${id}`}
              fill={
                selectedTileId === id
                  ? HIGHLIGHTED_TILE_COLORS[type]
                  : TILE_COLORS[type]
              }
              stroke="#fff"
              x={x * TILE_SIZE + 50}
              y={y * TILE_SIZE + 50}
              width={TILE_SIZE}
              height={TILE_SIZE}
              opacity={y > firstWaveRow + currentWave ? 0.3 : 1}
            />
            {startingPoint ? (
              <rect
                width={TILE_SIZE / 2}
                height={10}
                fill="red"
                x={x * TILE_SIZE + 74}
                y={y * TILE_SIZE + 50}
              />
            ) : null}
            {enemyEntrance ? (
              <rect
                width={TILE_SIZE / 2}
                height={20}
                fill="green"
                x={x * TILE_SIZE + 174}
                y={y * TILE_SIZE + 150}
              />
            ) : null}
            {/* {type === "path" ? (
            <text fontSize={32} x={x * TILE_SIZE + 85} y={y * TILE_SIZE + 110}>
              {pathIcon}
            </text>
          ) : null} */}
          </g>
        )
      )}

      <g>
        {towers.map((tower) => (
          <circle
            key={tower.tileId}
            id={`${tower.tileId}::${tower.name}`}
            className="tower"
            cx={tower.x}
            cy={tower.y}
            r={20}
            fill={tower.fill}
          />
        ))}
      </g>
    </>
  );
}

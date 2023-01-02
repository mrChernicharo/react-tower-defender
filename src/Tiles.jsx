import { useStore } from "./context/createFastContext";
import { useClick } from "./hooks/useClick";
import {
  HIGHLIGHTED_TILE_COLORS,
  STAGE_MAPS,
  TILE_COLORS,
  TILE_SIZE,
} from "./lib/constants";
import { getGridHeight, getGridWidth } from "./lib/helpers";
const pathIcon = "⛏";

export default function Tiles() {
  const { selectedTileId } = useClick();

  const [stageNumber] = useStore((store) => store.stageNumber);
  const [currentWave] = useStore((store) => store.currentWave);
  const [towers] = useStore((store) => store.towers);
  const [path] = useStore((store) => store.path);
  const [tiles] = useStore((store) => store.stages[stageNumber].tiles);
  const [waveCount] = useStore((store) => store.stages[stageNumber].waveCount);

  const gridWidth = getGridWidth(tiles);
  const gridHeight = getGridHeight(tiles);

  const firstWaveRow = gridHeight - waveCount;

  // console.log({ gridWidth, gridHeight, waveCount, firstWaveRow, currentWave });
  // console.log(tiles);

  return (
    <>
      {tiles.map(
        ({
          id,
          x,
          y,
          type,
          startingPoint = false,
          enemyEntrance = false,
          exits = null,
        }) => {
          exits && console.log(exits);
          return (
            <g key={`tile-${id}`} transform="translate(50,50)">
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
                x={x * TILE_SIZE}
                y={y * TILE_SIZE}
                width={TILE_SIZE}
                height={TILE_SIZE}
                opacity={y > firstWaveRow + currentWave ? 0.3 : 1}
              />

              {startingPoint ? (
                <rect
                  width={TILE_SIZE / 2}
                  height={10}
                  fill="red"
                  x={x * TILE_SIZE + 24}
                  y={y * TILE_SIZE}
                />
              ) : null}
              {enemyEntrance ? (
                <rect
                  width={TILE_SIZE / 2}
                  height={20}
                  fill="white"
                  x={x * TILE_SIZE + TILE_SIZE * 0.25}
                  y={y * TILE_SIZE + TILE_SIZE * 0.375}
                />
              ) : null}
              {/* {exits
                ? Object.keys(exits).map((k) => (
                    <circle
                      key={`${exits[k].x}:${exits[k].y}`}
                      r={6}
                      cx={exits[k].x * TILE_SIZE}
                      cy={exits[k].y * TILE_SIZE}
                      fill="#ddd"
                    />
                  ))
                : null} */}
              {/* {type === "path" ? (
            <text fontSize={32} x={x * TILE_SIZE + 85} y={y * TILE_SIZE + 110}>
              {pathIcon}
            </text>
          ) : null} */}
            </g>
          );
        }
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

      {/* TILE EXITS */}
      <g transform="translate(50,50)">
        {path.map((tile) => {
          const { id, exits } = tile;
          return (
            <g key={id}>
              {Object.keys(exits).map((k) => (
                <circle
                  key={`${exits[k].x}:${exits[k].y}`}
                  r={6}
                  cx={exits[k].x * TILE_SIZE}
                  cy={exits[k].y * TILE_SIZE}
                  fill="#ddd"
                />
              ))}
            </g>
          );
        })}
      </g>
    </>
  );
}

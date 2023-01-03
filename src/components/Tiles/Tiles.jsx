import { useStore } from "../../context/createFastContext";
import {
  HIGHLIGHTED_TILE_COLORS,
  STAGE_MAPS,
  TILE_COLORS,
  TILE_SIZE,
} from "../../lib/constants";
import { getGridHeight, getGridWidth } from "../../lib/helpers";
import Tower from "../Tower/Tower";
const pathIcon = "⛏";

export default function Tiles() {
  const [selectedTileId] = useStore((store) => store.selectedTileId);

  const [stageNumber] = useStore((store) => store.stageNumber);
  const [waveNumber] = useStore((store) => store.waveNumber);
  const [towers] = useStore((store) => store.towers);
  // const [tileChain] = useStore((store) => store.tileChain);
  const [tiles] = useStore((store) => store.stages[stageNumber].tiles);
  const [waveCount] = useStore((store) => store.stages[stageNumber].waveCount);

  const gridWidth = getGridWidth(tiles);
  const gridHeight = getGridHeight(tiles);

  const firstWaveRow = gridHeight - waveCount;

  // console.log({ gridWidth, gridHeight, waveCount, firstWaveRow, waveNumber });
  // console.log(tiles);

  return (
    <>
      {tiles.map(
        ({ id, x, y, type, startingPoint = false, enemyEntrance = false }) => {
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
                opacity={y > firstWaveRow + waveNumber ? 0.3 : 1}
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
        {towers.map((tower, i) => (
          <g key={`${tower.tileId}::${tower.name}`}>
            <Tower tower={tower} />
          </g>
        ))}
      </g>
    </>
  );
}

import { useStore } from "./App";
import createFastContext from "./context/createFastContext";
// import { useStageMaps } from "./hooks/useStageMaps";
import { useTile } from "./hooks/useTile";
import {
  HIGHLIGHTED_TILE_COLORS,
  STAGE_MAPS,
  TILE_COLORS,
  TILE_SIZE,
} from "./lib/constants";
const pathIcon = "⛏";

export default function Tiles() {
  const { selectedTileId } = useTile();

  const [stages] = useStore((store) => store.stages);
  const [stageNumber] = useStore((store) => store.stageNumber);

  return (
    <>
      {stages[stageNumber].tiles.map(({ id, x, y, type }) => (
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
          />
          {/* {type === "path" ? (
            <text fontSize={32} x={x * TILE_SIZE + 85} y={y * TILE_SIZE + 110}>
              {pathIcon}
            </text>
          ) : null} */}
        </g>
      ))}
    </>
  );
}

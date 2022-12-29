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

  return (
    <>
      {STAGE_MAPS[0].tiles.map(({ id, x, y, type }) => (
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
          {type === "path" ? (
            <text fontSize={32} x={x * TILE_SIZE + 85} y={y * TILE_SIZE + 110}>
              {pathIcon}
            </text>
          ) : null}
        </g>
      ))}
    </>
  );
}

import { useTile } from "./hooks/useTile";
import {
  STAGE_MAPS,
  TILE_COLORS,
  TILE_SIZE,
  towerIcons,
} from "./lib/constants";

export default function TowerSelect() {
  const { selectedTileId } = useTile();

  return (
    <>
      {STAGE_MAPS[0].tiles
        .filter((tile) => selectedTileId === tile.id)
        .map(({ id, x, y, type }) => (
          <g key={`tower-select-${id}`}>
            <circle
              data-name={`tower-select-outer`}
              r={80}
              cx={x * TILE_SIZE + 50 + TILE_SIZE / 2}
              cy={y * TILE_SIZE + 50 + TILE_SIZE / 2}
              opacity={0.5}
            />
            <circle
              data-name={`tower-select-inner`}
              fill={TILE_COLORS[type]}
              r={45}
              cx={x * TILE_SIZE + 50 + TILE_SIZE / 2}
              cy={y * TILE_SIZE + 50 + TILE_SIZE / 2}
            />

            {towerIcons.map(({ id, name, tx, ty, fill }) => (
              <circle
                key={id}
                data-name={`${name}-tower-icon`}
                cx={x * TILE_SIZE + 50 + TILE_SIZE / 2 + tx}
                cy={y * TILE_SIZE + 50 + TILE_SIZE / 2 + ty}
                fill={fill}
                r={25}
              />
            ))}
          </g>
        ))}
    </>
  );
}

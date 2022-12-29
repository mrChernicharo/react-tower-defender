import { useStageMaps } from "./hooks/useStageMaps";
import { useTile } from "./hooks/useTile";
import {
  HIGHLIGHTED_TILE_COLORS,
  pathIcons,
  STAGE_MAPS,
  TILE_COLORS,
  TILE_SIZE,
  towerIcons,
} from "./lib/constants";

export default function TileMenu() {
  const { selectedTileId } = useTile();

  const { stageMap } = useStageMaps();

  const activeTile = stageMap.tiles.find((tile) => selectedTileId === tile.id);

  if (!activeTile) return null;

  const { id, x, y, type } = activeTile;

  function getAdjacentTile(direction) {
    let adj;
    switch (direction) {
      case "left":
        {
          adj = STAGE_MAPS[0].tiles.find((t) => t.id === `${x - 1}:${y}`);
        }
        break;
      case "right":
        {
          adj = STAGE_MAPS[0].tiles.find((t) => t.id === `${x + 1}:${y}`);
        }
        break;
      case "bottom":
        {
          adj = STAGE_MAPS[0].tiles.find((t) => t.id === `${x}:${y + 1}`);
        }
        break;
    }
    return adj || null;
  }

  function canBecomePath(tile) {
    return tile.type === "grass";
  }

  function createNewPath(tile) {
    console.log("createNewPath", tile);
    // TODO: We need to have our tiles in memory
    tile.style = "path";
  }

  const tileMenus = {
    grass: (
      <g key={`tower-select-${id}`}>
        <circle
          data-name={`tower-select-ring-outer`}
          r={80}
          cx={x * TILE_SIZE + 50 + TILE_SIZE / 2}
          cy={y * TILE_SIZE + 50 + TILE_SIZE / 2}
          opacity={0.5}
        />
        <circle
          data-name={`tower-select-ring-inner`}
          fill={HIGHLIGHTED_TILE_COLORS[type]}
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
    ),
    path: (
      <g key={`path-select-${id}`}>
        <circle
          data-name={`path-select-ring-outer`}
          r={80}
          cx={x * TILE_SIZE + 50 + TILE_SIZE / 2}
          cy={y * TILE_SIZE + 50 + TILE_SIZE / 2}
          opacity={0.5}
        />
        <circle
          data-name={`path-select-ring-inner`}
          fill={TILE_COLORS[type]}
          r={45}
          cx={x * TILE_SIZE + 50 + TILE_SIZE / 2}
          cy={y * TILE_SIZE + 50 + TILE_SIZE / 2}
        />
        {pathIcons.map(({ id, name, tx, ty, fill, icon }) => {
          const adjacentTile = getAdjacentTile(name);
          const isBuildable = adjacentTile && canBecomePath(adjacentTile);

          if (!isBuildable) return null;

          return (
            <g key={id}>
              <circle
                data-name={`${name}-path-icon`}
                cx={x * TILE_SIZE + 50 + TILE_SIZE / 2 + tx}
                cy={y * TILE_SIZE + 50 + TILE_SIZE / 2 + ty}
                fill={fill}
                r={25}
                onClick={() => createNewPath(adjacentTile)}
              />

              <text
                fontSize={32}
                x={x * TILE_SIZE + 34 + TILE_SIZE / 2 + tx}
                y={y * TILE_SIZE + 62 + TILE_SIZE / 2 + ty}
              >
                {icon}
              </text>
            </g>
          );
        })}
      </g>
    ),
    mud: <g></g>,
  };

  return tileMenus[type];
}

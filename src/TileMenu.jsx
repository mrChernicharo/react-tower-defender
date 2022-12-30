import { useEffect, useState } from "react";
import { useStore } from "./context/createFastContext";
import { useTile } from "./hooks/useTile";
import {
  HIGHLIGHTED_TILE_COLORS,
  pathIcons,
  STAGE_MAPS,
  TILE_COLORS,
  TILE_SIZE,
  towerIcons,
  TOWERS,
} from "./lib/constants";
import { getGridHeight, getGridWidth } from "./lib/helpers";

export default function TileMenu() {
  const { selectedTileId } = useTile();

  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [previewedTower, setPreviewedTower] = useState(null);

  const [stages, setStore] = useStore((store) => store.stages);
  const [path] = useStore((store) => store.path);
  const [towers] = useStore((store) => store.towers);
  const [gold] = useStore((store) => store.gold);
  const [stageNumber] = useStore((store) => store.stageNumber);
  const [tiles] = useStore((store) => store.stages[stageNumber].tiles);
  const [waveCount] = useStore((store) => store.stages[stageNumber].waveCount);

  useEffect(() => {
    setSubMenuOpen(false);
  }, [selectedTileId]);

  const gridWidth = getGridWidth(tiles);
  const gridHeight = getGridHeight(tiles);

  const firstWaveRow = gridHeight - waveCount;

  function getTowerIconPos(pos) {
    if (!["x", "y"].includes(pos)) throw Error("x or y expected");
    return towerIcons.find((icon) => icon.name === previewedTower.name)[
      `t${pos}`
    ];
  }

  function canBecomePath(tile) {
    return tile.type === "grass";
  }

  function updateCurrentWave(tile) {
    const barrierBroken = tile.y > firstWaveRow;
    const wave = barrierBroken ? tile.y - firstWaveRow : null;
    console.log(barrierBroken ? `CALL WAVE ${wave}!` : "");
    return wave;
  }

  function getUpdatedTiles(newTile) {
    return {
      ...stages,
      [stageNumber]: {
        ...stages[stageNumber],
        tiles: [...stages[stageNumber].tiles].map((t) =>
          t.id === newTile.id ? newTile : t
        ),
      },
    };
  }

  function createNewPath(tile) {
    console.log("createNewPath", tile);
    const newTile = { ...tile, type: "path" };
    setStore({
      currentWave: updateCurrentWave(newTile),
      stages: getUpdatedTiles(newTile),
      path: [...path, newTile],
    });
  }

  function handleTowerPreview(tileId, name) {
    const tower = TOWERS[name];
    console.log("handleTowerPreview", tileId, name, tower);
    setSubMenuOpen(true);
    setPreviewedTower(tower);
  }

  function handleCreateNewTower() {
    console.log("create new tower!", { ...previewedTower });
    setStore({
      towers: [...towers, previewedTower],
    });
    setSubMenuOpen(false);
    setPreviewedTower(null);
  }

  const activeTile = stages[stageNumber].tiles.find(
    (tile) => selectedTileId === tile.id
  );

  if (!activeTile) return null;

  const { id, x, y, type } = activeTile;

  function getAdjacentTile(direction) {
    let adj;
    switch (direction) {
      case "left":
        {
          adj = stages[stageNumber].tiles.find((t) => t.id === `${x - 1}:${y}`);
        }
        break;
      case "right":
        {
          adj = stages[stageNumber].tiles.find((t) => t.id === `${x + 1}:${y}`);
        }
        break;
      case "bottom":
        {
          adj = stages[stageNumber].tiles.find((t) => t.id === `${x}:${y + 1}`);
        }
        break;
    }
    return adj || null;
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

        {towerIcons.map(({ name, tx, ty, fill }) => (
          <g key={`${id}-${name}`}>
            <g>
              <circle
                data-name={
                  subMenuOpen && previewedTower.name === name
                    ? `${name}-tower-confirm-icon`
                    : `${name}-tower-icon`
                }
                cx={x * TILE_SIZE + 50 + TILE_SIZE / 2 + tx}
                cy={y * TILE_SIZE + 50 + TILE_SIZE / 2 + ty}
                fill={
                  subMenuOpen && previewedTower.name === name ? "#0d7" : fill
                }
                r={25}
                onClick={() =>
                  subMenuOpen &&
                  previewedTower.name === name &&
                  previewedTower.price <= gold
                    ? handleCreateNewTower()
                    : handleTowerPreview(id, name)
                }
              />

              {subMenuOpen && previewedTower.name === name && (
                <text
                  x={x * TILE_SIZE + 35 + TILE_SIZE / 2 + tx}
                  y={y * TILE_SIZE + 64 + TILE_SIZE / 2 + ty}
                  fontSize={32}
                  fill="#fff"
                >
                  ✔
                </text>
              )}
            </g>
          </g>
        ))}
        {subMenuOpen ? (
          <>
            <circle
              className="tower-preview"
              cx={x * TILE_SIZE + 50 + TILE_SIZE / 2}
              cy={y * TILE_SIZE + 50 + TILE_SIZE / 2}
              r={20}
              fill={previewedTower.fill}
            />
            <rect
              x={x * TILE_SIZE + 60 + TILE_SIZE / 2 + getTowerIconPos("x")}
              y={y * TILE_SIZE + 62 + TILE_SIZE / 2 + getTowerIconPos("y")}
              width={180}
              height={160}
              fill="#777"
            />
            <text
              x={x * TILE_SIZE + 80 + TILE_SIZE / 2 + getTowerIconPos("x")}
              y={y * TILE_SIZE + 90 + TILE_SIZE / 2 + getTowerIconPos("y")}
              fontSize={24}
              fill={previewedTower.fill}
            >
              {previewedTower.name}
            </text>
            <text
              x={x * TILE_SIZE + 80 + TILE_SIZE / 2 + getTowerIconPos("x")}
              y={y * TILE_SIZE + 130 + TILE_SIZE / 2 + getTowerIconPos("y")}
              fontSize={18}
            >
              damage {previewedTower.damage}
            </text>
            <text
              x={x * TILE_SIZE + 80 + TILE_SIZE / 2 + getTowerIconPos("x")}
              y={y * TILE_SIZE + 150 + TILE_SIZE / 2 + getTowerIconPos("y")}
              fontSize={18}
            >
              range: {previewedTower.range}
            </text>
            <text
              x={x * TILE_SIZE + 80 + TILE_SIZE / 2 + getTowerIconPos("x")}
              y={y * TILE_SIZE + 170 + TILE_SIZE / 2 + getTowerIconPos("y")}
              fontSize={18}
            >
              fire rate: {previewedTower.rate_of_fire}
            </text>
            <text
              x={x * TILE_SIZE + 80 + TILE_SIZE / 2 + getTowerIconPos("x")}
              y={y * TILE_SIZE + 190 + TILE_SIZE / 2 + getTowerIconPos("y")}
              fontSize={18}
            >
              price: {previewedTower.price}
            </text>
            <rect
              className="btn"
              x={x * TILE_SIZE + 80 + TILE_SIZE / 2 + getTowerIconPos("x")}
              y={y * TILE_SIZE + 210 + TILE_SIZE / 2 + getTowerIconPos("y")}
            />
          </>
        ) : null}
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
          const isBuildableAdj = adjacentTile && canBecomePath(adjacentTile);

          if (!isBuildableAdj) return null;

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

import { useState, useEffect } from "react";
import Ring from "../../assets/Ring";
import { useStore } from "../../context/createFastContext";
import { useClick } from "../../hooks/useClick";
import {
  TILE_SIZE,
  TOWERS,
  HIGHLIGHTED_TILE_COLORS,
  towerIcons,
} from "../../lib/constants";

export default function TowerMenu({ id, x, y, type, hasTower }) {
  const [selectedTileId] = useStore((store) => store.selectedTileId);
  // console.log({ id, x, y, selectedTileId });

  const [towers, setStore] = useStore((store) => store.towers);
  const [gold] = useStore((store) => store.gold);
  const [stages] = useStore((store) => store.stages);
  const [stageNumber] = useStore((store) => store.stageNumber);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [previewedTower, setPreviewedTower] = useState(null);
  const [tiles] = useStore((store) => store.stages[stageNumber].tiles);

  function getUpdatedTiles(tileId) {
    const tile = tiles.find((t) => t.id === tileId);
    const newTile = { ...tile, hasTower: true };
    return {
      ...stages,
      [stageNumber]: {
        ...stages[stageNumber],
        tiles: [...stages[stageNumber].tiles].map((t) =>
          t.id === tileId ? newTile : t
        ),
      },
    };
  }

  function getTowerIconPos(pos) {
    if (!["x", "y"].includes(pos)) throw Error("x or y expected");
    return towerIcons.find((icon) => icon.name === previewedTower.name)[
      `t${pos}`
    ];
  }

  function handleTowerPreview(tileId, name) {
    const tower = TOWERS[name];
    console.log("handleTowerPreview", tileId, name, tower);
    setSubMenuOpen(true);
    setPreviewedTower(tower);
  }

  function handleCreateNewTower(tileId, x, y) {
    const newTower = { ...previewedTower, tileId, x, y };
    console.log("create new tower!", { newTower });

    setStore({
      towers: [...towers, newTower],
      stages: getUpdatedTiles(tileId),
      gold: gold - newTower.price,
    });
    setSubMenuOpen(false);
    setPreviewedTower(null);
  }

  useEffect(() => {
    setSubMenuOpen(false);
    setPreviewedTower(null);
  }, [id]);

  if (hasTower)
    return (
      <Ring
        x={x * TILE_SIZE - 24 + TILE_SIZE / 2}
        y={y * TILE_SIZE - 24 + TILE_SIZE / 2}
      />
    );

  return (
    <g key={`tower-select-${id}`}>
      <Ring
        x={x * TILE_SIZE - 24 + TILE_SIZE / 2}
        y={y * TILE_SIZE - 24 + TILE_SIZE / 2}
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
              fill={subMenuOpen && previewedTower.name === name ? "#0d7" : fill}
              r={25}
              onClick={() => {
                subMenuOpen &&
                previewedTower.name === name &&
                previewedTower.price <= gold
                  ? handleCreateNewTower(
                      id,
                      x * TILE_SIZE + 50 + TILE_SIZE / 2,
                      y * TILE_SIZE + 50 + TILE_SIZE / 2
                    )
                  : handleTowerPreview(id, name);
              }}
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
  );
}

import { useState, useEffect } from "react";
import Ring from "../../../assets/Ring";
import { useStore } from "../../../context/createFastContext";
import {
  TILE_SIZE,
  TOWERS,
  HIGHLIGHTED_TILE_COLORS,
  towerIcons,
} from "../../../lib/constants";
import { getDistance } from "../../../lib/helpers";
const checkedIcon = "✔️";
const noGoldIcon = "⛔️";

export default function TowerMenu({ id, x, y, hasTower, onTowerCreated }) {
  // const [selectedTileId] = useStore((store) => store.selectedTileId);
  // console.log({ id, x, y, selectedTileId });

  // const [towers, setStore] = useStore((store) => store.towers);
  const [gold] = useStore((store) => store.gold);
  const [stages] = useStore((store) => store.stages);
  const [stageNumber] = useStore((store) => store.stageNumber);
  const [tiles] = useStore((store) => store.stages[stageNumber].tiles);

  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [previewedTower, setPreviewedTower] = useState(null);

  const towerSelected = (name) => subMenuOpen && previewedTower.name === name;
  const canAfford = (price) => gold >= price;

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

  function handleIconClick(id, name) {
    subMenuOpen && previewedTower.name === name && previewedTower.price <= gold
      ? handleCreateNewTower(
          id,
          x * TILE_SIZE + 50 + TILE_SIZE / 2,
          y * TILE_SIZE + 50 + TILE_SIZE / 2
        )
      : handleTowerPreview(id, name);
  }

  function handleTowerPreview(tileId, name) {
    const tower = TOWERS[name];
    console.log("handleTowerPreview", tileId, name, tower);
    setSubMenuOpen(true);
    setPreviewedTower(tower);
  }

  function handleCreateNewTower(tileId, x, y) {
    const newTower = {
      ...previewedTower,
      tileId,
      pos: { x, y },
      cooldown: 60 / previewedTower.rate_of_fire / 60,
      shotsPerSecond: 60 / previewedTower.rate_of_fire / 60,
      lastShot: 0,
    };
    console.log("create new tower!", { newTower });

    onTowerCreated(newTower, getUpdatedTiles(tileId));
    setSubMenuOpen(false);
    setPreviewedTower(null);
  }

  const getIconDataName = (name) =>
    towerSelected(name) ? `${name}-tower-confirm-icon` : `${name}-tower-icon`;

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

      {towerIcons.map(({ name, tx, ty, fill, towerInfo }) => (
        <g key={`${id}-${name}`}>
          <circle
            data-name={getIconDataName(name)}
            data-affordable={canAfford(towerInfo.price) ? 1 : 0}
            cx={x * TILE_SIZE + 50 + TILE_SIZE / 2 + tx}
            cy={y * TILE_SIZE + 50 + TILE_SIZE / 2 + ty}
            fill={
              towerSelected(name)
                ? canAfford(towerInfo.price)
                  ? "#0d7"
                  : "#555"
                : fill
            }
            r={25}
            onClick={() => {
              handleIconClick(id, name);
            }}
            opacity={canAfford(towerInfo.price) ? 1 : 0.3}
          />
          {towerSelected(name) && (
            <>
              <circle
                className="tower-preview"
                cx={x * TILE_SIZE + 50 + TILE_SIZE / 2}
                cy={y * TILE_SIZE + 50 + TILE_SIZE / 2}
                r={20}
                fill={previewedTower.fill}
              />
              <circle
                className="tower-preview"
                cx={x * TILE_SIZE + 50 + TILE_SIZE / 2}
                cy={y * TILE_SIZE + 50 + TILE_SIZE / 2}
                r={20}
                fill={previewedTower.fill}
              />
              <circle
                id={`${towerInfo.tileId}::${towerInfo.name}::range`}
                className="tower-preview-range"
                cx={x * TILE_SIZE + 50 + TILE_SIZE / 2}
                cy={y * TILE_SIZE + 50 + TILE_SIZE / 2}
                r={towerInfo.range}
                fill={towerInfo.fill}
                pointerEvents="none"
                opacity={0.15}
              />
              <text
                x={x * TILE_SIZE + 35 + TILE_SIZE / 2 + tx}
                y={y * TILE_SIZE + 64 + TILE_SIZE / 2 + ty}
                fontSize={32}
                fill="#fff"
              >
                {canAfford(towerInfo.price) ? checkedIcon : noGoldIcon}
              </text>
            </>
          )}
        </g>
      ))}
      {subMenuOpen ? (
        <>
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

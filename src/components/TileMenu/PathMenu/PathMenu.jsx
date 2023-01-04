import { useEffect } from "react";
import Ring from "../../../assets/Ring";
import { useStore } from "../../../context/createFastContext";
import { pathIcons, TILE_COLORS, TILE_SIZE } from "../../../lib/constants";
import { getGridHeight } from "../../../lib/helpers";

export default function PathMenu({ tile, onPathTileCreated, onWaveCalled }) {
  const [stages] = useStore((store) => store.stages);
  const [tileChain] = useStore((store) => store.tileChain);
  const [waveNumber] = useStore((store) => store.waveNumber);
  const [stageNumber] = useStore((store) => store.stageNumber);
  const [tiles] = useStore((store) => store.stages[stageNumber].tiles);
  const [waveCount] = useStore((store) => store.stages[stageNumber].waveCount);
  const [inBattle] = useStore((store) => store.inBattle);

  const gridHeight = getGridHeight(tiles);
  const firstWaveRow = gridHeight - waveCount;

  const { id, x, y, connected } = tile;
  console.log(tile);

  function canBecomePath(tile) {
    return tile.type === "grass" && !tile.hasTower;
  }

  function getUpdatedTiles(newTile) {
    return {
      ...stages,
      [stageNumber]: {
        ...stages[stageNumber],
        tiles: [...stages[stageNumber].tiles]
          .map((t) => {
            if (t.enemyEntrance) delete t.enemyEntrance;
            return t;
          })
          .map((t) => (t.id === newTile.id ? newTile : t)),
      },
    };
  }

  function getTileExits(tile) {
    const prevTile = tileChain.at(-1);

    const left = { x: 0, y: 0 };
    const center = { x: 0, y: 0 };
    const right = { x: 0, y: 0 };

    // newTile below
    if (prevTile.y < tile.y) {
      left.x = tile.x + 0.25;
      left.y = tile.y;
      center.x = tile.x + 0.5;
      center.y = tile.y;
      right.x = tile.x + 0.75;
      right.y = tile.y;
    }

    // newTile to the left
    if (prevTile.x > tile.x) {
      left.x = tile.x + 1;
      left.y = tile.y + 0.25;
      center.x = tile.x + 1;
      center.y = tile.y + 0.5;
      right.x = tile.x + 1;
      right.y = tile.y + 0.75;
    }

    // newTile to the right
    if (prevTile.x < tile.x) {
      left.x = tile.x;
      left.y = tile.y + 0.75;
      center.x = tile.x;
      center.y = tile.y + 0.5;
      right.x = tile.x;
      right.y = tile.y + 0.25;
    }
    return { left, center, right };
  }

  function createNewPath(tile) {
    console.log("createNewPath", tile);
    const barrierBroken = tile.y > firstWaveRow + waveNumber;

    const newTile = {
      ...tile,
      type: "path",
      exits: getTileExits(tile),
      ...(barrierBroken && { enemyEntrance: true }),
    };

    const newTileChain = [...tileChain];
    const prevTile = newTileChain.pop();
    prevTile.connected = true;

    console.log({ newTile, prevTile, newTileChain });

    const payload = {
      stages: getUpdatedTiles(newTile),
      tileChain: [...newTileChain, prevTile, newTile],
      ...(barrierBroken && {
        waveNumber: tile.y - firstWaveRow,
        inBattle: true,
      }),
    };

    onPathTileCreated(payload);

    if (barrierBroken) {
      console.log(`CALL WAVE ${tile.y - firstWaveRow}!`, payload);
      onWaveCalled();
    }
    // console.log("createNewPath", [...path, newTile]);
  }

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

  // useEffect(() => {
  //   setTimeout(() => delete tile.connected, 100);
  // }, [stageNumber]);

  return (
    <g key={`path-select-${id}`}>
      <Ring
        x={x * TILE_SIZE - 24 + TILE_SIZE / 2}
        y={y * TILE_SIZE - 24 + TILE_SIZE / 2}
      />
      {!inBattle &&
        pathIcons.map(({ id, name, tx, ty, fill, icon }) => {
          const adjacentTile = getAdjacentTile(name);
          const isBuildableAdj =
            !connected && adjacentTile && canBecomePath(adjacentTile);

          if (!isBuildableAdj) return null;

          return (
            <g key={id}>
              <circle
                data-name={`${name}-path-icon`}
                cx={x * TILE_SIZE + 50 + TILE_SIZE / 2 + tx}
                cy={y * TILE_SIZE + 50 + TILE_SIZE / 2 + ty}
                fill={fill}
                r={25}
                onClick={() => {
                  createNewPath(adjacentTile);
                }}
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
  );
}

import Ring from "../../assets/Ring";
import { useStore } from "../../context/createFastContext";
import { pathIcons, TILE_COLORS, TILE_SIZE } from "../../lib/constants";
import { getGridHeight } from "../../lib/helpers";

export default function PathMenu({ id, x, y, type }) {
  const [stages, setStore] = useStore((store) => store.stages);
  const [path] = useStore((store) => store.path);
  const [currentWave] = useStore((store) => store.currentWave);
  const [stageNumber] = useStore((store) => store.stageNumber);
  const [tiles] = useStore((store) => store.stages[stageNumber].tiles);
  const [waveCount] = useStore((store) => store.stages[stageNumber].waveCount);
  const [inBattle] = useStore((store) => store.inBattle);

  const gridHeight = getGridHeight(tiles);
  const firstWaveRow = gridHeight - waveCount;

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
    const prevTile = path.at(-1);

    const left = { x: 0, y: 0 };
    const center = { x: 0, y: 0 };
    const right = { x: 0, y: 0 };

    // newTile beneath
    if (prevTile.y < tile.y) {
      console.log("new below");
      left.x = tile.x + 0.25;
      left.y = tile.y;
      center.x = tile.x + 0.5;
      center.y = tile.y;
      right.x = tile.x + 0.75;
      right.y = tile.y;
    }

    // newTile to the left
    if (prevTile.x > tile.x) {
      console.log("new to the left");
      left.x = tile.x + 1;
      left.y = tile.y + 0.25;
      center.x = tile.x + 1;
      center.y = tile.y + 0.5;
      right.x = tile.x + 1;
      right.y = tile.y + 0.75;
    }

    // newTile to the right
    if (prevTile.x < tile.x) {
      console.log("new to the right");
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
    // console.log("createNewPath", tile, path);

    const barrierBroken = tile.y > firstWaveRow + currentWave;
    if (barrierBroken) {
      console.log(`CALL WAVE ${tile.y - firstWaveRow}!`);
    }

    console.log(getTileExits(tile));

    const newTile = {
      ...tile,
      type: "path",
      exits: getTileExits(tile),
      ...(barrierBroken && { enemyEntrance: true }),
    };

    setStore({
      stages: getUpdatedTiles(newTile),
      path: [...path, newTile],
      ...(barrierBroken && {
        currentWave: tile.y - firstWaveRow,
        inBattle: true,
      }),
    });

    console.log("createNewPath", [...path, newTile]);
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

  return (
    <g key={`path-select-${id}`}>
      <Ring
        x={x * TILE_SIZE - 24 + TILE_SIZE / 2}
        y={y * TILE_SIZE - 24 + TILE_SIZE / 2}
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
  );
}

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

  function createNewPath(tile) {
    console.log("createNewPath", tile);

    const barrierBroken = tile.y > firstWaveRow + currentWave;
    if (barrierBroken) {
      console.log(`CALL WAVE ${tile.y - firstWaveRow}!`);
    }

    const newTile = {
      ...tile,
      type: "path",
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

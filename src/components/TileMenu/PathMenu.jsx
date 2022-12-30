import Ring from "../../assets/Ring";
import { useStore } from "../../context/createFastContext";
import { pathIcons, TILE_COLORS, TILE_SIZE } from "../../lib/constants";
import { getGridHeight } from "../../lib/helpers";

export default function PathMenu({ id, x, y, type }) {
  const [stages, setStore] = useStore((store) => store.stages);
  const [path] = useStore((store) => store.path);
  const [stageNumber] = useStore((store) => store.stageNumber);
  const [tiles] = useStore((store) => store.stages[stageNumber].tiles);
  const [waveCount] = useStore((store) => store.stages[stageNumber].waveCount);
  const [inBattle] = useStore((store) => store.inBattle);

  const gridHeight = getGridHeight(tiles);
  const firstWaveRow = gridHeight - waveCount;

  function canBecomePath(tile) {
    return !inBattle && tile.type === "grass" && !tile.hasTower;
  }

  function getCurrentWave(tile) {
    const barrierBroken = tile.y > firstWaveRow;
    const wave = barrierBroken ? tile.y - firstWaveRow : null;

    if (barrierBroken) {
      // const newTile = { ...tile, enemyEntrance: true };
      // console.log(getUpdatedTiles(newTile));
      console.log(`CALL WAVE ${wave}!`);
      // TODO:  { ...tile, enemyEntrance: true }
      // setStore({ inBattle: true });
    }
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
      currentWave: getCurrentWave(newTile),
      stages: getUpdatedTiles(newTile),
      path: [...path, newTile],
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

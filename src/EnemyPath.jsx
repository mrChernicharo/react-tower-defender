import { useStore } from "./context/createFastContext";
import { TILE_SIZE } from "./lib/constants";

export default function EnemyPath() {
  const [path] = useStore((store) => store.path);

  const paths = path.reduce(
    (acc, tile) => {
      acc.left.push(tile.exits.left);
      acc.center.push(tile.exits.center);
      acc.right.push(tile.exits.right);
      return acc;
    },
    {
      left: [],
      center: [],
      right: [],
    }
  );
  console.log(path, paths);

  function createPath(points) {
    let d = "";
    let prevPos = null;

    for (const [i, pos] of points.entries()) {
      if (i === 0) {
        // moveTo
        d = `M ${pos.x * TILE_SIZE} ${pos.y * TILE_SIZE}`;
      } else {
        // line
        if (prevPos.x === pos.x || prevPos.y === pos.y) {
          d += ` L ${pos.x * TILE_SIZE} ${pos.y * TILE_SIZE}`;
        }
        // arc
        else {
          let sweep = "0";
          // starting from the top
          if (Number.isInteger(prevPos.y)) {
            if (prevPos.x < pos.x) sweep = "0";
            if (prevPos.x > pos.x) sweep = "1";
          }
          // starting from the side
          else {
            if (prevPos.x < pos.x) sweep = "1";
            if (prevPos.x > pos.x) sweep = "0";
          }
          d += ` A 75 75 0 0 ${sweep} 
          ${pos.x * TILE_SIZE} ${pos.y * TILE_SIZE}`;
        }
      }
      prevPos = pos;
    }
    return d;
  }

  let ld, cd, rd;
  ld = createPath(paths.left);
  cd = createPath(paths.center);
  rd = createPath(paths.right);

  return (
    <>
      {/* TILE EXITS */}
      <g transform="translate(50,50)">
        {/* {path.map((tile) => {
          const { id, exits } = tile;
          return (
            <g key={id}>
              {Object.keys(exits).map((k) => (
                <circle
                  key={`${exits[k].x}:${exits[k].y}`}
                  r={6}
                  cx={exits[k].x * TILE_SIZE}
                  cy={exits[k].y * TILE_SIZE}
                  fill="#ddd"
                />
              ))}
            </g>
          );
        })} */}

        <path d={ld} strokeWidth={3} stroke="#ddd" fill="none" />
        <path d={cd} strokeWidth={3} stroke="#ddd" fill="none" />
        <path d={rd} strokeWidth={3} stroke="#ddd" fill="none" />
      </g>
    </>
  );
}

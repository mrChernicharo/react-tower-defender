import { useRef } from "react";
import { useStore } from "./context/createFastContext";
import { TILE_SIZE } from "./lib/constants";

export default function EnemyPath() {
  const leftPathRef = useRef(null);
  const centerPathRef = useRef(null);
  const rightPathRef = useRef(null);

  const [tileChain] = useStore((store) => store.tileChain);

  const paths = tileChain.reduce(
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

    // const d2d = new Path2D(d);

    return d;
  }

  let ld, cd, rd;
  ld = createPath(paths.left);
  cd = createPath(paths.center);
  rd = createPath(paths.right);

  // console.log(tileChain, paths, ld, cd, rd);

  return (
    <>
      {/* TILE EXITS */}
      <g transform="translate(50,50)">
        {tileChain.map((tile) => {
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
        })}

        <path
          ref={leftPathRef}
          d={ld}
          strokeWidth={3}
          stroke="#ddd"
          fill="none"
          // onMouseOver={handleMouseOver}
        />
        <path
          ref={centerPathRef}
          d={cd}
          strokeWidth={3}
          stroke="#ddd"
          fill="none"
        />
        <path
          ref={rightPathRef}
          d={rd}
          strokeWidth={3}
          stroke="#ddd"
          fill="none"
        />
      </g>
    </>
  );
}

// function handleMouseOver(e) {
//   const leftPathLen = leftPathRef.current?.getTotalLength();
//   const centerPathLen = centerPathRef.current?.getTotalLength();
//   const rightPathLen = rightPathRef.current?.getTotalLength();

//   console.log({
//     e,
//     leftPathLen,
//     centerPathLen,
//     rightPathLen,
//     ll: leftPathRef.current?.getPointAtLength(leftPathLen),
//     cl: centerPathRef.current?.getPointAtLength(centerPathLen),
//     rl: rightPathRef.current?.getPointAtLength(rightPathLen),
//     lh: leftPathRef.current?.getPointAtLength(leftPathLen / 2),
//     ch: centerPathRef.current?.getPointAtLength(centerPathLen / 2),
//     rh: rightPathRef.current?.getPointAtLength(rightPathLen / 2),
//   });
// }

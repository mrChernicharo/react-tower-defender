import { useEffect, useRef } from "react";
import { useStore } from "../../context/createFastContext";
import { TILE_SIZE } from "../../lib/constants";

export default function EnemyPath({ onPathChanged }) {
  const leftPathRef = useRef(null);
  const centerPathRef = useRef(null);
  const rightPathRef = useRef(null);

  const [tileChain] = useStore((store) => store.tileChain);

  const chains = tileChain.reduce(
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

  function createPath(points, lane) {
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

    const hasEnemyEntrance = tileChain.at(-1).enemyEntrance;
    if (hasEnemyEntrance) {
      let entryPos = { x: 0, y: 0 };
      const firstTileEntry = points.at(-1);

      entryPos.x = firstTileEntry.x * TILE_SIZE;
      entryPos.y = firstTileEntry.y * TILE_SIZE + TILE_SIZE * 0.5;

      if (lane === "left") {
        entryPos.x += TILE_SIZE * 0.25;
      }
      if (lane === "right") {
        entryPos.x -= TILE_SIZE * 0.25;
      }

      d += ` L ${entryPos.x} ${entryPos.y}`;
    }
    return d;
  }

  const paths = [
    { id: "left", d: createPath(chains.left, "left"), ref: leftPathRef },
    {
      id: "center",
      d: createPath(chains.center, "center"),
      ref: centerPathRef,
    },
    { id: "right", d: createPath(chains.right, "right"), ref: rightPathRef },
  ];

  useEffect(() => {
    const createLaneObj = (path) => {
      return {
        length: path.getTotalLength(),
        start: path.getPointAtLength(path.getTotalLength()),
        end: path.getPointAtLength(0),
        getPointAtLength(val) {
          return path.getPointAtLength(val);
        },
      };
    };
    const lanesInfo = {
      left: createLaneObj(leftPathRef.current),
      center: createLaneObj(centerPathRef.current),
      right: createLaneObj(rightPathRef.current),
    };

    onPathChanged(lanesInfo);
  }, [chains.center.length]);

  return (
    <>
      {/* TILE EXIT DOTS */}
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

        {/* PATHS */}
        {paths.map(({ id, d, ref }) => (
          <path
            key={id}
            ref={ref}
            d={d}
            strokeWidth={3}
            stroke="#ddd"
            fill="none"
          />
        ))}
      </g>
    </>
  );
}

import { useEffect, useRef } from "react";
import { useStore } from "../../context/createFastContext";
import { ENEMIES, TILE_SIZE, ENEMY_WAVES } from "../../lib/constants";

const centerDigits = (n) => {
  let x = 0;
  switch (String(n.toFixed(0)).length) {
    case 1:
      x = 0;
      break;
    case 2:
      x = 10;
      break;
    case 3:
      x = 15;
      break;
    case 4:
      x = 20;
      break;
    case 5:
      x = 25;
      break;
  }
  return n - x;
};

export default function Enemies() {
  const [enemies] = useStore((store) => store.enemies);
  const [inBattle, setStore] = useStore((store) => store.inBattle);
  const [tileChain] = useStore((store) => store.tileChain);

  function createEnemies() {
    const enemiesEntrypoint = tileChain.at(-1);
    const waveEnemies = ENEMY_WAVES.map((e, i) => ({
      ...ENEMIES[e.name],
      id: `${e.name}::${i}`,
      lane: e.lane,
      delay: e.delay,
      progress: 0,
      percProgress: 0,
      pos: {
        x: enemiesEntrypoint.x * TILE_SIZE + TILE_SIZE / 2 + 50,
        y: enemiesEntrypoint.y * TILE_SIZE + TILE_SIZE / 2 + 50,
      },
    }));

    return waveEnemies;
  }

  function getPoints(pos) {
    const { x, y } = pos;

    const points = [
      { x: x + 12, y },
      { x: x - 6, y: y + 6 },
      { x: x - 6, y: y - 6 },
      { x: x + 12, y },
    ];

    return points.map((p) => `${parseInt(p.x)},${parseInt(p.y)} `).join("");
  }

  useEffect(() => {
    if (inBattle) {
      setStore({
        enemies: createEnemies(),
      });
    }
  }, [inBattle]);

  return (
    <>
      {inBattle &&
        enemies?.map((e, i) => {
          return (
            <g key={`${e.name}::${i}`}>
              <text x={centerDigits(e.pos.x)} y={e.pos.y - 15}>
                {e.hp}
              </text>
              {/* <circle
                data-name="enemy"
                fill={e.fill}
                r={e.size}
                cx={e.pos.x}
                cy={e.pos.y}
              /> */}
              <g>
                <polygon
                  points={getPoints(e.pos)}
                  fill={e.fill}
                  stroke={e.fill}
                  transform={`rotate(${e.rotation || 0}, ${e.pos.x}, ${
                    e.pos.y
                  })`}
                />
              </g>
            </g>
          );
        })}
    </>
  );
}

import { TOWERS } from "../../lib/constants";

export default function Bullets({ bullets }) {
  return (
    <g>
      {(bullets || [])
        .filter((s) => s.pos.x !== s.enemyPos.x && s.pos.y !== s.enemyPos.y)
        .map(({ id, pos, enemyPos, towerPos, type }) => (
          <g key={id}>
            <circle r={6} cx={pos.x} cy={pos.y} fill={TOWERS[type].fill} />
            {/* <line
              x1={towerPos.x}
              y1={towerPos.y}
              x2={enemyPos.x}
              y2={enemyPos.y}
              stroke={TOWERS[type].fill}
              strokeWidth={2}
            /> */}
            <line
              x1={towerPos.x}
              y1={towerPos.y}
              x2={pos.x}
              y2={pos.y}
              stroke={TOWERS[type].fill}
              strokeWidth={1}
            />
          </g>
        ))}
    </g>
  );
}

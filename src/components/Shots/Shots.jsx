import { TOWERS } from "../../lib/constants";

export default function Shots({ shots }) {
  console.log(shots);
  return (
    <g>
      {shots.map(({ id, pos, enemyPos, type }) => (
        <g key={id}>
          <circle
            r={4}
            cx={pos.x}
            cy={pos.y}
            /** fill={TOWERS[type].fill */
          />
          <line
            x1={pos.x}
            y1={pos.y}
            x2={enemyPos.x}
            y2={enemyPos.y}
            stroke={TOWERS[type].fill}
          />
        </g>
      ))}
    </g>
  );
}

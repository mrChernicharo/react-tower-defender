import { useStore } from "../../context/createFastContext";

export default function Enemies() {
  const [enemies] = useStore((store) => store.enemies);
  return (
    <>
      {enemies.map((e, i) => (
        <circle
          key={`${e.name}::${i}`}
          data-name="enemy"
          fill={e.fill}
          r={10}
          cx={e.pos.x}
          cy={e.pos.y}
        />
      ))}
    </>
  );
}

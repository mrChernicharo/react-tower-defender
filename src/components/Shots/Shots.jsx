// import { useEffect, useState } from "react";

import { useEffect } from "react";
import { useStore } from "../../context/createFastContext";
import { towerIcons, TOWERS } from "../../lib/constants";

export default function Shots() {
  const [shots] = useStore((store) => store.shots);

  useEffect(() => {
    console.log({ shots });
  }, [shots]);

  return (
    <g className="shots-g">
      {shots.map(({ id, target, tower, futurePos }) => (
        // {shots.map(({ id, x1, y1, x2, y2, stroke }) => (
        <g key={id}>
          <line
            id={id}
            x1={tower.pos.x}
            y1={tower.pos.y}
            x2={target.x}
            y2={target.y}
            stroke={tower.fill}
            strokeWidth={2}
          />
          <line
            id={id}
            x1={tower.pos.x}
            y1={tower.pos.y}
            x2={futurePos.x}
            y2={futurePos.y}
            stroke={tower.fill}
            strokeWidth={2}
          />
        </g>
      ))}
    </g>
  );
}

// function handleShot(e) {
//     const { enemy, tower } = e.detail;

//     const newShot = {
//       id: Math.random(),
//       stroke: tower.fill,
//       x1: enemy.pos.x,
//       y1: enemy.pos.y,
//       x2: tower.pos.x,
//       y2: tower.pos.y,
//     };

//     // console.log(enemy, tower, newShot, shots, lanes);
//     console.log({
//       enemy: enemy.name,
//       percProg: enemy.percProgress,
//       lane: lanes[enemy.lane],
//     });
//     setShots((prev) => [...prev, newShot]);

//     setTimeout(() => {
//       setShots([
//         (prev) => {
//           prev.unshift();
//           return prev;
//         },
//       ]);
//     }, 400);
//   }

//   useEffect(() => {
//     window.addEventListener("shot", handleShot);
//     return () => window.removeEventListener("shot", handleShot);
//   }, []);

//   return (
//     <g className="shots-g">
//       {shots.map(({ id, x1, y1, x2, y2, stroke }) => (
//         <>
//           <line
//             key={id}
//             id={id}
//             x1={x1}
//             y1={y1}
//             x2={x2}
//             y2={y2}
//             stroke={stroke}
//             strokeWidth={2}
//           />
//           <circle
//             key={`${id}::circle`}
//             id={`${id}::circle`}
//             x1={x1}
//             y1={y1}
//             x2={x2}
//             y2={y2}
//             stroke={stroke}
//             strokeWidth={2}
//           />
//         </>
//       ))}
//     </g>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { useStore } from "../../context/createFastContext";

export default function Tower({ tower }) {
  const [selectedTileId] = useStore((store) => store.selectedTileId);

  const rangeRef = useRef(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    console.log(selectedTileId);
    if (selectedTileId !== tower.tileId) {
      setOpacity(0);
    }
  }, [selectedTileId]);
  return (
    <g>
      <circle
        ref={rangeRef}
        id={`${tower.tileId}::${tower.name}::range`}
        className="tower-range"
        cx={tower.x}
        cy={tower.y}
        r={tower.range}
        fill={tower.fill}
        pointerEvents="none"
        opacity={selectedTileId === tower.tileId ? 0.15 : opacity}
      />

      <circle
        id={`${tower.tileId}::${tower.name}`}
        className="tower"
        cx={tower.x}
        cy={tower.y}
        r={20}
        onMouseOver={(e) => {
          // console.log("onMouseOver", selectedTileId, tower);
          setOpacity(0.15);
        }}
        onMouseOut={(e) => {
          // console.log("onMouseOut", selectedTileId, tower);
          setOpacity(selectedTileId === tower.tileId ? 0.15 : 0);
        }}
        fill={tower.fill}
      />
    </g>
  );
}

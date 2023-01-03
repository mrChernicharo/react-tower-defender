import { useEffect, useRef, useState } from "react";
import { useClick } from "../../hooks/useClick";

export default function Tower({ tower }) {
  const { selectedTileId } = useClick();

  const rangeRef = useRef(null);
  const [opacity, setOpacity] = useState(0);

  // useEffect(() => {
  //   console.log(selectedTileId);
  // }, [selectedTileId]);
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
        opacity={selectedTileId === tower.tileId ? 0.25 : opacity}
      />
      {/* 
      <circle
        className={"tower-hit-area"}
        onMouseOver={(e) => {
          console.log("onMouseOver", selectedTileId, tower);
          setOpacity(0.25);
        }}
        onMouseOut={(e) => {
          console.log("onMouseOut", selectedTileId, tower);
          setOpacity(0);
        }}
        cx={tower.x}
        cy={tower.y}
        r={20}
      /> */}

      <circle
        id={`${tower.tileId}::${tower.name}`}
        className="tower"
        cx={tower.x}
        cy={tower.y}
        r={20}
        // onMouseOver={(e) => {
        //   console.log("onMouseOver", selectedTileId, tower);
        //   setOpacity(0.25);
        // }}
        // onMouseOut={(e) => {
        //   console.log("onMouseOut", selectedTileId, tower);
        //   setOpacity(selectedTileId === tower.tileId ? 0.25 : 0);
        // }}
        // pointerEvents="none"
        fill={tower.fill}
      />
    </g>
  );
}

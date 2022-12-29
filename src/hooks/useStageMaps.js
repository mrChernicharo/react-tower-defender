import { useEffect, useState } from "react";
import { STAGE_MAPS } from "../lib/constants";

export function useStageMaps() {
  const [stageNumber, setStageNumber] = useState(1);
  const [stageMap, setStageMap] = useState(STAGE_MAPS[stageNumber]);

  function updateTile(newTile) {
    setStageMap(prev => prev.tiles.filter())
  }

  useEffect(() => {
    setStageMap(STAGE_MAPS[stageNumber])
  }, [stageNumber])

  return {
    stageNumber,
    stageMap,
    updateTile,
    setStageNumber,
  };
}

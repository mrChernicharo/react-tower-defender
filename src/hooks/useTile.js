import { useEffect, useState } from "react";
import { STAGE_MAPS } from "../lib/constants";

export function useTile() {
  const [selectedTileId, setSelectedTileId] = useState(null);

  function handleClick(e) {
    const clickedOutside = Boolean(
      !e
        .composedPath()
        .find((el) => ["game-header", "stage-map-g"].includes(el.id))
    );

    if (clickedOutside) {
      return setSelectedTileId(null);
    }

    const clickedTile = e.target.dataset?.name?.includes("tile");
    const clickedTowerSelect = e.target.dataset?.name?.includes("tower-select");

    if (clickedTowerSelect) return;
    if (clickedTile) return setSelectedTileId(e.target.id);
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [handleClick]);

  return {
    selectedTileId,
  };
}

import { useEffect, useState } from "react";
import { STAGE_MAPS } from "../lib/constants";

export function useTile() {
  const [selectedTileId, setSelectedTileId] = useState(null);

  function handleTileClick(e) {
    const clickedEnemy = e.target.dataset?.name?.includes("enemy");
    if (clickedEnemy) {
      console.log("clicked enemy");
      return;
    }

    const clickedOutside = !e
      .composedPath()
      .find((el) => ["game-header", "stage-map-g"].includes(el.id));

    // console.log({ e, s: selectedTileId, t: e.target.id });
    if (clickedOutside) {
      console.log("clicked outside");
      return setSelectedTileId(null);
    }

    const clickedTile = e.target.dataset?.name?.includes("tile");
    const clickedTowerSelectInnerRing =
      e.target.dataset?.name?.includes("tower-select-inner");
    const clickedTowerIcon = e.target.dataset?.name?.includes("tower-icon");

    if (clickedTowerSelectInnerRing) {
      console.log("clicked inside ring");
      return setSelectedTileId(null);
    }

    if (clickedTowerIcon) {
      console.log(`clicked ${e.target.dataset.name}`);
      return;
    }

    if (clickedTile) {
      console.log("clicked tile, open tower menu");
      setSelectedTileId(e.target.id);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleTileClick);
    return () => document.removeEventListener("click", handleTileClick);
  }, [handleTileClick]);

  return {
    selectedTileId,
  };
}

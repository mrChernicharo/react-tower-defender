import { useEffect, useState } from "react";

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
    const clickedSelectInnerRing =
      e.target.dataset?.name?.includes("select-ring-inner");
    const clickedTowerIcon = e.target.dataset?.name?.includes("tower-icon");
    const clickedPathIcon = e.target.dataset?.name?.includes("path-icon");

    if (clickedSelectInnerRing) {
      console.log("clicked inside ring");
      return setSelectedTileId(null);
    }

    if (clickedTowerIcon || clickedPathIcon) {
      console.log(`clicked ${e.target.dataset.name}`);
      return;
    }

    if (clickedTile) {
      console.log("clicked tile");
      // clicked same tile
      if (e.target.id === selectedTileId) {
        return setSelectedTileId(null);
      }

      console.log("open menu!")
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

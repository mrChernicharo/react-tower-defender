import { useEffect, useState } from "react";
import { STAGE_MAPS } from "../constants";

export function useTile() {
  const [selectedTileId, setSelectedTileId] = useState(null);

  function handleDocumentClick(e) {
    const isTile = Boolean(
      e.target.tagName === "rect" && e.target.dataset.name
    );
    // console.log({ t: e.target, c: e.currentTarget, d: e.target.dataset, isTile, selectedTileId });
    // console.log(e.target.id, selectedTileId, isTile);

    if (!isTile) {
      return;
    }
    if (e.target.id === selectedTileId) {
      return setSelectedTileId(null);
    }
    setSelectedTileId(e.target.id);
  }

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [handleDocumentClick]);

  return {
    selectedTileId,
  };
}

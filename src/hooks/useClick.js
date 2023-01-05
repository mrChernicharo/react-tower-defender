import { useEffect, useState } from "react";
import { useStore } from "../context/createFastContext";

export function useClick() {
  const [selectedTileId, setStore] = useStore((store) => store.selectedTileId);

  function handleTileClick(e) {
    // console.log({ e, s: selectedTileId, t: e.target.id });

    const clickedTower = e.target.classList.contains("tower");
    if (clickedTower) {
      const tileId = e.target.id.split("::")[0];
      console.log("clickedTower", { tileId, targetId: e.target.id });
      // setStore({ selectedTileId: tileId });
      selectedTileId === tileId
        ? setStore({ selectedTileId: null })
        : setStore({ selectedTileId: tileId });
      return;

      // if (selectedTileId) {
      //   setStore({selectedTileId: null})
      // } else {
      //   setStore({selectedTileId: tileId})
      // }
      // console.log("clicked tower, open menu!");
    }

    const clickedEnemy = e.target.dataset?.name?.includes("enemy");
    if (clickedEnemy) {
      // console.log("clicked enemy");
      return;
    }

    const clickedOutside = !e
      .composedPath()
      .find((el) => ["game-header", "stage-map-g"].includes(el.id));

    if (clickedOutside) {
      // console.log("clicked outside");
      return setStore({ selectedTileId: null });
    }

    const clickedTile = e.target.dataset?.name?.includes("tile");
    const clickedTowerIcon = e.target.dataset?.name?.includes("tower-icon");
    const clickedCreateTowerIcon =
      e.target.dataset?.name?.includes("tower-confirm-icon");
    const clickedPathIcon = e.target.dataset?.name?.includes("path-icon");
    const clickedSelectInnerRing =
      e.target.dataset?.name?.includes("select-ring-inner");

    if (clickedSelectInnerRing) {
      // console.log("clicked inside ring");
      return setStore({ selectedTileId: null });
    }

    if (clickedTowerIcon) {
      // console.log(`clicked ${e.target.dataset.name}`);
      return;
    }

    if (clickedCreateTowerIcon) {
      // console.log(`clickedCreateTowerIcon ${e.target.dataset.affordable}`);
      if (e.target.dataset.affordable === '0') return
      return setTimeout(() => setStore({ selectedTileId: null }), 0);
    }

    if (clickedPathIcon) {
      // console.log(`clicked ${e.target.dataset.name}`);
      setTimeout(() => setStore({ selectedTileId: null }), 0);
      return;
    }

    if (clickedTile) {
      console.log("clicked tile!", e.target.id, selectedTileId);

      // clicked same tile
      if (e.target.id === selectedTileId) {
        return setStore({ selectedTileId: null });
      } else {
        // console.log("open menu!");
        setStore({ selectedTileId: e.target.id });
      }
    }
  }

  useEffect(() => {
    document.addEventListener("pointerup", handleTileClick);
    return () => document.removeEventListener("pointerup", handleTileClick);
  }, [handleTileClick]);
}

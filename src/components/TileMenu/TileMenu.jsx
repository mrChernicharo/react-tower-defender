import { useStore } from "../../context/createFastContext";
import { useClick } from "../../hooks/useClick";
import PathMenu from "./PathMenu";
import TowerMenu from "./TowerMenu";

export default function TileMenu({ updateLoop }) {
  const { selectedTileId } = useClick();

  const [stages] = useStore((store) => store.stages);
  const [stageNumber] = useStore((store) => store.stageNumber);

  const activeTile = () =>
    stages[stageNumber].tiles.find((tile) => selectedTileId === tile.id);

  if (!activeTile()) return null;

  const { id, x, y, type, hasTower = false } = activeTile();

  const tileMenus = {
    grass: <TowerMenu id={id} x={x} y={y} type={type} hasTower={hasTower} />,
    path: <PathMenu id={id} x={x} y={y} type={type} updateLoop={updateLoop} />,
    mud: <g></g>,
  };

  return tileMenus[type];
}

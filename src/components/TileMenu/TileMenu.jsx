import { useStore } from "../../context/createFastContext";
import { useClick } from "../../hooks/useClick";
import PathMenu from "./PathMenu";
import TowerMenu from "./TowerMenu";

export default function TileMenu({ onPathTileCreated, onWaveCalled }) {
  const [selectedTileId] = useStore((store) => store.selectedTileId);

  const [stages] = useStore((store) => store.stages);
  const [stageNumber] = useStore((store) => store.stageNumber);

  const activeTile = () =>
    stages[stageNumber].tiles.find((tile) => selectedTileId === tile.id);

  if (!activeTile()) return null;

  const { id, x, y, type, connected = false, hasTower = false } = activeTile();

  const tileMenus = {
    grass: <TowerMenu id={id} x={x} y={y} type={type} hasTower={hasTower} />,
    path: (
      <PathMenu
        tile={activeTile()}
        onPathTileCreated={onPathTileCreated}
        onWaveCalled={onWaveCalled}
      />
    ),
    mud: <g></g>,
  };

  return tileMenus[type];
}

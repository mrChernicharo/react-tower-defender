import { useGameLoop } from "./hooks/useGameLoop";

export function GameHeader({ onGameLoop }) {
  const { clock, playing, speed, pause, play, toggleSpeed } =
    useGameLoop(onGameLoop);

  return (
    <div className="border">
      <div>{clock.toFixed(1)}</div>
      <div>{playing ? "Playing" : "Paused"}</div>
      <button className="btn" onClick={() => play()}>
        Play
      </button>
      <button className="btn" onClick={() => pause()}>
        Pause
      </button>
      <div>{speed} X</div>
      <button className="btn" onClick={() => toggleSpeed()}>
        Toggle Speed
      </button>
    </div>
  );
}

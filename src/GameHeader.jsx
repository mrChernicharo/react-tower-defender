export function GameHeader({
  clock,
  playing,
  speed,
  pause,
  play,
  toggleSpeed,
}) {
  return (
    <div
      className="border sticky flex items-center justify-around top-0 bg-gray-700"
      data-name="game-header"
      id="game-header"
    >
      <div>
        <div>{clock.toFixed(1)}</div>
        <div>{playing ? "Playing" : "Paused"}</div>
      </div>
      <div>
        <button className="btn" onClick={() => play()}>
          Play
        </button>
        <button className="btn" onClick={() => pause()}>
          Pause
        </button>
      </div>
      <div>
        <div>{speed} X</div>
        <button className="btn" onClick={() => toggleSpeed()}>
          Toggle Speed
        </button>
      </div>
    </div>
  );
}

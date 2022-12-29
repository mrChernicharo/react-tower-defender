export function GameHeader({
  clock,
  playing,
  speed,
  pause,
  play,
  toggleSpeed,
}) {
  return (
    <div className="border sticky top-0 bg-gray-700">
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

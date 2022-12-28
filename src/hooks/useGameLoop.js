import { useRef, useState } from "react";
import { useAnimationFrame } from "./useAnimationFrame";

export function useGameLoop(callback) {
  const prevTick = useRef(null)
  const [playing, setPlaying] = useState(false);
  const [clock, setClock] = useState(0);
  const [speed, setSpeed] = useState(1);

  function toggleSpeed() {
    let newSpeed;
    if (speed === 1) newSpeed = 2;
    if (speed === 2) newSpeed = 4;
    if (speed === 4) newSpeed = 1;

    setSpeed(newSpeed);

    if (playing) {
      setPlaying(false);
      setTimeout(() => {
        setPlaying(true);
      }, 0);
    }
  }

  function handleAnimationStep(tick) {
    const diff = (tick - prevTick.current) / 60
    setClock(tick / 60);
    callback(diff)
    prevTick.current = tick
  }

  useAnimationFrame(playing, speed, handleAnimationStep);

  function play() {
    setPlaying(true);
  }
  function pause() {
    setPlaying(false);
  }

  return {
    play,
    pause,
    toggleSpeed,
    clock,
    playing,
    speed
  };
}

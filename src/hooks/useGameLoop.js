import { useRef, useState } from "react";
import { useStore } from "../context/createFastContext";
import { useAnimationFrame } from "./useAnimationFrame";

export function useGameLoop(callback) {
  const prevTick = useRef(null)
  const [playing, setPlaying] = useState(false);
  const [clock, setClock] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(1);

  function play() {
    setPlaying(true);
  }
  function pause() {
    setPlaying(false);
  }

  function updateLoop() {
    pause();
    setTimeout(() => play(), 0);
  }

  function toggleSpeed() {
    let newSpeed;
    if (gameSpeed === 1) newSpeed = 2;
    if (gameSpeed === 2) newSpeed = 4;
    if (gameSpeed === 4) newSpeed = 8;
    if (gameSpeed === 8) newSpeed = 1;

    setGameSpeed(newSpeed);

    if (playing) {
      updateLoop()
    }
  }



  function handleAnimationStep(tick) {
    const diff = (tick - prevTick.current) / 60
    console.log(tick, gameSpeed)
    setClock(tick / 60);
    callback(diff)
    prevTick.current = tick
  }

  useAnimationFrame(playing, gameSpeed, handleAnimationStep);



  return {
    play,
    pause,
    toggleSpeed,
    updateLoop,
    clock,
    playing,
    gameSpeed
  };
}

import { useRef, useState } from "react";
import { useStore } from "../context/createFastContext";
import { useAnimationFrame } from "./useAnimationFrame";

export function useGameLoop(callback) {
  const [enemies] = useStore((store) => store.enemies);
  const prevTick = useRef(null);
  const [clock, setClock] = useState(0);
  const [isPlaying] = useStore((store) => store.isPlaying);
  const [gameSpeed, setStore] = useStore((store) => store.gameSpeed);
  // const [enemies] = useStore((store) => store.enemies);


  function play() {
    setStore({ isPlaying: true });
  }
  function pause() {
    setStore({ isPlaying: false });
  }

  function toggleSpeed() {
    let newSpeed;
    if (gameSpeed === 1) newSpeed = 2;
    if (gameSpeed === 2) newSpeed = 4;
    if (gameSpeed === 4) newSpeed = 8;
    if (gameSpeed === 8) newSpeed = 1;

    setStore({ gameSpeed: newSpeed });
  }

  function handleAnimationStep(frameID, tick) {
    if (isPlaying) {
      const diff = (tick - prevTick.current) / 60;
      // console.log(tick, gameSpeed)
      setClock(tick / 60);
      callback(tick, enemies || []);
      prevTick.current = tick;
    }
  }

  useAnimationFrame(handleAnimationStep);

  return {
    play,
    pause,
    toggleSpeed,
    clock,
  };
}

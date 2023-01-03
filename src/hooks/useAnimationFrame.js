import { useEffect, useRef } from "react";
import { useStore } from "../context/createFastContext";

export function useAnimationFrame(callback) {
  const frame = useRef(null);
  const tick = useRef(0);

  const [isPlaying] = useStore((store) => store.isPlaying);
  const [gameSpeed] = useStore((store) => store.gameSpeed);

  function incrementTick(speed) {
    let incr;
    if (speed === 1) incr = 1;
    if (speed === 2) incr = 2;
    if (speed === 4) incr = 4;
    if (speed === 8) incr = 8;
    // console.log("increment tick by", incr)
    tick.current += incr;
  }

  function animate(frameID) {
    incrementTick(gameSpeed);
    callback(frameID, tick.current);
    frame.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    if (isPlaying) {
      frame.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(frame.current);
    }

    return () => cancelAnimationFrame(frame.current);
  }, [isPlaying]);
}

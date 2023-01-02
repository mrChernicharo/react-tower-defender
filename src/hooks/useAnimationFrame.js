import { useEffect, useRef } from "react";

export function useAnimationFrame(playing, speed, callback) {
  const frame = useRef(null);
  const tick = useRef(0);

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
    incrementTick(speed);
    callback(tick.current);
    frame.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    if (playing) {
      frame.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(frame.current);
    }

    return () => cancelAnimationFrame(frame.current);
  }, [playing]);
}

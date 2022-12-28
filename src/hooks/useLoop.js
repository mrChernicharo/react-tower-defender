import { useEffect, useRef, useState } from "react";

export function useAnimationFrame(play = false, speed = 1, callback) {
  const frameRef = useRef(null);
  const prevTimeRef = useRef(null);

  const animate = (time) => {
    console.log(time)
    if (prevTimeRef.current != undefined) {
      const deltaTime = time - prevTimeRef.current;
      callback(deltaTime);
    }
    prevTimeRef.current = time;
    frameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (play) {
      frameRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(frameRef.current);
    }
    return () => cancelAnimationFrame(frameRef.current);
  }, [play]); // Make sure the effect runs only once
}

export function useLoop() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [clock, setClock] = useState(0);

  useAnimationFrame(isPlaying, speed, (delta) => {
    setClock((prev) => prev + delta * speed);
  });

  const play = () => {
    setIsPlaying(true);
  };
  const pause = () => {
    setIsPlaying(false);
  };
  const toggleSpeed = () => {
    switch (speed) {
      case 1:
        return setSpeed(2);
      case 2:
        return setSpeed(0.5);
      case 0.5:
        return setSpeed(1);
    }
  };

  return {
    isPlaying,
    clock: Math.round(clock),
    speed,
    play,
    pause,
    toggleSpeed,
  };
}

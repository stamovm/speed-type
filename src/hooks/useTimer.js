import { useState, useRef } from 'react';

const useTimer = (initialState = 0) => {
  const [timer, setTimer] = useState(initialState);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const countRef = useRef(null);
  const TIMER_INTERVAL = 1000; //one second

  const timerStart = () => {
    if (isActive) return;
    setIsActive(true);
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer(timer => timer + 1);
    }, TIMER_INTERVAL);
  };

  const timerPause = () => {
    clearInterval(countRef.current);
    setIsPaused(true);
  };

  const timerResume = () => {
    if (!isPaused || !isActive) return;
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer(timer => timer + 1);
    }, TIMER_INTERVAL);
  };

  const timerReset = () => {
    if (!isActive) return;
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
    if (getHours === '00') {
      return `${getMinutes}:${getSeconds}`;
    } else return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return {
    timer,
    isActive,
    isPaused,
    timerStart,
    timerPause,
    timerResume,
    timerReset,
    formatTime,
  };
};

export default useTimer;

import { useState } from 'react';

//Custom hook to setmode, transistion to different ones and go back to previous ones when called
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setHistory(prev => ([...prev.slice(0, prev.length -1), newMode]))
    } else {
      setHistory(prev => ([...prev, newMode]))
    }
    setMode(newMode)
  }
  function back() {
    if (history.length <= 1) {
      console.log("Cannot go back past the initial mode")
    } else {
      setHistory(prev => (prev.slice(0, prev.length - 1)))
      setMode(history[history.length - 2])
    }
  }

  return { mode, transition, back };
}


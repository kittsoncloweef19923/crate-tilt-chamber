/**
 * useChamber — owns one round of the puzzle.
 *
 * Everything the animation callbacks read lives in a ref (rule: refs for data
 * in callbacks, never state), and React state is only used for the values that
 * actually have to repaint: the settled board, the move count and undo depth.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Vibration } from 'react-native';
import { MOVE_ALLOWANCE, ROTATE_MS } from '../constants/config';
import { checkWin, cloneState, tilt as tiltModel } from '../game/gravity';
import { getChamber, starsFor } from '../game/levels';
import type { ChamberState, RoundResult } from '../game/types';

const EASE = Easing.bezier(0.4, 0, 0.2, 1);
const RESULT_DELAY_MS = 760;

export function useChamber(levelId: number, onResult: (r: RoundResult) => void) {
  const chamber = useMemo(() => getChamber(levelId), [levelId]);

  const [state, setState] = useState<ChamberState>(() =>
    cloneState(chamber.start),
  );
  const [undoDepth, setUndoDepth] = useState(0);

  const stateRef = useRef<ChamberState>(state);
  const historyRef = useRef<ChamberState[]>([]);
  const busyRef = useRef(false);
  const doneRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const turns = useRef(new Animated.Value(0)).current;
  const resultRef = useRef(onResult);

  resultRef.current = onResult;

  const maxMoves = chamber.par + MOVE_ALLOWANCE;

  const hardReset = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const fresh = cloneState(chamber.start);
    historyRef.current = [];
    busyRef.current = false;
    doneRef.current = false;
    stateRef.current = fresh;
    turns.setValue(0);
    setState(fresh);
    setUndoDepth(0);
  }, [chamber, turns]);

  // A new chamber id means a brand new round.
  useEffect(() => {
    hardReset();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [hardReset]);

  const finish = useCallback(
    (cleared: boolean, next: ChamberState) => {
      doneRef.current = true;
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        resultRef.current({
          cleared: cleared,
          chamberId: chamber.id,
          moves: next.moves,
          par: chamber.par,
          stars: cleared ? starsFor(next.moves, chamber.par) : 0,
        });
      }, RESULT_DELAY_MS);
    },
    [chamber],
  );

  const tilt = useCallback(
    (dir: 1 | -1) => {
      if (busyRef.current || doneRef.current) {
        return;
      }
      busyRef.current = true;
      historyRef.current.push(cloneState(stateRef.current));
      const next = tiltModel(chamber.walls, stateRef.current, dir);
      stateRef.current = next;

      Animated.timing(turns, {
        toValue: next.turns,
        duration: ROTATE_MS,
        easing: EASE,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (!finished) {
          busyRef.current = false;
          return;
        }
        setState(next);
        setUndoDepth(historyRef.current.length);
        Vibration.vibrate(14);
        busyRef.current = false;

        if (checkWin(chamber.pads, next.crates)) {
          finish(true, next);
        } else if (next.moves >= maxMoves) {
          finish(false, next);
        }
      });
    },
    [chamber, finish, maxMoves, turns],
  );

  const undo = useCallback(() => {
    if (busyRef.current || doneRef.current) {
      return;
    }
    const prev = historyRef.current.pop();
    if (!prev) {
      return;
    }
    busyRef.current = true;
    stateRef.current = prev;

    Animated.timing(turns, {
      toValue: prev.turns,
      duration: Math.round(ROTATE_MS / 1.8),
      easing: EASE,
      useNativeDriver: true,
    }).start(() => {
      setState(prev);
      setUndoDepth(historyRef.current.length);
      busyRef.current = false;
    });
  }, [turns]);

  /** Give up: hand back a "not settled" result straight away. */
  const surrender = useCallback(() => {
    if (doneRef.current) {
      return;
    }
    doneRef.current = true;
    resultRef.current({
      cleared: false,
      chamberId: chamber.id,
      moves: stateRef.current.moves,
      par: chamber.par,
      stars: 0,
    });
  }, [chamber]);

  return {
    chamber: chamber,
    crates: state.crates,
    moves: state.moves,
    par: chamber.par,
    maxMoves: maxMoves,
    turns: turns,
    canUndo: undoDepth > 0,
    tilt: tilt,
    undo: undo,
    reset: hardReset,
    surrender: surrender,
  };
}

export default useChamber;

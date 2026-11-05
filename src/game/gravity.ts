/**
 * gravity.ts — the whole physics model.
 *
 * The grid is fixed; rotating the room only changes which way gravity points,
 * which keeps walls and pads in stable coordinates and makes the solver trivial.
 */
import { GRID } from '../constants/config';
import type { ChamberState, Crate, Gravity, Pad } from './types';

/** Gravity vectors indexed by Gravity. */
export const DIRS = [
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 },
  { dx: 0, dy: -1 },
  { dx: 1, dy: 0 },
] as const;

export const cloneCrates = (crates: Crate[]): Crate[] =>
  crates.map(c => ({ ...c }));

export const cloneState = (s: ChamberState): ChamberState => ({
  crates: cloneCrates(s.crates),
  gravity: s.gravity,
  turns: s.turns,
  moves: s.moves,
});

const inBounds = (x: number, y: number) =>
  x >= 0 && y >= 0 && x < GRID && y < GRID;

export const isWall = (walls: Uint8Array, x: number, y: number) =>
  !inBounds(x, y) || walls[y * GRID + x] === 1;

function occupied(crates: Crate[], x: number, y: number, skipId: number) {
  for (let i = 0; i < crates.length; i++) {
    const c = crates[i];
    if (c.id !== skipId && c.x === x && c.y === y) {
      return true;
    }
  }
  return false;
}

/** A sticky crate grips the chamber when a wall touches either of its flanks. */
function braced(walls: Uint8Array, c: Crate, dx: number, dy: number) {
  const px = dy;
  const py = -dx;
  return (
    isWall(walls, c.x + px, c.y + py) || isWall(walls, c.x - px, c.y - py)
  );
}

/**
 * Drops every crate one cell at a time until nothing can move.
 * Mutates and returns `crates` — callers pass a clone.
 */
export function settle(
  walls: Uint8Array,
  crates: Crate[],
  gravity: Gravity,
): Crate[] {
  const { dx, dy } = DIRS[gravity];
  const order = crates.slice();
  // Crates nearest the floor resolve first so a column never overlaps itself.
  order.sort((a, b) => b.x * dx + b.y * dy - (a.x * dx + a.y * dy));

  let moved = true;
  let guard = 0;
  const maxPasses = GRID * GRID * 4;

  while (moved && guard < maxPasses) {
    guard++;
    moved = false;
    for (let i = 0; i < order.length; i++) {
      const c = order[i];
      if (c.kind === 'sticky' && braced(walls, c, dx, dy)) {
        continue;
      }
      const nx = c.x + dx;
      const ny = c.y + dy;
      if (isWall(walls, nx, ny) || occupied(crates, nx, ny, c.id)) {
        continue;
      }
      c.x = nx;
      c.y = ny;
      moved = true;
    }
  }
  return crates;
}

/** A tilt: +1 turns the room clockwise on screen, -1 counter-clockwise. */
export function tilt(
  walls: Uint8Array,
  state: ChamberState,
  dir: 1 | -1,
): ChamberState {
  // The board transform is -90deg * gravity, so a clockwise turn lowers gravity.
  const gravity = ((((state.gravity - dir) % 4) + 4) % 4) as Gravity;
  const crates = settle(walls, cloneCrates(state.crates), gravity);
  return {
    crates,
    gravity,
    turns: state.turns + dir,
    moves: state.moves + 1,
  };
}

export function padAt(pads: Pad[], x: number, y: number): Pad | null {
  for (let i = 0; i < pads.length; i++) {
    if (pads[i].x === x && pads[i].y === y) {
      return pads[i];
    }
  }
  return null;
}

export function isCrateSettled(pads: Pad[], c: Crate) {
  const p = padAt(pads, c.x, c.y);
  return p !== null && p.color === c.color;
}

/** Won when every crate rests on its own pad at the same moment. */
export function checkWin(pads: Pad[], crates: Crate[]) {
  for (let i = 0; i < crates.length; i++) {
    if (!isCrateSettled(pads, crates[i])) {
      return false;
    }
  }
  return crates.length > 0;
}

/** Position-and-colour signature, used by the generator's search. */
export function layoutKey(crates: Crate[]) {
  return crates
    .map(c => c.color + ':' + c.x + ',' + c.y)
    .sort()
    .join('|');
}

/**
 * levels.ts — deterministic chamber generator.
 *
 * Chambers are built forwards and then *labelled*: a random room is settled,
 * a breadth-first search explores every tilt sequence, and the pads are placed
 * on the crate layout that is first reachable at exactly `par` moves. That makes
 * every generated chamber provably solvable and gives an exact, minimal par.
 */
import { GRID, TOTAL_CHAMBERS } from '../constants/config';
import { cloneCrates, layoutKey, settle, tilt } from './gravity';
import type { Chamber, ChamberState, Crate, CrateKind, Gravity, Pad } from './types';

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function rand() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const kindFor = (levelId: number, index: number): CrateKind => {
  if (levelId >= 4 && (levelId + index) % 5 === 0) {
    return 'sticky';
  }
  if (levelId >= 7 && (levelId + index) % 7 === 0) {
    return 'heavy';
  }
  return 'loose';
};

interface SearchNode {
  state: ChamberState;
  depth: number;
}

/** Breadth-first over the two tilts; returns the first depth each layout appears at. */
function explore(walls: Uint8Array, start: ChamberState, maxDepth: number) {
  const firstDepth = new Map<string, number>();
  const sample = new Map<string, Crate[]>();
  const seen = new Set<string>();

  const startKey = layoutKey(start.crates);
  firstDepth.set(startKey, 0);
  sample.set(startKey, cloneCrates(start.crates));
  seen.add(startKey + '#' + start.gravity);

  let frontier: SearchNode[] = [{ state: start, depth: 0 }];

  while (frontier.length > 0) {
    const next: SearchNode[] = [];
    for (let i = 0; i < frontier.length; i++) {
      const node = frontier[i];
      if (node.depth >= maxDepth) {
        continue;
      }
      const dirs: Array<1 | -1> = [1, -1];
      for (let d = 0; d < dirs.length; d++) {
        const child = tilt(walls, node.state, dirs[d]);
        const lk = layoutKey(child.crates);
        const visitKey = lk + '#' + child.gravity;
        if (seen.has(visitKey)) {
          continue;
        }
        seen.add(visitKey);
        if (!firstDepth.has(lk)) {
          firstDepth.set(lk, node.depth + 1);
          sample.set(lk, cloneCrates(child.crates));
        }
        next.push({ state: child, depth: node.depth + 1 });
      }
    }
    frontier = next;
  }
  return { firstDepth, sample };
}

function buildAttempt(levelId: number, attempt: number): Chamber | null {
  const rand = mulberry32(levelId * 7919 + attempt * 104729 + 12345);
  const walls = new Uint8Array(GRID * GRID);

  const wallCount = 2 + Math.floor(rand() * 4);
  for (let i = 0; i < wallCount; i++) {
    const wx = 1 + Math.floor(rand() * (GRID - 2));
    const wy = 1 + Math.floor(rand() * (GRID - 2));
    walls[wy * GRID + wx] = 1;
  }

  const crateCount = 2 + (levelId % 3);
  const crates: Crate[] = [];
  let guard = 0;
  while (crates.length < crateCount && guard < 200) {
    guard++;
    const x = Math.floor(rand() * GRID);
    const y = Math.floor(rand() * (GRID - 1));
    if (walls[y * GRID + x] === 1) {
      continue;
    }
    if (crates.some(c => c.x === x && c.y === y)) {
      continue;
    }
    crates.push({
      id: crates.length,
      x,
      y,
      color: crates.length,
      kind: kindFor(levelId, crates.length),
    });
  }
  if (crates.length < crateCount) {
    return null;
  }

  const gravity: Gravity = 0;
  const start: ChamberState = {
    crates: settle(walls, crates, gravity),
    gravity,
    turns: 0,
    moves: 0,
  };

  const targetPar = Math.max(2, 3 + (levelId % 4) - Math.floor(attempt / 6));
  const { firstDepth, sample } = explore(walls, start, targetPar);

  const candidates: string[] = [];
  firstDepth.forEach((depth, key) => {
    if (depth === targetPar) {
      candidates.push(key);
    }
  });
  if (candidates.length === 0) {
    return null;
  }
  candidates.sort();
  const goal = sample.get(candidates[Math.floor(rand() * candidates.length)]);
  if (!goal) {
    return null;
  }

  const pads: Pad[] = goal.map(c => ({ x: c.x, y: c.y, color: c.color }));

  return { id: levelId, walls, pads, start, par: targetPar };
}

/** Flat fallback room — two crates, one tilt apart. Always solvable. */
function fallbackChamber(levelId: number): Chamber {
  const walls = new Uint8Array(GRID * GRID);
  const crates: Crate[] = [
    { id: 0, x: 1, y: 0, color: 0, kind: 'loose' },
    { id: 1, x: 4, y: 0, color: 1, kind: 'loose' },
  ];
  const gravity: Gravity = 0;
  const start: ChamberState = {
    crates: settle(walls, crates, gravity),
    gravity,
    turns: 0,
    moves: 0,
  };
  const after = tilt(walls, start, 1);
  const pads: Pad[] = after.crates.map(c => ({ x: c.x, y: c.y, color: c.color }));
  return { id: levelId, walls, pads, start, par: 1 };
}

const cache = new Map<number, Chamber>();

export function getChamber(levelId: number): Chamber {
  const id = ((levelId - 1 + TOTAL_CHAMBERS) % TOTAL_CHAMBERS) + 1;
  const hit = cache.get(id);
  if (hit) {
    return hit;
  }
  for (let attempt = 0; attempt < 24; attempt++) {
    const built = buildAttempt(id, attempt);
    if (built) {
      cache.set(id, built);
      return built;
    }
  }
  const fb = fallbackChamber(id);
  cache.set(id, fb);
  return fb;
}

/** Date-seeded chamber for the Daily tile. */
export function dailyChamberId(now: Date = new Date()): number {
  const key =
    now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  return (key % TOTAL_CHAMBERS) + 1;
}

export function starsFor(moves: number, par: number) {
  if (moves <= par) {
    return 3;
  }
  if (moves <= par + 2) {
    return 2;
  }
  return 1;
}

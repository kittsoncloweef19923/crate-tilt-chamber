/** Shared model types for the chamber. */

export type CrateKind = 'loose' | 'sticky' | 'heavy';

export interface Crate {
  id: number;
  x: number;
  y: number;
  /** 0..3 — also the sprite index and the glyph index. */
  color: number;
  kind: CrateKind;
}

export interface Pad {
  x: number;
  y: number;
  color: number;
}

/** Gravity direction in GRID coordinates: 0 down, 1 left, 2 up, 3 right. */
export type Gravity = 0 | 1 | 2 | 3;

export interface ChamberState {
  crates: Crate[];
  /** Gravity in grid space. The grid itself never rotates — only the view does. */
  gravity: Gravity;
  /** Signed count of visual quarter-turns applied so far (drives the board transform). */
  turns: number;
  moves: number;
}

export interface Chamber {
  id: number;
  /** GRID*GRID flags, 1 === solid wall. */
  walls: Uint8Array;
  pads: Pad[];
  start: ChamberState;
  par: number;
}

export interface RoundResult {
  cleared: boolean;
  chamberId: number;
  moves: number;
  par: number;
  stars: number;
}

/**
 * config.ts — tunable numbers + board geometry.
 * Geometry follows rule #4: the parent frame (padding + border) is subtracted
 * BEFORE the cell size is derived, so cells can never stick out of the board.
 */
import { Dimensions } from 'react-native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

export { SCREEN_W, SCREEN_H };

/** Splash length. MUST stay 8000 — shorter races the screenshot capture window. */
export const LOADER_DURATION_MS = 8000;

export const GRID = 6;
export const ROTATE_MS = 360;
export const SETTLE_MS = 190;
export const TOTAL_CHAMBERS = 130;
export const MOVE_ALLOWANCE = 6; // extra tilts granted on top of par

export const HEADER_TOP_PAD = 44;
export const HEADER_BODY_H = 72;
export const HEADER_H = HEADER_TOP_PAD + HEADER_BODY_H;

export const HUD_H = 58;
export const CONTROLS_RESERVE = 152;

export const BOARD_PAD = 10;
export const BOARD_BORDER = 3;
export const BOARD_FRAME = BOARD_PAD + BOARD_BORDER; // 13

const BOARD_MAX_W = Math.min(SCREEN_W - 32, 380);
const BOARD_MAX_H = Math.max(
  220,
  SCREEN_H - HEADER_H - HUD_H - CONTROLS_RESERVE - 24,
);
const BOARD_LIMIT = Math.min(BOARD_MAX_W, BOARD_MAX_H);

export const CELL = Math.floor((BOARD_LIMIT - 2 * BOARD_FRAME) / GRID);
export const BOARD = CELL * GRID + 2 * BOARD_FRAME;

/** Width shared by every full-width button so Pressables always have an explicit size. */
export const BTN_W = Math.min(SCREEN_W - 40, 352);
export const BTN_H_PRIMARY = 60;
export const BTN_H_SECONDARY = 50;
export const CONTROL_SIZE = 64;
export const UNDO_SIZE = 56;

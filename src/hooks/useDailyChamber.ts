/**
 * useDailyChamber — the date-seeded chamber shown on the Menu's daily tile.
 * Memoised per mount; the id only changes when the calendar day does.
 */
import { useMemo } from 'react';
import { dailyChamberId } from '../game/levels';

export function useDailyChamber() {
  return useMemo(() => dailyChamberId(), []);
}

export default useDailyChamber;

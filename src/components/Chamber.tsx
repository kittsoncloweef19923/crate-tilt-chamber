/**
 * Chamber — the board.
 *
 * The grid never rotates in the model; only this container does. `turns` is a
 * signed count of quarter-turns and feeds an interpolation that extends past
 * the input range, so the room can keep spinning in one direction forever.
 */
import React, { useMemo } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import theme from '../constants/theme';
import { BOARD, BOARD_BORDER, BOARD_FRAME, BOARD_PAD, CELL, GRID } from '../constants/config';
import { isCrateSettled, isWall, padAt } from '../game/gravity';
import type { Crate as CrateModel, Pad } from '../game/types';
import Crate from './Crate';
import PadMarker from './PadMarker';

interface Props {
  walls: Uint8Array;
  pads: Pad[];
  crates: CrateModel[];
  /** Animated quarter-turn counter driven by GameScreen. */
  turns: Animated.Value;
}

function Chamber({ walls, pads, crates, turns }: Props) {
  const rotate = useMemo(
    () =>
      turns.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-90deg', '90deg'],
      }),
    [turns],
  );

  const wallCells = useMemo(() => {
    const out: number[] = [];
    for (let i = 0; i < GRID * GRID; i++) {
      if (walls[i] === 1) {
        out.push(i);
      }
    }
    return out;
  }, [walls]);

  const gridLines = useMemo(() => {
    const out: number[] = [];
    for (let i = 1; i < GRID; i++) {
      out.push(i);
    }
    return out;
  }, []);

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[styles.board, { transform: [{ rotate: rotate }] }]}>
      <View pointerEvents="none" style={styles.well}>
        {gridLines.map(i => (
          <View
            key={'v' + i}
            style={[styles.vLine, { left: i * CELL }]}
          />
        ))}
        {gridLines.map(i => (
          <View
            key={'h' + i}
            style={[styles.hLine, { top: i * CELL }]}
          />
        ))}
      </View>

      {wallCells.map(i => (
        <View
          key={'w' + i}
          pointerEvents="none"
          style={[
            styles.wall,
            {
              width: CELL - 4,
              height: CELL - 4,
              left: BOARD_FRAME + (i % GRID) * CELL + 2,
              top: BOARD_FRAME + Math.floor(i / GRID) * CELL + 2,
            },
          ]}
        />
      ))}

      {pads.map(p => (
        <PadMarker
          key={'p' + p.x + '-' + p.y}
          x={p.x}
          y={p.y}
          color={p.color}
          cell={CELL}
          frame={BOARD_FRAME}
          matched={crates.some(
            c => c.x === p.x && c.y === p.y && c.color === p.color,
          )}
        />
      ))}

      {crates.map(c => (
        <Crate
          key={'c' + c.id}
          x={c.x}
          y={c.y}
          color={c.color}
          kind={c.kind}
          cell={CELL}
          frame={BOARD_FRAME}
          settled={isCrateSettled(pads, c)}
        />
      ))}

      <View pointerEvents="none" style={[styles.rivet, styles.rivetTL]} />
      <View pointerEvents="none" style={[styles.rivet, styles.rivetTR]} />
      <View pointerEvents="none" style={[styles.rivet, styles.rivetBL]} />
      <View pointerEvents="none" style={[styles.rivet, styles.rivetBR]} />
    </Animated.View>
  );
}

/** Re-exported so screens can show which pad a crate still has to reach. */
export { padAt, isWall };

const styles = StyleSheet.create({
  board: {
    width: BOARD,
    height: BOARD,
    padding: BOARD_PAD,
    borderWidth: BOARD_BORDER,
    borderColor: theme.colors.neon.cyan + '55',
    borderRadius: theme.radius.lg,
    backgroundColor: 'rgba(5, 18, 16, 0.86)',
    shadowColor: theme.colors.neon.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 26,
    elevation: 14,
  },
  well: {
    width: CELL * GRID,
    height: CELL * GRID,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 6,
  },
  vLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(242, 193, 78, 0.12)',
  },
  hLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(242, 193, 78, 0.12)',
  },
  wall: {
    position: 'absolute',
    borderRadius: 6,
    backgroundColor: '#123029',
    borderWidth: 1,
    borderColor: theme.colors.neon.purple + '55',
  },
  rivet: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.neon.cyan + '88',
  },
  rivetTL: { left: 5, top: 5 },
  rivetTR: { right: 5, top: 5 },
  rivetBL: { left: 5, bottom: 5 },
  rivetBR: { right: 5, bottom: 5 },
});

export default React.memo(Chamber);

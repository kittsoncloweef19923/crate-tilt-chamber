/**
 * GameScreen — the chamber (G2: board centred, controls floating above it).
 *
 * The board owns the whole flex area minus CONTROLS_RESERVE, so the floating
 * tilt bar can never cover a cell.
 */
import React, { useCallback, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RotateCcw, RotateCw, Undo2 } from 'lucide-react-native';
import theme, { CRATE_COLORS, CRATE_GLYPHS } from '../constants/theme';
import { CONTROLS_RESERVE, CONTROL_SIZE, HUD_H, UNDO_SIZE } from '../constants/config';
import assets from '../assets';
import ScreenHeader, { HeaderIconButton } from '../components/ScreenHeader';
import Chamber from '../components/Chamber';
import RoundControl from '../components/RoundControl';
import PauseModal from '../components/PauseModal';
import useChamber from '../hooks/useChamber';
import { isCrateSettled } from '../game/gravity';
import type { RoundResult } from '../game/types';

interface Props {
  level: number;
  onGameOver: (result: RoundResult) => void;
  onExit: () => void;
}

function GameScreen({ level, onGameOver, onExit }: Props) {
  const {
    chamber,
    crates,
    moves,
    par,
    maxMoves,
    turns,
    canUndo,
    tilt,
    undo,
    reset,
  } = useChamber(level, onGameOver);

  const [paused, setPaused] = useState(false);

  const tiltLeft = useCallback(() => tilt(-1), [tilt]);
  const tiltRight = useCallback(() => tilt(1), [tilt]);
  const openPause = useCallback(() => setPaused(true), []);
  const closePause = useCallback(() => setPaused(false), []);
  const restart = useCallback(() => {
    setPaused(false);
    reset();
  }, [reset]);
  const quit = useCallback(() => {
    setPaused(false);
    onExit();
  }, [onExit]);

  const left = maxMoves - moves;
  const movesTone =
    left > 3
      ? theme.colors.neon.cyan
      : left > 1
      ? theme.colors.neon.yellow
      : theme.colors.neon.pink;

  return (
    <ImageBackground source={assets.bgGame} style={styles.bg} resizeMode="cover">
      <View style={styles.ink} />
      <LinearGradient
        colors={['rgba(6, 15, 13, 0.72)', 'rgba(11, 58, 51, 0.88)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.wash}
      />

      <ScreenHeader
        title={'CHAMBER ' + chamber.id}
        caption={'PAR ' + par}
        leftSlot={
          <HeaderIconButton
            source={assets.iconHome}
            label="WAREHOUSE"
            onPress={onExit}
          />
        }
        rightSlot={
          <HeaderIconButton
            source={assets.iconPause}
            label="PAUSE"
            onPress={openPause}
            tone={theme.colors.neon.pink}
          />
        }
      />

      <View style={styles.hud}>
        <View style={[styles.movesChip, { borderColor: movesTone + '66' }]}>
          <Text style={[styles.movesValue, { color: movesTone }]}>
            {moves + '/' + maxMoves}
          </Text>
          <Text style={styles.movesLabel}>MOVES</Text>
        </View>

        <View style={styles.goals}>
          {crates.map(c => {
            const tone = CRATE_COLORS[c.color % CRATE_COLORS.length];
            const done = isCrateSettled(chamber.pads, c);
            return (
              <View
                key={'g' + c.id}
                style={[
                  styles.goalChip,
                  {
                    borderColor: tone + (done ? 'FF' : '55'),
                    backgroundColor: done ? tone + '24' : 'transparent',
                  },
                ]}>
                <Text style={[styles.goalGlyph, { color: tone }]}>
                  {CRATE_GLYPHS[c.color % CRATE_GLYPHS.length]}
                </Text>
                <Text style={[styles.goalMark, { color: tone }]}>
                  {done ? '✓' : '·'}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.arena}>
        <Chamber
          walls={chamber.walls}
          pads={chamber.pads}
          crates={crates}
          turns={turns}
        />
      </View>

      <View style={styles.controls} pointerEvents="box-none">
        <RoundControl
          Icon={RotateCcw}
          label="TILT LEFT"
          onPress={tiltLeft}
          size={CONTROL_SIZE}
          tone={theme.colors.neon.cyan}
        />
        <RoundControl
          Icon={Undo2}
          label="UNDO"
          onPress={undo}
          size={UNDO_SIZE}
          iconSize={24}
          tone={theme.colors.neon.yellow}
          disabled={!canUndo}
        />
        <RoundControl
          Icon={RotateCw}
          label="TILT RIGHT"
          onPress={tiltRight}
          size={CONTROL_SIZE}
          tone={theme.colors.neon.pink}
        />
      </View>

      <PauseModal
        visible={paused}
        chamberId={chamber.id}
        moves={moves}
        par={par}
        onResume={closePause}
        onRestart={restart}
        onQuit={quit}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: theme.colors.bg.primary,
  },
  ink: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 16, 14, 0.80)',
  },
  wash: {
    ...StyleSheet.absoluteFillObject,
  },
  hud: {
    height: HUD_H,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  movesChip: {
    height: 38,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    backgroundColor: 'rgba(12, 34, 30, 0.92)',
  },
  movesValue: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  movesLabel: {
    fontSize: 9,
    lineHeight: 12,
    fontWeight: '700',
    letterSpacing: 1.4,
    color: theme.colors.text.secondary,
  },
  goals: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  goalChip: {
    width: 38,
    height: 38,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalGlyph: {
    fontSize: 13,
    lineHeight: 15,
    fontWeight: '900',
  },
  goalMark: {
    fontSize: 9,
    lineHeight: 11,
    fontWeight: '900',
  },
  arena: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: CONTROLS_RESERVE,
  },
  controls: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 28,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
});

export default React.memo(GameScreen);

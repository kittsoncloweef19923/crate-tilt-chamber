/**
 * Crate — one crate on the board.
 *
 * Position is driven by translateX/translateY (native driver safe) so a crate
 * slides into its new cell after the room settles instead of teleporting.
 * The sprite is a plain transparent <Image> — never a masked circle wrapper.
 */
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, Text } from 'react-native';
import { CRATE_COLORS, CRATE_GLYPHS } from '../constants/theme';
import { CRATE_SPRITES } from '../assets';
import { SETTLE_MS } from '../constants/config';
import type { CrateKind } from '../game/types';

interface Props {
  x: number;
  y: number;
  color: number;
  kind: CrateKind;
  cell: number;
  frame: number;
  settled: boolean;
}

function Crate({ x, y, color, kind, cell, frame, settled }: Props) {
  const tx = useRef(new Animated.Value(frame + x * cell)).current;
  const ty = useRef(new Animated.Value(frame + y * cell)).current;
  const pop = useRef(new Animated.Value(1)).current;
  const first = useRef(true);

  useEffect(() => {
    const targetX = frame + x * cell;
    const targetY = frame + y * cell;
    if (first.current) {
      first.current = false;
      tx.setValue(targetX);
      ty.setValue(targetY);
      return;
    }
    Animated.parallel([
      Animated.timing(tx, {
        toValue: targetX,
        duration: SETTLE_MS,
        easing: Easing.bezier(0.3, 0, 0.2, 1),
        useNativeDriver: true,
      }),
      Animated.timing(ty, {
        toValue: targetY,
        duration: SETTLE_MS,
        easing: Easing.bezier(0.3, 0, 0.2, 1),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(SETTLE_MS - 40),
        Animated.timing(pop, {
          toValue: 1.1,
          duration: 70,
          useNativeDriver: true,
        }),
        Animated.spring(pop, {
          toValue: 1,
          tension: 180,
          friction: 6,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [x, y, cell, frame, tx, ty, pop]);

  const tone = CRATE_COLORS[color % CRATE_COLORS.length];
  const face = cell - 6;
  const art = Math.round(cell * 0.5);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.slot,
        {
          width: cell,
          height: cell,
          transform: [
            { translateX: tx },
            { translateY: ty },
            { scale: pop },
          ],
        },
      ]}>
      <Animated.View
        style={[
          styles.face,
          {
            width: face,
            height: face,
            borderColor: tone,
            borderWidth: kind === 'heavy' ? 3 : 2,
            borderStyle: kind === 'sticky' ? 'dashed' : 'solid',
            backgroundColor: settled ? tone + '3A' : tone + '18',
            shadowColor: tone,
          },
        ]}>
        <Image
          source={CRATE_SPRITES[color % CRATE_SPRITES.length]}
          style={{ width: art, height: art, resizeMode: 'contain' }}
        />
        <Text style={[styles.glyph, { color: tone }]}>
          {CRATE_GLYPHS[color % CRATE_GLYPHS.length]}
        </Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  slot: {
    position: 'absolute',
    left: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  face: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
  glyph: {
    marginTop: 1,
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
});

export default React.memo(Crate);

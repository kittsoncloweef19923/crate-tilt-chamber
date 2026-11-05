/**
 * PadMarker — the floor pad a crate of the same colour has to come to rest on.
 * Tinted sprite_5 plate + the crate's ASCII glyph, so the target never depends
 * on colour alone.
 */
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { CRATE_COLORS, CRATE_GLYPHS } from '../constants/theme';
import { PAD_SPRITE } from '../assets';

interface Props {
  x: number;
  y: number;
  color: number;
  cell: number;
  frame: number;
  matched: boolean;
}

function PadMarker({ x, y, color, cell, frame, matched }: Props) {
  const tone = CRATE_COLORS[color % CRATE_COLORS.length];
  const size = cell - 12;
  const art = Math.round(cell * 0.46);

  return (
    <View
      pointerEvents="none"
      style={[
        styles.slot,
        { width: cell, height: cell, left: frame + x * cell, top: frame + y * cell },
      ]}>
      <View
        style={[
          styles.ring,
          {
            width: size,
            height: size,
            borderColor: matched ? tone : tone + '66',
            backgroundColor: matched ? tone + '26' : 'transparent',
            shadowColor: tone,
            shadowOpacity: matched ? 0.8 : 0,
          },
        ]}>
        <Image
          source={PAD_SPRITE}
          style={[
            styles.art,
            { width: art, height: art, tintColor: tone, opacity: matched ? 0.9 : 0.45 },
          ]}
        />
        <Text
          style={[
            styles.glyph,
            { color: tone, opacity: matched ? 1 : 0.65 },
          ]}>
          {CRATE_GLYPHS[color % CRATE_GLYPHS.length]}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slot: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    borderRadius: 9,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
  },
  art: {
    resizeMode: 'contain',
  },
  glyph: {
    fontSize: 9,
    lineHeight: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
});

export default React.memo(PadMarker);

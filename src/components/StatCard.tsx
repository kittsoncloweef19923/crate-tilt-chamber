/**
 * StatCard — the ONLY stat pill in the app (Menu, Game HUD, GameOver all use it).
 *
 * Icons are lucide SVGs, so every icon occupies the same 22x22 canvas no matter
 * which glyph is picked; the semantics are carried by `tone`, the value and the
 * label. `width: '100%'` — never `flex: 1` — because the parent slot is already
 * flex:1 and nesting the two collapses the card to a sliver.
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import theme from '../constants/theme';
import type { IconComponent } from './icons';

export const STAT_CARD_H = 108;

const ICON_WRAP = 40;
const ICON_SIZE = 22;

interface Props {
  Icon: IconComponent;
  value: string;
  label: string;
  tone?: string;
  style?: StyleProp<ViewStyle>;
}

function StatCard({ Icon, value, label, tone, style }: Props) {
  const color = tone && tone.length > 0 ? tone : theme.colors.neon.cyan;
  return (
    <View
      style={[
        styles.card,
        { borderColor: color + '55', shadowColor: color },
        style,
      ]}>
      <View style={[styles.iconWrap, { backgroundColor: color + '22' }]}>
        <Icon size={ICON_SIZE} color={color} strokeWidth={2.25} />
      </View>
      <Text numberOfLines={1} style={[styles.value, { color: color }]}>
        {value}
      </Text>
      <Text numberOfLines={1} style={styles.label}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: STAT_CARD_H,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    backgroundColor: theme.colors.bg.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  iconWrap: {
    width: ICON_WRAP,
    height: ICON_WRAP,
    borderRadius: ICON_WRAP / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    marginTop: 6,
    fontSize: 21,
    lineHeight: 25,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  label: {
    marginTop: 1,
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: theme.colors.text.secondary,
  },
});

export default React.memo(StatCard);

/**
 * NeonSurface — the one place the raised/recessed surface treatment is defined.
 * Every card, tile and panel in the app composes this instead of restyling.
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import theme from '../constants/theme';

type Variant = 'raised' | 'inset' | 'glass';

interface Props {
  variant?: Variant;
  glow?: string;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

function NeonSurface({ variant = 'raised', glow, style, children }: Props) {
  const tone = glow && glow.length > 0 ? glow : theme.colors.neon.cyan;
  return (
    <View
      style={[
        styles.base,
        variant === 'raised' ? styles.raised : null,
        variant === 'inset' ? styles.inset : null,
        variant === 'glass' ? styles.glass : null,
        variant === 'raised'
          ? { borderColor: tone + '33', shadowColor: tone }
          : null,
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
  },
  raised: {
    backgroundColor: theme.colors.bg.secondary,
    borderColor: theme.colors.ui.border,
    shadowColor: theme.colors.neon.cyan,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 8,
  },
  inset: {
    backgroundColor: 'rgba(4, 13, 11, 0.72)',
    borderColor: theme.colors.ui.divider,
  },
  glass: {
    backgroundColor: theme.colors.ui.glass,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
});

export default React.memo(NeonSurface);

/**
 * BentoTile — a pressable cell of the Menu bento hub.
 * Composition over flags: the tile only owns the surface + press feedback and
 * renders whatever children the Menu composes into it.
 */
import React, { useCallback, useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import theme from '../constants/theme';

const HIT = { top: 6, bottom: 6, left: 6, right: 6 };

interface Props {
  label: string;
  onPress: () => void;
  tone?: string;
  width: number;
  height: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

function BentoTile({
  label,
  onPress,
  tone = theme.colors.neon.cyan,
  width,
  height,
  style,
  children,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.97,
      tension: 220,
      friction: 11,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  const pressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      tension: 130,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={HIT}
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      style={[{ width: width, height: height }, style]}>
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.tile,
          {
            width: width,
            height: height,
            borderColor: tone + '44',
            shadowColor: tone,
            transform: [{ scale: scale }],
          },
        ]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    backgroundColor: theme.colors.bg.secondary,
    padding: 14,
    justifyContent: 'space-between',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 7,
  },
});

export default React.memo(BentoTile);

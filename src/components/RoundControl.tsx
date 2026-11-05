/**
 * RoundControl — the floating circular tilt / undo controls.
 * The round Codex plate sits behind a lucide glyph of a fixed 28px canvas.
 */
import React, { useCallback, useRef } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import theme from '../constants/theme';
import type { IconComponent } from './icons';
import assets from '../assets';

const HIT = { top: 8, bottom: 8, left: 8, right: 8 };

interface Props {
  Icon: IconComponent;
  label: string;
  onPress: () => void;
  size?: number;
  iconSize?: number;
  tone?: string;
  disabled?: boolean;
}

function RoundControl({
  Icon,
  label,
  onPress,
  size = 64,
  iconSize = 28,
  tone = theme.colors.neon.cyan,
  disabled = false,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.9,
      tension: 240,
      friction: 10,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  const pressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      tension: 140,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  const color = disabled ? theme.colors.text.muted : tone;

  return (
    <View style={styles.wrap}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled: disabled }}
        disabled={disabled}
        hitSlop={HIT}
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        style={{ width: size, height: size }}>
        <Animated.View
          pointerEvents="box-none"
          style={[
            styles.circle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderColor: color + '77',
              shadowColor: color,
              opacity: disabled ? 0.45 : 1,
              transform: [{ scale: scale }],
            },
          ]}>
          <Image
            source={assets.buttonRound}
            style={[
              styles.plate,
              { width: size, height: size, borderRadius: size / 2 },
            ]}
          />
          <Icon size={iconSize} color={color} strokeWidth={2.25} />
        </Animated.View>
      </Pressable>
      <Text numberOfLines={1} style={[styles.label, { color: color }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  circle: {
    borderWidth: 2,
    backgroundColor: 'rgba(12, 34, 30, 0.94)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 18,
    elevation: 10,
  },
  plate: {
    position: 'absolute',
    opacity: 0.55,
    resizeMode: 'contain',
  },
  label: {
    marginTop: 8,
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '800',
    letterSpacing: 1.3,
  },
});

export default React.memo(RoundControl);

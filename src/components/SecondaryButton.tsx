/** SecondaryButton — h50 outlined counterpart of PrimaryButton, same press model. */
import React, { useCallback, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import theme from '../constants/theme';
import type { IconComponent } from './icons';
import { BTN_H_SECONDARY, BTN_W } from '../constants/config';

const HIT = { top: 8, bottom: 8, left: 8, right: 8 };
const ICON_SIZE = 24;

interface Props {
  label: string;
  onPress: () => void;
  Icon?: IconComponent;
  tone?: string;
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

function SecondaryButton({
  label,
  onPress,
  Icon,
  tone = theme.colors.neon.cyan,
  width = BTN_W,
  height = BTN_H_SECONDARY,
  style,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.96,
      tension: 200,
      friction: 10,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  const pressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      tension: 120,
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
          styles.shell,
          {
            width: width,
            height: height,
            borderColor: tone + '66',
            shadowColor: tone,
            transform: [{ scale: scale }],
          },
        ]}>
        <View style={styles.row}>
          {Icon ? <Icon size={ICON_SIZE} color={tone} strokeWidth={2} /> : null}
          <Text numberOfLines={1} style={[styles.label, { color: tone }]}>
            {label}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shell: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    backgroundColor: 'rgba(12, 34, 30, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  label: {
    fontSize: 14,
    lineHeight: ICON_SIZE,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
});

export default React.memo(SecondaryButton);

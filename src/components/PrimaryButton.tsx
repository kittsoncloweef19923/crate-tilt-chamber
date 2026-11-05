/**
 * PrimaryButton — h60 gradient CTA.
 * Pressable is the PARENT and owns the touch; the Animated.View that scales
 * lives INSIDE it, so a native-driver transform can never swallow onPress.
 */
import React, { useCallback, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../constants/theme';
import type { IconComponent } from './icons';
import { BTN_H_PRIMARY, BTN_W } from '../constants/config';

const HIT = { top: 8, bottom: 8, left: 8, right: 8 };
const ICON_SIZE = 24;

interface Props {
  label: string;
  onPress: () => void;
  Icon?: IconComponent;
  colors?: string[];
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

function PrimaryButton({
  label,
  onPress,
  Icon,
  colors,
  width = BTN_W,
  height = BTN_H_PRIMARY,
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

  const tint = colors && colors.length > 1 ? colors : theme.gradients.primary;

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
            shadowColor: tint[0],
            transform: [{ scale: scale }],
          },
        ]}>
        <LinearGradient
          colors={tint}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.fill, { height: height }]}>
          <View style={styles.row}>
            {Icon ? (
              <Icon size={ICON_SIZE} color="#FFFFFF" strokeWidth={2} />
            ) : null}
            <Text numberOfLines={1} style={styles.label}>
              {label}
            </Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shell: {
    borderRadius: theme.radius.md,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 12,
  },
  fill: {
    flex: 1,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.22)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  label: {
    fontSize: 16,
    lineHeight: ICON_SIZE,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: '#FFFFFF',
  },
});

export default React.memo(PrimaryButton);

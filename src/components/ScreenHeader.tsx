/**
 * ScreenHeader — the single header used by every screen (Menu, Game, GameOver,
 * Guide). Screens differ only through leftSlot / title / caption / rightSlot, so
 * the padding, divider and badge styling can never drift apart between screens.
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
import type { ImageSourcePropType } from 'react-native';
import theme from '../constants/theme';
import { HEADER_BODY_H, HEADER_TOP_PAD } from '../constants/config';

const HIT = { top: 8, bottom: 8, left: 8, right: 8 };
export const HEADER_SLOT = 44;

interface IconButtonProps {
  source: ImageSourcePropType;
  label: string;
  onPress: () => void;
  tone?: string;
}

/** Round icon button used in the header slots. Pressable parent, Animated child. */
export function HeaderIconButton({
  source,
  label,
  onPress,
  tone = theme.colors.neon.cyan,
}: IconButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.9,
      tension: 220,
      friction: 10,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  const pressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      tension: 140,
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
      style={styles.slot}>
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.slotInner,
          { borderColor: tone + '55', transform: [{ scale: scale }] },
        ]}>
        <Image source={source} style={styles.slotIcon} />
      </Animated.View>
    </Pressable>
  );
}

interface Props {
  title: string;
  caption?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

function ScreenHeader({ title, caption, leftSlot, rightSlot }: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.side}>{leftSlot ?? null}</View>
      <View style={styles.center}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        {caption ? (
          <Text numberOfLines={1} style={styles.caption}>
            {caption}
          </Text>
        ) : null}
      </View>
      <View style={styles.sideRight}>{rightSlot ?? null}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: HEADER_TOP_PAD + HEADER_BODY_H,
    paddingTop: HEADER_TOP_PAD,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(5, 16, 14, 0.62)',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ui.border,
  },
  side: {
    width: 64,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  sideRight: {
    width: 64,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: '800',
    letterSpacing: 2.4,
    color: theme.colors.text.primary,
  },
  caption: {
    marginTop: 2,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    letterSpacing: 1.6,
    color: theme.colors.text.secondary,
  },
  slot: {
    width: HEADER_SLOT,
    height: HEADER_SLOT,
  },
  slotInner: {
    width: HEADER_SLOT,
    height: HEADER_SLOT,
    borderRadius: HEADER_SLOT / 2,
    borderWidth: 1,
    backgroundColor: 'rgba(12, 34, 30, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default React.memo(ScreenHeader);

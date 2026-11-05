/**
 * GameOverScreen — the end of a round.
 *
 * Decoration sits strictly below the result plate so nothing ever crosses a
 * letter of the headline.
 */
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowBigRight, Gauge, Layers, Repeat, Target } from 'lucide-react-native';
import theme from '../constants/theme';
import { SCREEN_W } from '../constants/config';
import assets from '../assets';
import ScreenHeader, { HeaderIconButton } from '../components/ScreenHeader';
import StatCard from '../components/StatCard';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import type { RoundResult } from '../game/types';

const PAD = 16;
const CONTENT_W = SCREEN_W - PAD * 2;
const STARS = [0, 1, 2];

interface Props {
  result: RoundResult;
  streak: number;
  onPlayAgain: () => void;
  onNext: () => void;
  onMenu: () => void;
}

function GameOverScreen({
  result,
  streak,
  onPlayAgain,
  onNext,
  onMenu,
}: Props) {
  const rise = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(rise, {
      toValue: 1,
      tension: 60,
      friction: 9,
      useNativeDriver: true,
    }).start();
  }, [rise]);

  const cleared = result.cleared;
  const tone = cleared ? theme.colors.neon.green : theme.colors.neon.pink;
  const translateY = rise.interpolate({
    inputRange: [0, 1],
    outputRange: [26, 0],
  });

  return (
    <ImageBackground source={assets.bgGame} style={styles.bg} resizeMode="cover">
      <View style={styles.ink} />
      <LinearGradient
        colors={
          cleared
            ? ['rgba(47, 214, 126, 0.20)', 'rgba(6, 15, 13, 0.95)']
            : ['rgba(255, 45, 85, 0.18)', 'rgba(6, 15, 13, 0.95)']
        }
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.wash}
      />

      <ScreenHeader
        title="RESULT"
        caption={'CHAMBER ' + result.chamberId}
        leftSlot={
          <HeaderIconButton
            source={assets.iconHome}
            label="WAREHOUSE"
            onPress={onMenu}
          />
        }
        rightSlot={
          <View style={[styles.chip, { borderColor: tone + '66' }]}>
            <Text style={[styles.chipText, { color: tone }]}>
              {'x' + streak}
            </Text>
          </View>
        }
      />

      <View style={styles.body}>
        <Animated.View
          pointerEvents="box-none"
          style={[styles.heroWrap, { transform: [{ translateY: translateY }] }]}>
          <View style={[styles.plate, { borderColor: tone + '55', shadowColor: tone }]}>
            <Text style={[styles.kicker, { color: tone }]}>
              {cleared ? 'GRAVITY SOLVED' : 'CRATES ADRIFT'}
            </Text>
            <Text style={styles.hero}>
              {cleared ? 'CHAMBER CLEARED' : 'NOT SETTLED'}
            </Text>
            <View style={styles.stars}>
              {STARS.map(i => (
                <Text
                  key={'s' + i}
                  style={[
                    styles.star,
                    {
                      color: i < result.stars ? theme.colors.neon.yellow : theme.colors.text.muted,
                    },
                  ]}>
                  ★
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.decor}>
            <Image source={assets.sprite5} style={styles.decorArt} />
            <View style={[styles.decorGlow, { backgroundColor: tone + '33' }]} />
            <Image source={assets.sprite5} style={styles.decorArt} />
          </View>
        </Animated.View>

        <View style={styles.row}>
          <View style={styles.slot}>
            <StatCard
              Icon={Gauge}
              value={String(result.moves)}
              label="MOVES"
              tone={theme.colors.neon.cyan}
            />
          </View>
          <View style={styles.slot}>
            <StatCard
              Icon={Target}
              value={String(result.par)}
              label="PAR"
              tone={theme.colors.neon.yellow}
            />
          </View>
          <View style={styles.slot}>
            <StatCard
              Icon={Layers}
              value={String(result.chamberId)}
              label="CHAMBER"
              tone={theme.colors.neon.purple}
            />
          </View>
        </View>

        <View style={styles.actions}>
          <PrimaryButton
            label="PLAY AGAIN"
            Icon={Repeat}
            onPress={onPlayAgain}
            width={CONTENT_W}
            colors={cleared ? theme.gradients.primary : theme.gradients.lose}
          />
          {cleared ? (
            <SecondaryButton
              label="NEXT CHAMBER"
              Icon={ArrowBigRight}
              onPress={onNext}
              width={CONTENT_W}
              tone={theme.colors.neon.green}
            />
          ) : null}
          <SecondaryButton
            label="WAREHOUSE"
            onPress={onMenu}
            width={CONTENT_W}
            tone={theme.colors.text.secondary}
          />
        </View>
      </View>
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
    backgroundColor: 'rgba(5, 16, 14, 0.86)',
  },
  wash: {
    ...StyleSheet.absoluteFillObject,
  },
  body: {
    flex: 1,
    paddingHorizontal: PAD,
    paddingTop: 16,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  heroWrap: {
    alignItems: 'center',
  },
  plate: {
    width: CONTENT_W,
    paddingVertical: 22,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    backgroundColor: theme.colors.bg.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 22,
    elevation: 12,
  },
  kicker: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '800',
    letterSpacing: 3,
  },
  hero: {
    marginTop: 10,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '900',
    letterSpacing: -0.5,
    textAlign: 'center',
    color: theme.colors.text.primary,
  },
  stars: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 10,
  },
  star: {
    fontSize: 24,
    lineHeight: 28,
  },
  decor: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  decorArt: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
    opacity: 0.8,
  },
  decorGlow: {
    width: 90,
    height: 3,
    borderRadius: 2,
  },
  chip: {
    height: 30,
    paddingHorizontal: 12,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    backgroundColor: 'rgba(12, 34, 30, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '800',
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  slot: {
    flex: 1,
  },
  actions: {
    alignItems: 'center',
    gap: 12,
  },
});

export default React.memo(GameOverScreen);

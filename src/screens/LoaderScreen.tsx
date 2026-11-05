/**
 * LoaderScreen — 8s branded splash.
 *
 * Deliberately the darkest screen in the app (0.92 ink overlay + deep gradient,
 * no chips, no CTA) so it can never be mistaken for the Menu.
 */
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../constants/theme';
import { LOADER_DURATION_MS, SCREEN_W } from '../constants/config';
import assets from '../assets';

const PLATE = 184;
const LOGO = 128;
const TRACK_W = Math.min(SCREEN_W - 96, 260);

interface Props {
  onDone: () => void;
}

function LoaderScreen({ onDone }: Props) {
  const sway = useRef(new Animated.Value(0)).current;
  const fill = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const doneRef = useRef(onDone);

  doneRef.current = onDone;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(sway, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(sway, {
          toValue: -1,
          duration: 1500,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();

    Animated.timing(fade, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Width cannot run on the native driver — this is the one JS-driven tween.
    Animated.timing(fill, {
      toValue: 1,
      duration: LOADER_DURATION_MS - 300,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(() => doneRef.current(), LOADER_DURATION_MS);
    return () => {
      clearTimeout(timer);
      loop.stop();
    };
  }, [fade, fill, sway]);

  const tilt = sway.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-5deg', '5deg'],
  });

  const barWidth = fill.interpolate({
    inputRange: [0, 1],
    outputRange: [0, TRACK_W],
  });

  return (
    <ImageBackground source={assets.bgGame} style={styles.bg} resizeMode="cover">
      <View style={styles.ink} />
      <LinearGradient
        colors={theme.gradients.loader}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={styles.wash}
      />

      <Animated.View style={[styles.content, { opacity: fade }]}>
        <Animated.View
          style={[styles.plate, { transform: [{ rotate: tilt }] }]}>
          <Image source={assets.logo} style={styles.logo} />
        </Animated.View>

        <Text style={styles.brandTop}>CRATE TILT</Text>
        <Text style={styles.brandBottom}>CHAMBER</Text>

        <View style={styles.track}>
          <Animated.View style={[styles.bar, { width: barWidth }]} />
        </View>

        <Text style={styles.caption}>LOADING CHAMBERS...</Text>
      </Animated.View>

      <Text style={styles.footer}>GRAVITY PUZZLE</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.bg.primary,
  },
  ink: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(4, 13, 11, 0.92)',
  },
  wash: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.85,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  plate: {
    width: PLATE,
    height: PLATE,
    borderRadius: theme.radius.xl,
    borderWidth: 2,
    borderColor: theme.colors.neon.cyan + '44',
    backgroundColor: 'rgba(7, 26, 22, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.neon.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 30,
    elevation: 16,
  },
  logo: {
    width: LOGO,
    height: LOGO,
    resizeMode: 'contain',
  },
  brandTop: {
    marginTop: 34,
    fontSize: 36,
    lineHeight: 40,
    fontWeight: '900',
    letterSpacing: 4,
    color: theme.colors.text.primary,
  },
  brandBottom: {
    marginTop: 2,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '300',
    letterSpacing: 12,
    color: theme.colors.neon.cyan,
  },
  track: {
    marginTop: 40,
    width: TRACK_W,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    overflow: 'hidden',
  },
  bar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.neon.pink,
  },
  caption: {
    marginTop: 16,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    letterSpacing: 3,
    color: theme.colors.text.secondary,
  },
  footer: {
    position: 'absolute',
    bottom: 36,
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '600',
    letterSpacing: 4,
    color: theme.colors.text.muted,
  },
});

export default React.memo(LoaderScreen);

/**
 * MenuScreen — the warehouse hub (M3 bento).
 *
 * Light-handed overlay so the chamber art stays readable, the exact opposite of
 * the Loader's near-black treatment.
 */
import React, { useCallback } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BookOpen, Flame, Layers, Play } from 'lucide-react-native';
import theme from '../constants/theme';
import { SCREEN_W, TOTAL_CHAMBERS } from '../constants/config';
import assets from '../assets';
import ScreenHeader from '../components/ScreenHeader';
import StatCard from '../components/StatCard';
import BentoTile from '../components/BentoTile';
import PrimaryButton from '../components/PrimaryButton';
import useDailyChamber from '../hooks/useDailyChamber';

const PAD = 16;
const GAP = 12;
const CONTENT_W = SCREEN_W - PAD * 2;
const HALF_W = Math.floor((CONTENT_W - GAP) / 2);
const TILE_H = 120;
const CTA_H = 128;

interface Props {
  level: number;
  cleared: number;
  streak: number;
  onPlay: () => void;
  onDaily: (id: number) => void;
  onGuide: () => void;
}

function MenuScreen({
  level,
  cleared,
  streak,
  onPlay,
  onDaily,
  onGuide,
}: Props) {
  const daily = useDailyChamber();
  const handleDaily = useCallback(() => onDaily(daily), [daily, onDaily]);

  return (
    <ImageBackground source={assets.bgGame} style={styles.bg} resizeMode="cover">
      <View style={styles.ink} />
      <LinearGradient
        colors={['rgba(11, 58, 51, 0.42)', 'rgba(6, 15, 13, 0.93)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.wash}
      />

      <ScreenHeader
        title="WAREHOUSE"
        caption={'FLOOR ' + Math.ceil(level / 10)}
        leftSlot={
          <View style={styles.brandSlot}>
            <Image source={assets.logo} style={styles.brandSlotLogo} />
          </View>
        }
        rightSlot={
          <View style={styles.chip}>
            <Text style={styles.chipText}>{'x' + streak}</Text>
          </View>
        }
      />

      <View style={styles.body}>
        <View style={styles.brand}>
          <Image source={assets.logo} style={styles.logo} />
          <Text style={styles.brandTitle}>CRATE TILT CHAMBER</Text>
          <Text style={styles.hint}>
            TILT THE ROOM · GRAVITY DOES THE REST
          </Text>
        </View>

        <View style={styles.row}>
          <View style={styles.slot}>
            <StatCard
              Icon={Layers}
              value={String(level)}
              label="CHAMBER"
              tone={theme.colors.neon.cyan}
            />
          </View>
          <View style={styles.slot}>
            <StatCard
              Icon={Flame}
              value={cleared + '/' + TOTAL_CHAMBERS}
              label="CLEARED"
              tone={theme.colors.neon.yellow}
            />
          </View>
        </View>

        <PrimaryButton
          label="PLAY NOW"
          Icon={Play}
          onPress={onPlay}
          width={CONTENT_W}
          height={CTA_H}
        />

        <View style={styles.row}>
          <BentoTile
            label="DAILY CHAMBER"
            onPress={handleDaily}
            tone={theme.colors.neon.purple}
            width={HALF_W}
            height={TILE_H}>
            <Text style={styles.tileKicker}>DAILY</Text>
            <Text style={styles.tileValue}>{'#' + daily}</Text>
            <Text style={styles.tileLabel}>CHAMBER OF THE DAY</Text>
          </BentoTile>

          <BentoTile
            label="CRATE GUIDE"
            onPress={onGuide}
            tone={theme.colors.neon.green}
            width={HALF_W}
            height={TILE_H}>
            <View style={styles.tileIcon}>
              <BookOpen
                size={22}
                color={theme.colors.neon.green}
                strokeWidth={2.25}
              />
            </View>
            <Text style={styles.tileValueSm}>CRATE GUIDE</Text>
            <Text style={styles.tileLabel}>5 CRATE TYPES</Text>
          </BentoTile>
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
    backgroundColor: 'rgba(5, 16, 14, 0.74)',
  },
  wash: {
    ...StyleSheet.absoluteFillObject,
  },
  body: {
    flex: 1,
    paddingHorizontal: PAD,
    paddingTop: 12,
    paddingBottom: 22,
    justifyContent: 'space-between',
  },
  brand: {
    alignItems: 'center',
  },
  logo: {
    width: 76,
    height: 76,
    resizeMode: 'contain',
  },
  brandTitle: {
    marginTop: 8,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: theme.colors.text.primary,
  },
  hint: {
    marginTop: 6,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    letterSpacing: 1.6,
    color: theme.colors.text.secondary,
  },
  row: {
    flexDirection: 'row',
    gap: GAP,
  },
  slot: {
    flex: 1,
  },
  brandSlot: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: theme.colors.neon.pink + '55',
    backgroundColor: 'rgba(12, 34, 30, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandSlotLogo: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  chip: {
    height: 30,
    paddingHorizontal: 12,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: theme.colors.neon.yellow + '66',
    backgroundColor: 'rgba(255, 216, 107, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '800',
    letterSpacing: 1,
    color: theme.colors.neon.yellow,
  },
  tileKicker: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '800',
    letterSpacing: 2,
    color: theme.colors.neon.purple,
  },
  tileIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(47, 214, 126, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileValue: {
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '900',
    letterSpacing: -0.5,
    color: theme.colors.text.primary,
  },
  tileValueSm: {
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '800',
    letterSpacing: 0.5,
    color: theme.colors.text.primary,
  },
  tileLabel: {
    fontSize: 9,
    lineHeight: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: theme.colors.text.secondary,
  },
});

export default React.memo(MenuScreen);

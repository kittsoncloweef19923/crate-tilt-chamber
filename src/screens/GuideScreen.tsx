/**
 * GuideScreen — crate reference.
 *
 * The flex column is the root (no ScrollView wrapper); the cards live in a
 * virtualised FlatList inside the flex:1 area.
 */
import React, { useCallback } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { ListRenderItemInfo } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme, { CRATE_COLORS, CRATE_GLYPHS } from '../constants/theme';
import { SCREEN_W } from '../constants/config';
import assets from '../assets';
import ScreenHeader, { HeaderIconButton } from '../components/ScreenHeader';
import NeonSurface from '../components/NeonSurface';
import PrimaryButton from '../components/PrimaryButton';

const PAD = 16;
const CONTENT_W = SCREEN_W - PAD * 2;

interface GuideRow {
  key: string;
  art: number;
  glyph: string;
  tone: string;
  title: string;
  text: string;
}

const ROWS: GuideRow[] = [
  {
    key: 'tilt',
    art: assets.logo,
    glyph: 'T',
    tone: theme.colors.neon.cyan,
    title: 'TILT THE ROOM',
    text: 'You never push a crate. You turn the whole chamber 90 degrees.',
  },
  {
    key: 'loose',
    art: assets.sprite1,
    glyph: CRATE_GLYPHS[0],
    tone: CRATE_COLORS[0],
    title: 'LOOSE CRATE',
    text: 'Falls the moment gravity changes, until a wall or crate stops it.',
  },
  {
    key: 'drift',
    art: assets.sprite2,
    glyph: CRATE_GLYPHS[1],
    tone: CRATE_COLORS[1],
    title: 'DRIFT CRATE',
    text: 'Same physics, different pad. Every colour needs its own target.',
  },
  {
    key: 'sticky',
    art: assets.sprite3,
    glyph: CRATE_GLYPHS[2],
    tone: CRATE_COLORS[2],
    title: 'STICKY CRATE',
    text: 'Grips the chamber when a wall touches its flank. Dashed border.',
  },
  {
    key: 'heavy',
    art: assets.sprite4,
    glyph: CRATE_GLYPHS[3],
    tone: CRATE_COLORS[3],
    title: 'HEAVY CRATE',
    text: 'Thick frame, same fall. It blocks everything that lands on it.',
  },
  {
    key: 'pad',
    art: assets.sprite5,
    glyph: 'P',
    tone: theme.colors.neon.purple,
    title: 'FLOOR PAD',
    text: 'Land every crate on its matching pad at the same time to clear.',
  },
];

const keyExtractor = (item: GuideRow) => item.key;

function GuideCard({ item }: { item: GuideRow }) {
  return (
    <NeonSurface variant="raised" glow={item.tone} style={styles.card}>
      <View style={[styles.artWrap, { borderColor: item.tone + '55' }]}>
        <Image source={item.art} style={styles.art} />
      </View>
      <View style={styles.cardText}>
        <View style={styles.cardTitleRow}>
          <Text style={[styles.cardGlyph, { color: item.tone }]}>
            {item.glyph}
          </Text>
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
        <Text style={styles.cardBody}>{item.text}</Text>
      </View>
    </NeonSurface>
  );
}

const MemoGuideCard = React.memo(GuideCard);

interface Props {
  onBack: () => void;
  onPlay: () => void;
}

function GuideScreen({ onBack, onPlay }: Props) {
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<GuideRow>) => <MemoGuideCard item={item} />,
    [],
  );

  return (
    <ImageBackground source={assets.bgGame} style={styles.bg} resizeMode="cover">
      <View style={styles.ink} />
      <LinearGradient
        colors={['rgba(11, 58, 51, 0.58)', 'rgba(6, 15, 13, 0.95)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.wash}
      />

      <ScreenHeader
        title="CRATE GUIDE"
        caption="HOW THE CHAMBER WORKS"
        leftSlot={
          <HeaderIconButton
            source={assets.iconHome}
            label="WAREHOUSE"
            onPress={onBack}
          />
        }
      />

      <View style={styles.listArea}>
        <FlatList
          data={ROWS}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          initialNumToRender={6}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.hint}>UNDO IS FREE · ORDER IS EVERYTHING</Text>
        <PrimaryButton label="START CHAMBER" onPress={onPlay} width={CONTENT_W} />
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
  listArea: {
    flex: 1,
    paddingHorizontal: PAD,
  },
  listContent: {
    paddingTop: 14,
    paddingBottom: 10,
    gap: 10,
  },
  card: {
    width: CONTENT_W,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  artWrap: {
    width: 56,
    height: 56,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    backgroundColor: 'rgba(4, 13, 11, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  art: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  cardText: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardGlyph: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '900',
    letterSpacing: 1,
  },
  cardTitle: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '800',
    letterSpacing: 1,
    color: theme.colors.text.primary,
  },
  cardBody: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    color: theme.colors.text.secondary,
  },
  footer: {
    paddingHorizontal: PAD,
    paddingBottom: 24,
    paddingTop: 10,
    alignItems: 'center',
  },
  hint: {
    marginBottom: 10,
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '700',
    letterSpacing: 1.8,
    color: theme.colors.text.secondary,
  },
});

export default React.memo(GuideScreen);

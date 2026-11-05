/**
 * theme.ts — visual system for CrateTiltChamber.
 *
 * Base preset: RETRO_NEON (design-system/preset.ts). Structure, typography,
 * spacing, radii, shadows and animation curves are the preset verbatim; the
 * accent colours are re-tinted to the chamber art — an Art-Deco vault of gold
 * on emerald with ruby inlays — so the UI and the background read as one piece.
 *
 * The `name` field is the preset value and must not be renamed.
 */

export const theme = {
  name: 'retro-neon',

  colors: {
    bg: {
      primary: '#061512',       // emerald ink, almost black
      secondary: '#0C221E',     // cards
      tertiary: '#123029',      // elevated surfaces
      accent: '#0B3A33',        // highlighted blocks
    },
    /** Accent family: the five jewels of the vault. */
    neon: {
      pink: '#FF2D55',          // ruby — primary accent
      cyan: '#F2C14E',          // gold — structural accent
      purple: '#B86BFF',        // amethyst — tertiary
      yellow: '#FFD86B',        // light gold — rewards
      green: '#2FD67E',         // emerald — success
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#8FA9A1',     // muted, with a green tint, not grey
      accent: '#F2C14E',
      muted: '#4A6159',
    },
    ui: {
      border: '#2A4A42',
      divider: '#17332C',
      overlay: 'rgba(0, 0, 0, 0.7)',
      glass: 'rgba(12, 34, 30, 0.85)',
    },
  },

  glow: {
    rn: {
      color: '#FF2D55',
      radius: 20,
      opacity: 0.4,
    },
  },

  gradients: {
    primary: ['#FF2D55', '#B8102F'],       // ruby — the one saturated CTA
    surface: ['#0C221E', '#123029'],
    button: ['#F2C14E', '#D4932B'],        // gold plate
    reward: ['#FFD86B', '#D4932B'],
    header: ['#061512', '#0B3A33'],
    loader: ['#0B3A33', '#061512', '#1A0A12'],
    win: ['#2FD67E', '#F2C14E'],
    lose: ['#B86BFF', '#FF2D55'],
  },

  typography: {
    hero: { fontSize: 44, fontWeight: '900' as const, letterSpacing: -1 },
    title: { fontSize: 28, fontWeight: '800' as const, letterSpacing: -0.5 },
    subtitle: { fontSize: 18, fontWeight: '600' as const, letterSpacing: 0 },
    body: { fontSize: 15, fontWeight: '400' as const, letterSpacing: 0.2 },
    caption: { fontSize: 12, fontWeight: '500' as const, letterSpacing: 0.5 },
    button: { fontSize: 16, fontWeight: '700' as const, letterSpacing: 1.5 },
    score: { fontSize: 36, fontWeight: '900' as const, letterSpacing: -1 },
  },

  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },

  radius: { sm: 8, md: 14, lg: 20, xl: 28, pill: 100 },

  shadows: {
    card: {
      shadowColor: '#FF2D55',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    },
    button: {
      shadowColor: '#FF2D55',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 12,
    },
    glow: {
      shadowColor: '#F2C14E',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 24,
      elevation: 16,
    },
  },

  animation: {
    spring: { tension: 120, friction: 8 },
    bounce: { tension: 180, friction: 12 },
    smooth: { duration: 300 },
    slow: { duration: 600 },
  },
};

/**
 * Crate palette. Index === crate colour id === sprite number - 1, matched to
 * the gem inside each sprite so the tint around a crate never fights its art.
 *
 * Every colour is paired with an ASCII glyph, so the puzzle never relies on
 * colour alone — and all five glyphs stay readable when the room is upside down.
 */
export const CRATE_COLORS = ['#FF2D55', '#2FD67E', '#3FA9FF', '#B86BFF', '#F2C14E'];
export const CRATE_GLYPHS = ['O', 'X', '+', '=', 'H'];

export type Theme = typeof theme;
export default theme;

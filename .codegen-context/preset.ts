/**
 * DESIGN PRESETS — ready-made design systems, one per style.
 * Copied into the project as src/constants/theme.ts
 * Each preset is a complete visual system, not a set of abstractions.
 */

// ============================================================
// RETRO NEON — dark background, acid neon accents, glow
// ============================================================
export const RETRO_NEON = {
  name: 'retro-neon',

  colors: {
    bg: {
      primary: '#0A0A0F',       // almost black with a blue tint
      secondary: '#12121F',     // slightly lighter, for cards
      tertiary: '#1A1A2E',      // for elevated surfaces
      accent: '#16213E',        // for highlighted blocks
    },
    neon: {
      pink: '#FF006E',          // primary accent
      cyan: '#00F5FF',          // secondary accent
      purple: '#BF00FF',        // tertiary
      yellow: '#FFE600',        // for rewards/coins
      green: '#39FF14',         // for success/win
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#8888AA',     // muted, not grey — with a purple tint
      accent: '#00F5FF',
      muted: '#4A4A6A',
    },
    ui: {
      border: '#2A2A4A',
      divider: '#1F1F3A',
      overlay: 'rgba(0, 0, 0, 0.7)',
      glass: 'rgba(18, 18, 31, 0.85)',
    },
  },

  glow: {
    pink: '0 0 20px rgba(255, 0, 110, 0.5), 0 0 40px rgba(255, 0, 110, 0.2)',
    cyan: '0 0 20px rgba(0, 245, 255, 0.5), 0 0 40px rgba(0, 245, 255, 0.2)',
    // In RN use via nested Views with opacity and blur
    rn: {
      color: '#FF006E',
      radius: 20,
      opacity: 0.4,
    },
  },

  gradients: {
    primary: ['#FF006E', '#BF00FF'],       // pink → purple
    surface: ['#12121F', '#1A1A2E'],       // dark surface
    button: ['#FF006E', '#FF4D94'],        // button — not flat
    reward: ['#FFE600', '#FF9500'],        // for coins/rewards
    header: ['#0A0A0F', '#16213E'],        // header with a gradient
  },

  typography: {
    hero: { fontSize: 48, fontWeight: '900' as const, letterSpacing: -1 },
    title: { fontSize: 28, fontWeight: '800' as const, letterSpacing: -0.5 },
    subtitle: { fontSize: 18, fontWeight: '600' as const, letterSpacing: 0 },
    body: { fontSize: 15, fontWeight: '400' as const, letterSpacing: 0.2 },
    caption: { fontSize: 12, fontWeight: '500' as const, letterSpacing: 0.5 },
    button: { fontSize: 16, fontWeight: '700' as const, letterSpacing: 1.5, textTransform: 'uppercase' as const },
    score: { fontSize: 36, fontWeight: '900' as const, letterSpacing: -1, fontVariant: ['tabular-nums' as const] },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  radius: {
    sm: 8,
    md: 14,
    lg: 20,
    xl: 28,
    pill: 100,
  },

  shadows: {
    card: {
      shadowColor: '#FF006E',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    },
    button: {
      shadowColor: '#FF006E',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 12,
    },
    glow: {
      shadowColor: '#00F5FF',
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

// ============================================================
// CANDY SWEET — warm pink/purple, puffy shapes, joy
// ============================================================
export const CANDY_SWEET = {
  name: 'candy-sweet',

  colors: {
    bg: {
      primary: '#FFF0F5',       // lavender pink
      secondary: '#FFFFFF',
      tertiary: '#F8E8F0',
      accent: '#FFE0EB',
    },
    candy: {
      pink: '#FF69B4',
      purple: '#9B59B6',
      blue: '#5DADE2',
      green: '#2ECC71',
      orange: '#F39C12',
      red: '#FF4757',
      yellow: '#FFD93D',
    },
    text: {
      primary: '#2C1B47',       // deep purple, NOT black
      secondary: '#7B6B8A',
      accent: '#FF69B4',
      muted: '#B8A9C9',
    },
    ui: {
      border: '#E8D5F0',
      divider: '#F0E0F5',
      overlay: 'rgba(44, 27, 71, 0.5)',
      glass: 'rgba(255, 255, 255, 0.9)',
    },
  },

  gradients: {
    primary: ['#FF69B4', '#9B59B6'],
    surface: ['#FFF0F5', '#FFE0EB'],
    button: ['#FF69B4', '#FF8DC7'],
    reward: ['#FFD93D', '#F39C12'],
    header: ['#9B59B6', '#FF69B4'],
  },

  typography: {
    hero: { fontSize: 44, fontWeight: '900' as const, letterSpacing: -0.5 },
    title: { fontSize: 26, fontWeight: '800' as const, letterSpacing: 0 },
    subtitle: { fontSize: 17, fontWeight: '600' as const, letterSpacing: 0.2 },
    body: { fontSize: 15, fontWeight: '400' as const, letterSpacing: 0.1 },
    caption: { fontSize: 12, fontWeight: '500' as const, letterSpacing: 0.3 },
    button: { fontSize: 16, fontWeight: '800' as const, letterSpacing: 1 },
    score: { fontSize: 40, fontWeight: '900' as const, letterSpacing: -1 },
  },

  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },

  radius: {
    sm: 12,        // candy = rounder
    md: 18,
    lg: 24,
    xl: 32,
    pill: 100,
  },

  shadows: {
    card: {
      shadowColor: '#9B59B6',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 6,
    },
    button: {
      shadowColor: '#FF69B4',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      elevation: 10,
    },
  },

  animation: {
    spring: { tension: 100, friction: 7 },
    bounce: { tension: 200, friction: 10 },
    smooth: { duration: 250 },
    slow: { duration: 500 },
  },
};

// ============================================================
// CASINO GOLD — black/gold, luxury, premium
// ============================================================
export const CASINO_GOLD = {
  name: 'casino-gold',

  colors: {
    bg: {
      primary: '#0B0B0F',
      secondary: '#141418',
      tertiary: '#1C1C24',
      accent: '#1E1A14',        // warm dark with a gold tint
    },
    gold: {
      primary: '#D4AF37',       // real gold, not yellow
      light: '#F5D77A',
      dark: '#A67C00',
      shimmer: '#FFE4A0',
    },
    text: {
      primary: '#F5F0E8',       // warm white
      secondary: '#8A8078',
      accent: '#D4AF37',
      muted: '#5A5550',
    },
    status: {
      win: '#4ADE80',
      lose: '#F87171',
      jackpot: '#FFD700',
    },
    ui: {
      border: '#2A2520',
      divider: '#221E18',
      overlay: 'rgba(0, 0, 0, 0.8)',
      glass: 'rgba(20, 20, 24, 0.9)',
    },
  },

  gradients: {
    primary: ['#D4AF37', '#A67C00'],
    surface: ['#141418', '#1C1C24'],
    button: ['#D4AF37', '#F5D77A', '#D4AF37'],   // shimmer effect
    reward: ['#FFD700', '#D4AF37'],
    header: ['#0B0B0F', '#1E1A14'],
    luxury: ['#1C1C24', '#141418', '#0B0B0F'],   // deep dark
  },

  typography: {
    hero: { fontSize: 42, fontWeight: '300' as const, letterSpacing: 4 },  // thin, elegant
    title: { fontSize: 24, fontWeight: '600' as const, letterSpacing: 2 },
    subtitle: { fontSize: 16, fontWeight: '400' as const, letterSpacing: 1 },
    body: { fontSize: 14, fontWeight: '400' as const, letterSpacing: 0.5 },
    caption: { fontSize: 11, fontWeight: '500' as const, letterSpacing: 1.5 },
    button: { fontSize: 14, fontWeight: '600' as const, letterSpacing: 3, textTransform: 'uppercase' as const },
    score: { fontSize: 38, fontWeight: '700' as const, letterSpacing: 0 },
  },

  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 36, xxl: 56 },

  radius: {
    sm: 4,         // casino = stricter
    md: 8,
    lg: 12,
    xl: 16,
    pill: 100,
  },

  shadows: {
    card: {
      shadowColor: '#D4AF37',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    button: {
      shadowColor: '#D4AF37',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 8,
    },
  },

  animation: {
    spring: { tension: 80, friction: 10 },     // slower, more elegant
    bounce: { tension: 100, friction: 8 },
    smooth: { duration: 400 },
    slow: { duration: 800 },
  },
};

// ============================================================
// CYBERPUNK — purple/blue, glitches, the future
// ============================================================
export const CYBERPUNK = {
  name: 'cyberpunk',

  colors: {
    bg: {
      primary: '#0A0014',       // deep purple-black
      secondary: '#120026',
      tertiary: '#1A0038',
      accent: '#0D1B2A',
    },
    cyber: {
      violet: '#8B00FF',
      blue: '#00D4FF',
      pink: '#FF2E97',
      green: '#00FF9F',
      orange: '#FF6B00',
    },
    text: {
      primary: '#E0D0FF',       // light purple-white
      secondary: '#7B68AE',
      accent: '#00D4FF',
      muted: '#4A3D6A',
      glitch: '#FF2E97',        // for "glitchy" elements
    },
    ui: {
      border: '#2A1A4A',
      divider: '#1E0E3A',
      overlay: 'rgba(10, 0, 20, 0.85)',
      glass: 'rgba(18, 0, 38, 0.8)',
      scanline: 'rgba(0, 212, 255, 0.03)',  // thin horizontal lines
    },
  },

  gradients: {
    primary: ['#8B00FF', '#00D4FF'],
    surface: ['#120026', '#0D1B2A'],
    button: ['#FF2E97', '#8B00FF'],
    reward: ['#00FF9F', '#00D4FF'],
    header: ['#0A0014', '#1A0038'],
    glitch: ['#FF2E97', '#00D4FF', '#8B00FF'],
  },

  typography: {
    hero: { fontSize: 46, fontWeight: '900' as const, letterSpacing: -2 },
    title: { fontSize: 26, fontWeight: '700' as const, letterSpacing: 1 },
    subtitle: { fontSize: 16, fontWeight: '500' as const, letterSpacing: 2 },
    body: { fontSize: 14, fontWeight: '400' as const, letterSpacing: 0.3 },
    caption: { fontSize: 11, fontWeight: '600' as const, letterSpacing: 2, textTransform: 'uppercase' as const },
    button: { fontSize: 14, fontWeight: '700' as const, letterSpacing: 3, textTransform: 'uppercase' as const },
    score: { fontSize: 44, fontWeight: '900' as const, letterSpacing: -2 },
  },

  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },

  radius: {
    sm: 2,          // cyber = sharp corners
    md: 6,
    lg: 10,
    xl: 14,
    pill: 100,
    cut: 0,         // fully straight
  },

  shadows: {
    card: {
      shadowColor: '#8B00FF',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
    button: {
      shadowColor: '#FF2E97',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.35,
      shadowRadius: 20,
      elevation: 12,
    },
  },

  animation: {
    spring: { tension: 150, friction: 6 },     // fast, snappy
    bounce: { tension: 250, friction: 8 },
    smooth: { duration: 200 },
    slow: { duration: 400 },
  },
};

// ============================================================
// DARK PREMIUM — muted colours, elegance, minimalism
// ============================================================
export const DARK_PREMIUM = {
  name: 'dark-premium',

  colors: {
    bg: {
      primary: '#111114',
      secondary: '#18181C',
      tertiary: '#1F1F24',
      accent: '#252530',
    },
    accent: {
      primary: '#6C5CE7',       // muted purple
      secondary: '#A29BFE',
      warm: '#FD79A8',
      cool: '#74B9FF',
      success: '#55EFC4',
    },
    text: {
      primary: '#EEEEF0',
      secondary: '#7F7F8C',
      accent: '#A29BFE',
      muted: '#4A4A55',
    },
    ui: {
      border: '#2C2C34',
      divider: '#222228',
      overlay: 'rgba(0, 0, 0, 0.6)',
      glass: 'rgba(24, 24, 28, 0.9)',
    },
  },

  gradients: {
    primary: ['#6C5CE7', '#A29BFE'],
    surface: ['#18181C', '#1F1F24'],
    button: ['#6C5CE7', '#7C6CF7'],
    reward: ['#55EFC4', '#00B894'],
    header: ['#111114', '#18181C'],
  },

  typography: {
    hero: { fontSize: 40, fontWeight: '700' as const, letterSpacing: -1 },
    title: { fontSize: 22, fontWeight: '600' as const, letterSpacing: -0.3 },
    subtitle: { fontSize: 16, fontWeight: '500' as const, letterSpacing: 0 },
    body: { fontSize: 14, fontWeight: '400' as const, letterSpacing: 0.1 },
    caption: { fontSize: 11, fontWeight: '500' as const, letterSpacing: 0.5 },
    button: { fontSize: 14, fontWeight: '600' as const, letterSpacing: 0.5 },
    score: { fontSize: 34, fontWeight: '700' as const, letterSpacing: -0.5 },
  },

  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },

  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    pill: 100,
  },

  shadows: {
    card: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    button: {
      shadowColor: '#6C5CE7',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
    },
  },

  animation: {
    spring: { tension: 100, friction: 10 },
    bounce: { tension: 120, friction: 9 },
    smooth: { duration: 300 },
    slow: { duration: 500 },
  },
};

// ============================================================
// TROPICAL — vivid colours, energy, summer
// ============================================================
export const TROPICAL = {
  name: 'tropical',

  colors: {
    bg: {
      primary: '#0D2818',       // dark tropical green
      secondary: '#132D1E',
      tertiary: '#1A3A28',
      accent: '#0F3024',
    },
    tropic: {
      green: '#00E676',
      orange: '#FF6D00',
      yellow: '#FFEA00',
      pink: '#FF4081',
      blue: '#00B0FF',
      teal: '#1DE9B6',
    },
    text: {
      primary: '#F0FFF0',
      secondary: '#7BAF8E',
      accent: '#00E676',
      muted: '#4A7A5A',
    },
    ui: {
      border: '#1A4A2E',
      divider: '#153A24',
      overlay: 'rgba(13, 40, 24, 0.8)',
      glass: 'rgba(19, 45, 30, 0.85)',
    },
  },

  gradients: {
    primary: ['#00E676', '#00B0FF'],
    surface: ['#0D2818', '#1A3A28'],
    button: ['#FF6D00', '#FFEA00'],
    reward: ['#FFEA00', '#FF6D00'],
    header: ['#0D2818', '#0F3024'],
    sunset: ['#FF4081', '#FF6D00', '#FFEA00'],
  },

  typography: {
    hero: { fontSize: 44, fontWeight: '900' as const, letterSpacing: -1 },
    title: { fontSize: 26, fontWeight: '800' as const, letterSpacing: 0 },
    subtitle: { fontSize: 17, fontWeight: '600' as const, letterSpacing: 0.3 },
    body: { fontSize: 15, fontWeight: '400' as const, letterSpacing: 0.1 },
    caption: { fontSize: 12, fontWeight: '600' as const, letterSpacing: 0.5 },
    button: { fontSize: 16, fontWeight: '700' as const, letterSpacing: 1.5 },
    score: { fontSize: 38, fontWeight: '900' as const, letterSpacing: -1 },
  },

  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },

  radius: {
    sm: 10,
    md: 16,
    lg: 22,
    xl: 30,
    pill: 100,
  },

  shadows: {
    card: {
      shadowColor: '#00E676',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
    },
    button: {
      shadowColor: '#FF6D00',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 10,
    },
  },

  animation: {
    spring: { tension: 130, friction: 7 },
    bounce: { tension: 200, friction: 8 },
    smooth: { duration: 250 },
    slow: { duration: 450 },
  },
};

// ============================================================
// SPACE COSMOS — deep space, stars, mystery
// ============================================================
export const SPACE_COSMOS = {
  name: 'space-cosmos',

  colors: {
    bg: {
      primary: '#050510',       // almost black with blue
      secondary: '#0A0A20',
      tertiary: '#10103A',
      accent: '#0A1628',
    },
    space: {
      blue: '#4169E1',         // royal blue
      purple: '#7B2FBE',
      nebula: '#C471ED',
      star: '#FFF8DC',
      comet: '#00CED1',
      mars: '#E8533F',
    },
    text: {
      primary: '#E8E0FF',
      secondary: '#6A6A9A',
      accent: '#C471ED',
      muted: '#3A3A6A',
      star: '#FFF8DC',
    },
    ui: {
      border: '#1A1A4A',
      divider: '#12123A',
      overlay: 'rgba(5, 5, 16, 0.85)',
      glass: 'rgba(10, 10, 32, 0.8)',
    },
  },

  gradients: {
    primary: ['#4169E1', '#7B2FBE'],
    surface: ['#0A0A20', '#10103A'],
    button: ['#7B2FBE', '#C471ED'],
    reward: ['#FFF8DC', '#FFD700'],
    header: ['#050510', '#0A1628'],
    nebula: ['#4169E1', '#7B2FBE', '#C471ED'],
    aurora: ['#00CED1', '#4169E1', '#7B2FBE'],
  },

  typography: {
    hero: { fontSize: 42, fontWeight: '300' as const, letterSpacing: 6 },   // thin, cosmic
    title: { fontSize: 24, fontWeight: '500' as const, letterSpacing: 3 },
    subtitle: { fontSize: 15, fontWeight: '400' as const, letterSpacing: 2 },
    body: { fontSize: 14, fontWeight: '400' as const, letterSpacing: 0.3 },
    caption: { fontSize: 11, fontWeight: '500' as const, letterSpacing: 2 },
    button: { fontSize: 13, fontWeight: '600' as const, letterSpacing: 4, textTransform: 'uppercase' as const },
    score: { fontSize: 36, fontWeight: '600' as const, letterSpacing: 1 },
  },

  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 36, xxl: 56 },

  radius: {
    sm: 6,
    md: 10,
    lg: 16,
    xl: 24,
    pill: 100,
  },

  shadows: {
    card: {
      shadowColor: '#4169E1',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 6,
    },
    button: {
      shadowColor: '#7B2FBE',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      elevation: 10,
    },
  },

  animation: {
    spring: { tension: 60, friction: 12 },     // smooth, weightless
    bounce: { tension: 80, friction: 10 },
    smooth: { duration: 500 },
    slow: { duration: 1000 },
  },
};

// ============================================================
// WARM_EARTHY — sand/cream/sage/terracotta, for farm/lifestyle/finance/utility
// ============================================================
export const WARM_EARTHY = {
  name: 'warm-earthy',
  colors: {
    bg: {
      primary: '#FAF5EC',
      secondary: '#F2EAD8',
      tertiary: '#E8DDC4',
      accent: '#D8C9A8',
    },
    earth: {
      sage: '#7FA46B',
      olive: '#8B9B5B',
      terracotta: '#D97B4D',
      mustard: '#D9B36C',
      walnut: '#6B5740',
      cream: '#FAF5EC',
    },
    text: {
      primary: '#3D2E1F',
      secondary: '#6B5740',
      accent: '#7FA46B',
      muted: '#A89B82',
    },
    ui: {
      border: '#D8C9A8',
      divider: '#E8DDC4',
      overlay: 'rgba(61, 46, 31, 0.6)',
      glass: 'rgba(250, 245, 236, 0.85)',
    },
  },
  gradients: {
    primary: ['#7FA46B', '#8B9B5B'],
    surface: ['#F2EAD8', '#E8DDC4'],
    button: ['#D97B4D', '#D9B36C'],
    reward: ['#D9B36C', '#D97B4D'],
    header: ['#F2EAD8', '#FAF5EC'],
  },
  typography: {
    hero: { fontSize: 38, fontWeight: '600' as const, letterSpacing: -0.5 },
    title: { fontSize: 22, fontWeight: '600' as const, letterSpacing: 0 },
    subtitle: { fontSize: 14, fontWeight: '500' as const, letterSpacing: 1.5, textTransform: 'uppercase' as const },
    body: { fontSize: 15, fontWeight: '400' as const, letterSpacing: 0.2 },
    caption: { fontSize: 11, fontWeight: '500' as const, letterSpacing: 1, textTransform: 'uppercase' as const },
    button: { fontSize: 14, fontWeight: '700' as const, letterSpacing: 1.5, textTransform: 'uppercase' as const },
  },
  radius: { sm: 6, md: 12, lg: 20, full: 999 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },
};

// ============================================================
// NORDIC_MINIMAL — white/grey/mint, minimalism for tasks/meditation/health
// ============================================================
export const NORDIC_MINIMAL = {
  name: 'nordic-minimal',
  colors: {
    bg: {
      primary: '#FAFAFA',
      secondary: '#F2F2F4',
      tertiary: '#E8E8EC',
      accent: '#DDDDE2',
    },
    nordic: {
      mint: '#7FE8C5',
      blue: '#4A90E2',
      coral: '#FF7B7B',
      slate: '#3C4252',
      cloud: '#FAFAFA',
      stone: '#9CA3AF',
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
      accent: '#4A90E2',
      muted: '#9CA3AF',
    },
    ui: {
      border: '#E5E7EB',
      divider: '#F2F2F4',
      overlay: 'rgba(31, 41, 55, 0.5)',
      glass: 'rgba(250, 250, 250, 0.9)',
    },
  },
  gradients: {
    primary: ['#4A90E2', '#7FE8C5'],
    surface: ['#FAFAFA', '#F2F2F4'],
    button: ['#3C4252', '#1F2937'],
    reward: ['#7FE8C5', '#4A90E2'],
    header: ['#FAFAFA', '#F2F2F4'],
  },
  typography: {
    hero: { fontSize: 44, fontWeight: '200' as const, letterSpacing: -1 },
    title: { fontSize: 22, fontWeight: '500' as const, letterSpacing: 0 },
    subtitle: { fontSize: 14, fontWeight: '400' as const, letterSpacing: 0.5 },
    body: { fontSize: 15, fontWeight: '400' as const, letterSpacing: 0.1 },
    caption: { fontSize: 11, fontWeight: '500' as const, letterSpacing: 1.5, textTransform: 'uppercase' as const },
    button: { fontSize: 14, fontWeight: '600' as const, letterSpacing: 0.5 },
  },
  radius: { sm: 4, md: 8, lg: 16, full: 999 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },
};

// ============================================================
// OCEAN_FRESH — cool ocean blue/cyan/white for water/fitness/wellness
// ============================================================
export const OCEAN_FRESH = {
  name: 'ocean-fresh',
  colors: {
    bg: {
      primary: '#E8F4F8',
      secondary: '#D1E7EE',
      tertiary: '#B8DBE5',
      accent: '#9DCEDB',
    },
    ocean: {
      deep: '#00558B',
      wave: '#00A6CB',
      foam: '#7DDDD3',
      seafoam: '#A8E6D9',
      coral: '#FF8C61',
      sun: '#FFD66B',
    },
    text: {
      primary: '#003547',
      secondary: '#00558B',
      accent: '#00A6CB',
      muted: '#5C8090',
    },
    ui: {
      border: '#B8DBE5',
      divider: '#D1E7EE',
      overlay: 'rgba(0, 53, 71, 0.55)',
      glass: 'rgba(232, 244, 248, 0.88)',
    },
  },
  gradients: {
    primary: ['#00A6CB', '#00558B'],
    surface: ['#E8F4F8', '#D1E7EE'],
    button: ['#00558B', '#00A6CB'],
    reward: ['#FFD66B', '#FF8C61'],
    header: ['#D1E7EE', '#E8F4F8'],
  },
  typography: {
    hero: { fontSize: 40, fontWeight: '300' as const, letterSpacing: -0.5 },
    title: { fontSize: 22, fontWeight: '600' as const, letterSpacing: 0 },
    subtitle: { fontSize: 14, fontWeight: '500' as const, letterSpacing: 1 },
    body: { fontSize: 15, fontWeight: '400' as const, letterSpacing: 0.2 },
    caption: { fontSize: 11, fontWeight: '500' as const, letterSpacing: 1.5, textTransform: 'uppercase' as const },
    button: { fontSize: 14, fontWeight: '700' as const, letterSpacing: 1, textTransform: 'uppercase' as const },
  },
  radius: { sm: 6, md: 14, lg: 22, full: 999 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },
};

// ============================================================
// PRESET MAP — for quick lookup by keyword
// ============================================================
export const PRESETS = {
  'retro-neon': RETRO_NEON,
  'retro': RETRO_NEON,
  'neon': RETRO_NEON,
  'candy': CANDY_SWEET,
  'sweet': CANDY_SWEET,
  'candy-sweet': CANDY_SWEET,
  'casino': CASINO_GOLD,
  'gold': CASINO_GOLD,
  'casino-gold': CASINO_GOLD,
  'luxury': CASINO_GOLD,
  'cyberpunk': CYBERPUNK,
  'cyber': CYBERPUNK,
  'futuristic': CYBERPUNK,
  'warm-earthy': WARM_EARTHY,
  'earthy': WARM_EARTHY,
  'sand': WARM_EARTHY,
  'farm': WARM_EARTHY,
  'cozy': WARM_EARTHY,
  'nordic-minimal': NORDIC_MINIMAL,
  'nordic': NORDIC_MINIMAL,
  'scandinavian': NORDIC_MINIMAL,
  'mint': NORDIC_MINIMAL,
  'ocean-fresh': OCEAN_FRESH,
  'ocean': OCEAN_FRESH,
  'water': OCEAN_FRESH,
  'aqua': OCEAN_FRESH,
  'dark': DARK_PREMIUM,
  'premium': DARK_PREMIUM,
  'dark-premium': DARK_PREMIUM,
  'minimal': DARK_PREMIUM,
  'tropical': TROPICAL,
  'summer': TROPICAL,
  'jungle': TROPICAL,
  'space': SPACE_COSMOS,
  'cosmos': SPACE_COSMOS,
  'cosmic': SPACE_COSMOS,
  'galaxy': SPACE_COSMOS,
};

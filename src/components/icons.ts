/**
 * icons.ts — one icon contract for the whole app.
 *
 * lucide-react-native is the single icon library here; borrowing its own
 * component type keeps every button, pill and control structurally compatible
 * with any glyph the screens pick.
 */
import type { LucideIcon } from 'lucide-react-native';

export type IconComponent = LucideIcon;

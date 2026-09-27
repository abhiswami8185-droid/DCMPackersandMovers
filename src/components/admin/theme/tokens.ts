/**
 * DCM Admin Design Tokens
 * Centralized design system tokens for DCM Operations Command Center.
 * Supports consistent DCM brand identity in both Light and Dark modes.
 */

export interface ThemeColors {
  // Page & Shell Backgrounds
  pageBg: string;
  headerBg: string;
  sidebarBg: string;
  sidebarActiveBg: string;
  cardBg: string;
  cardBgElevated: string;
  cardBgSubtle: string;
  modalBg: string;
  tableHeaderBg: string;
  tableRowHoverBg: string;
  tableStripeBg: string;

  // Borders & Dividers
  borderDefault: string;
  borderSubtle: string;
  borderStrong: string;
  borderActive: string;
  borderGolden: string;

  // Typography Colors
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  textHeading: string;
  textLink: string;

  // DCM Brand Accents
  dcmNavy: string;
  dcmNavyDark: string;
  dcmNavyLight: string;
  dcmOrange: string;
  dcmOrangeDark: string;
  dcmOrangeLight: string;
  dcmGold: string;
  dcmGoldBg: string;
  dcmGoldBorder: string;
  dcmGoldText: string;

  // Status & Semantics
  successBg: string;
  successText: string;
  successBorder: string;
  warningBg: string;
  warningText: string;
  warningBorder: string;
  errorBg: string;
  errorText: string;
  errorBorder: string;
  infoBg: string;
  infoText: string;
  infoBorder: string;

  // Form Controls
  inputBg: string;
  inputText: string;
  inputBorder: string;
  inputPlaceholder: string;
  inputFocusBorder: string;
  inputFocusRing: string;

  // Shadows
  shadowCard: string;
  shadowDropdown: string;
  shadowModal: string;
}

export const LIGHT_TOKENS: ThemeColors = {
  // Page & Shell Backgrounds
  pageBg: 'bg-[#F8FAFC]',
  headerBg: 'bg-[#FFFFFF]/98',
  sidebarBg: 'bg-[#FFFFFF]',
  sidebarActiveBg: 'bg-[#0B3B8A]/8 text-white',
  cardBg: 'bg-white',
  cardBgElevated: 'bg-white',
  cardBgSubtle: 'bg-[#FFFDF5]',
  modalBg: 'bg-white',
  tableHeaderBg: 'bg-[#F8FAFC]',
  tableRowHoverBg: 'hover:bg-[#FFFDF5]/80',
  tableStripeBg: 'bg-[#FAFAFA]',

  // Borders & Dividers
  borderDefault: 'border-slate-200',
  borderSubtle: 'border-slate-150 border-slate-200/60',
  borderStrong: 'border-slate-300',
  borderActive: 'border-[#0B3B8A]',
  borderGolden: 'border-amber-300',

  // Typography Colors
  textPrimary: 'text-slate-900',
  textSecondary: 'text-slate-600',
  textMuted: 'text-slate-400',
  textInverse: 'text-white',
  textHeading: 'text-[#072559]',
  textLink: 'text-[#0B3B8A] hover:text-[#FF5E00]',

  // DCM Brand Accents
  dcmNavy: 'text-[#0B3B8A]',
  dcmNavyDark: 'text-[#072559]',
  dcmNavyLight: 'text-[#1A56B8]',
  dcmOrange: 'text-[#FF5E00]',
  dcmOrangeDark: 'text-[#D44800]',
  dcmOrangeLight: 'text-[#FF7A26]',
  dcmGold: 'text-[#B45309]',
  dcmGoldBg: 'bg-amber-50',
  dcmGoldBorder: 'border-amber-200',
  dcmGoldText: 'text-amber-800',

  // Status & Semantics
  successBg: 'bg-emerald-50',
  successText: 'text-emerald-700',
  successBorder: 'border-emerald-200',
  warningBg: 'bg-amber-50',
  warningText: 'text-amber-700',
  warningBorder: 'border-amber-200',
  errorBg: 'bg-rose-50',
  errorText: 'text-rose-700',
  errorBorder: 'border-rose-200',
  infoBg: 'bg-blue-50',
  infoText: 'text-blue-700',
  infoBorder: 'border-blue-200',

  // Form Controls
  inputBg: 'bg-white',
  inputText: 'text-slate-900',
  inputBorder: 'border-slate-200',
  inputPlaceholder: 'placeholder:text-slate-400',
  inputFocusBorder: 'focus:border-[#0B3B8A]',
  inputFocusRing: 'focus:ring-2 focus:ring-[#0B3B8A]/15',

  // Shadows
  shadowCard: 'shadow-[0_2px_8px_-2px_rgba(15,23,42,0.06)]',
  shadowDropdown: 'shadow-[0_12px_32px_-4px_rgba(15,23,42,0.12)]',
  shadowModal: 'shadow-[0_24px_48px_-12px_rgba(15,23,42,0.2)]',
};

export const DARK_TOKENS: ThemeColors = {
  // Page & Shell Backgrounds
  pageBg: 'bg-[#0B1120]',
  headerBg: 'bg-[#0F172A]/98',
  sidebarBg: 'bg-[#0F172A]',
  sidebarActiveBg: 'bg-[#1E293B]',
  cardBg: 'bg-[#151E32]',
  cardBgElevated: 'bg-[#1A253E]',
  cardBgSubtle: 'bg-[#0F172A]',
  modalBg: 'bg-[#151E32]',
  tableHeaderBg: 'bg-[#0F172A]',
  tableRowHoverBg: 'hover:bg-[#1A253E]/70',
  tableStripeBg: 'bg-[#111A2E]',

  // Borders & Dividers
  borderDefault: 'border-slate-800',
  borderSubtle: 'border-slate-800/80',
  borderStrong: 'border-slate-700',
  borderActive: 'border-[#38BDF8]',
  borderGolden: 'border-amber-500/40',

  // Typography Colors
  textPrimary: 'text-slate-100',
  textSecondary: 'text-slate-300',
  textMuted: 'text-slate-500',
  textInverse: 'text-slate-900',
  textHeading: 'text-white',
  textLink: 'text-[#38BDF8] hover:text-[#FFA149]',

  // DCM Brand Accents
  dcmNavy: 'text-[#60A5FA]',
  dcmNavyDark: 'text-[#93C5FD]',
  dcmNavyLight: 'text-[#3B82F6]',
  dcmOrange: 'text-[#FF7A26]',
  dcmOrangeDark: 'text-[#FF5E00]',
  dcmOrangeLight: 'text-[#FFA149]',
  dcmGold: 'text-[#FBBF24]',
  dcmGoldBg: 'bg-amber-950/40',
  dcmGoldBorder: 'border-amber-700/60',
  dcmGoldText: 'text-amber-300',

  // Status & Semantics
  successBg: 'bg-emerald-950/40',
  successText: 'text-emerald-300',
  successBorder: 'border-emerald-800/60',
  warningBg: 'bg-amber-950/40',
  warningText: 'text-amber-300',
  warningBorder: 'border-amber-800/60',
  errorBg: 'bg-rose-950/40',
  errorText: 'text-rose-300',
  errorBorder: 'border-rose-800/60',
  infoBg: 'bg-blue-950/40',
  infoText: 'text-blue-300',
  infoBorder: 'border-blue-800/60',

  // Form Controls
  inputBg: 'bg-[#0B1120]',
  inputText: 'text-slate-100',
  inputBorder: 'border-slate-700',
  inputPlaceholder: 'placeholder:text-slate-500',
  inputFocusBorder: 'focus:border-[#38BDF8]',
  inputFocusRing: 'focus:ring-2 focus:ring-[#38BDF8]/20',

  // Shadows
  shadowCard: 'shadow-[0_2px_8px_-2px_rgba(0,0,0,0.4)]',
  shadowDropdown: 'shadow-[0_12px_32px_-4px_rgba(0,0,0,0.6)]',
  shadowModal: 'shadow-[0_24px_48px_-12px_rgba(0,0,0,0.8)]',
};

export type AdminTheme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

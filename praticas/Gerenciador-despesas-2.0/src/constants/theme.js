export const LIGHT_THEME = {
  background: '#f3f4f6',
  surface: '#ffffff',
  surfaceAlt: '#eef2ff',
  primary: '#2563eb',
  primarySoft: '#dbeafe',
  danger: '#dc2626',
  success: '#16a34a',
  text: '#111827',
  textMuted: '#6b7280',
  border: '#d1d5db',
  chip: '#e5e7eb',
  chipText: '#374151',
};

export const DARK_THEME = {
  background: '#111827',
  surface: '#1f2937',
  surfaceAlt: '#1e3a8a',
  primary: '#60a5fa',
  primarySoft: '#1d4ed8',
  danger: '#f87171',
  success: '#4ade80',
  text: '#f9fafb',
  textMuted: '#cbd5e1',
  border: '#374151',
  chip: '#374151',
  chipText: '#e5e7eb',
};

export const getTheme = (isDark) => (isDark ? DARK_THEME : LIGHT_THEME);

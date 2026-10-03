import { TextStyle } from 'react-native';

// SF Pro is the system font on iOS — no need to bundle/name font files,
// just map Figma's weight names to RN fontWeight.
const weight = {
  regular: '400',
  semibold: '600',
  bold: '700',
  heavy: '800',
} as const;

export const typography: Record<string, TextStyle> = {
  largeTitle: { fontSize: 30, fontWeight: weight.heavy, letterSpacing: -0.4, lineHeight: 36 },
  statValue: { fontSize: 18, fontWeight: weight.bold, lineHeight: 21.5 },
  sectionTitle: { fontSize: 16.5, fontWeight: weight.bold, lineHeight: 20 },
  time: { fontSize: 15, fontWeight: weight.semibold, lineHeight: 18 },
  cardLabel: { fontSize: 13, fontWeight: weight.semibold, lineHeight: 15.5 },
  link: { fontSize: 12, fontWeight: weight.regular, lineHeight: 14.3 },
  statusBar: { fontSize: 12, fontWeight: weight.semibold, lineHeight: 14.3 },
  horseName: { fontSize: 12, fontWeight: weight.semibold, lineHeight: 14.3 },
  statLabel: { fontSize: 10, fontWeight: weight.regular, lineHeight: 12 },
  tabLabel: { fontSize: 9.5, fontWeight: weight.semibold, lineHeight: 11.3 },
  tabIcon: { fontSize: 17, fontWeight: weight.regular, lineHeight: 20.3 },
  buttonLabel: { fontSize: 14, fontWeight: weight.semibold, lineHeight: 16.7 },
  cardTitle: { fontSize: 13.5, fontWeight: weight.bold, lineHeight: 16.1 },
  cardSubtitle: { fontSize: 11, fontWeight: weight.regular, lineHeight: 13.1 },
  cardIcon: { fontSize: 22, lineHeight: 26.25 },
  navTitle: { fontSize: 17, fontWeight: weight.semibold, lineHeight: 20.3 },
  stepHeading: { fontSize: 16, fontWeight: weight.semibold, lineHeight: 19.1 },
  stepSubtitle: { fontSize: 12.5, fontWeight: weight.regular, lineHeight: 14.9 },
  pillLabel: { fontSize: 11, fontWeight: weight.semibold, lineHeight: 13.1 },
};

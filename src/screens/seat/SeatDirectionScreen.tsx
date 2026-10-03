import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, Ellipse, Path, RadialGradient, Stop } from 'react-native-svg';
import { useLocale } from '../../i18n/LocaleContext';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import type { SeatInfo } from './SeatFlow';
import { SeatScreenHeader } from './SeatScreenHeader';

const S_ROW_COLORS = ['#4a4a52', '#42424a', '#3a3a42', '#303038'];
const A_ROW_COLORS = ['#3c3c44', '#363640', '#30303a', '#2c2c36', '#282832'];
const B_ROW_COLORS = ['#30303a', '#2c2c36', '#282832', '#242430', '#20202c', '#1c1c28'];
const C_ROW_COLORS = ['#2c2c36', '#2c2c36', '#2c2c36', '#252530'];
const GATE_COLOR = '#FF9F0A';

export function SeatDirectionScreen({
  seat,
  venueLabel,
  onBack,
  onDone,
}: {
  seat: SeatInfo;
  venueLabel: string;
  onBack?: () => void;
  onDone?: () => void;
}) {
  const { t } = useLocale();
  const [venueBold, ...venueRestParts] = venueLabel.split('・');
  const venueRest = venueRestParts.length ? `・${venueRestParts.join('・')}` : '';

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <SeatScreenHeader title={t.seatGuide.directionTitle} onBack={onBack} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.subtitleRow}>
          <Text style={styles.subtitle} numberOfLines={1}>
            <Text style={styles.subtitleBold}>{venueBold}</Text>
            <Text>{venueRest}</Text>
          </Text>
          <View style={styles.seatLabelChip}>
            <Text style={styles.seatLabelTier}>
              {seat.tier}
              {t.seatGuide.tierLabel}
            </Text>
            <Text style={styles.seatLabelMeta}>
              {seat.row}
              {t.seatGuide.rowLabel}
            </Text>
            <Text style={styles.seatLabelMeta}>
              {seat.number}
              {t.seatGuide.seatNumberLabel}
            </Text>
          </View>
        </View>

        <View style={styles.mapOuter}>
          <View style={styles.mapCanvas}>
            <View style={styles.trackLayer}>
              <Svg width="100%" height="100%" viewBox="0 0 330 200">
                <Ellipse cx={165} cy={100} rx={165} ry={100} fill="#1A2E1A" opacity={0.6} />
                <Ellipse cx={165} cy={100} rx={139} ry={76} fill="black" opacity={0.85} />
              </Svg>
            </View>

            <View style={[styles.tierBg, styles.sTierBg]}>
              <TierGrid rows={4} cols={11} rectW={14} rectH={7} gapCol={3} gapRow={5} colors={S_ROW_COLORS} />
            </View>
            <Text style={styles.sTierLabel}>S席</Text>

            <View style={[styles.tierBg, styles.aTierLeft]}>
              <TierGrid rows={5} cols={4} rectW={12} rectH={7} gapCol={3} gapRow={5} colors={A_ROW_COLORS} />
            </View>
            <View style={[styles.tierBg, styles.aTierRight]}>
              <TierGrid rows={5} cols={4} rectW={12} rectH={7} gapCol={3} gapRow={5} colors={A_ROW_COLORS} />
            </View>

            <View style={[styles.tierBg, styles.bTierLeft]}>
              <TierGrid rows={6} cols={3} rectW={12} rectH={7} gapCol={3} gapRow={5} colors={B_ROW_COLORS} />
            </View>
            <View style={[styles.tierBg, styles.bTierRight]}>
              <TierGrid rows={6} cols={3} rectW={12} rectH={7} gapCol={3} gapRow={5} colors={B_ROW_COLORS} />
            </View>

            <View style={[styles.tierBg, styles.cTierBottom]}>
              <View style={styles.cTierRow}>
                {[0, 1, 2, 3].map((group) => (
                  <TierGrid
                    key={group}
                    rows={4}
                    cols={5}
                    rectW={12}
                    rectH={7}
                    gapCol={3}
                    gapRow={5}
                    colors={C_ROW_COLORS}
                  />
                ))}
              </View>
            </View>

            <View style={styles.westGate}>
              <GatePin />
              <Text style={styles.gateLabel}>{t.seatGuide.westGate}</Text>
            </View>
            <View style={styles.eastGate}>
              <GatePin />
              <Text style={styles.gateLabel}>{t.seatGuide.eastGate}</Text>
            </View>

            <View style={styles.shop1}>
              <AmenityPill label={t.seatGuide.shopLabel} />
            </View>
            <View style={styles.shop2}>
              <AmenityPill label={t.seatGuide.shopLabel} />
            </View>
            <View style={styles.infoDesk}>
              <AmenityPill label={t.seatGuide.infoLabel} />
            </View>
            <View style={styles.restroom}>
              <AmenityPill label={t.seatGuide.restroomLabel} emoji="🚻" />
            </View>

            <View style={styles.compass}>
              <Text style={styles.compassN}>N</Text>
              <Svg width={8} height={12} viewBox="0 0 8 12">
                <Path
                  d="M6.3336 6L4 2.4996L1.6664 6M4 2.4996V9.5004"
                  stroke="#6B6B70"
                  strokeWidth={2}
                  strokeLinecap="round"
                  fill="none"
                />
              </Svg>
            </View>

            <View style={styles.glowDot}>
              <Svg width="100%" height="100%" viewBox="0 0 70 70">
                <Defs>
                  <RadialGradient id="haloLarge" cx="35" cy="35" r="35" gradientUnits="userSpaceOnUse">
                    <Stop offset="0" stopColor="#2997FF" stopOpacity={0.4} />
                    <Stop offset="1" stopColor="#2997FF" stopOpacity={0} />
                  </RadialGradient>
                  <RadialGradient id="haloMed" cx="35" cy="35" r="20" gradientUnits="userSpaceOnUse">
                    <Stop offset="0" stopColor="#2997FF" stopOpacity={0.5} />
                    <Stop offset="1" stopColor="#2997FF" stopOpacity={0} />
                  </RadialGradient>
                </Defs>
                <Circle cx={35} cy={35} r={35} fill="url(#haloLarge)" />
                <Circle cx={35} cy={35} r={20} fill="url(#haloMed)" />
                <Circle cx={35} cy={35} r={5} fill="#2997FF" />
              </Svg>
            </View>

            <View style={styles.seatPinWrap}>
              <View style={styles.seatPinRotate}>
                <Svg width={29.5} height={19} viewBox="0 0 29.5 18.9998">
                  <Path
                    d="M29.5 9.5C26.6132 14.5 15.7467 17.9998 10.2467 18.9998C5 18.9998 0 14.7467 0 9.5C0 4.2533 5 -0.000218101 9.5 8.38768e-09C15 1 26.6132 4.00659 29.5 9.5Z"
                    fill="#2997FF"
                  />
                </Svg>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.doneButton} onPress={onDone} activeOpacity={0.85}>
          <Text style={styles.doneButtonLabel}>{t.seatGuide.doneButton}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function TierGrid({
  rows,
  cols,
  rectW,
  rectH,
  gapCol,
  gapRow,
  colors: rowColors,
}: {
  rows: number;
  cols: number;
  rectW: number;
  rectH: number;
  gapCol: number;
  gapRow: number;
  colors: string[];
}) {
  return (
    <View style={{ gap: gapRow }}>
      {rowColors.slice(0, rows).map((color, r) => (
        <View key={r} style={{ flexDirection: 'row', gap: gapCol }}>
          {Array.from({ length: cols }).map((_, c) => (
            <View key={c} style={{ width: rectW, height: rectH, borderRadius: 2, backgroundColor: color }} />
          ))}
        </View>
      ))}
    </View>
  );
}

function GatePin() {
  return (
    <View style={styles.gateIconRow}>
      <View style={styles.gateBar} />
      <View style={styles.gateBox} />
      <View style={styles.gateBar} />
    </View>
  );
}

function AmenityPill({ label, emoji }: { label: string; emoji?: string }) {
  return (
    <View style={styles.amenityPill}>
      <View style={styles.amenityIcon}>{emoji ? <Text style={styles.amenityEmoji}>{emoji}</Text> : null}</View>
      <Text style={styles.amenityLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.lg,
    paddingBottom: 60,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.xxl,
  },
  subtitle: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  subtitleBold: {
    fontWeight: '700',
  },
  seatLabelChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colors.card,
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  seatLabelTier: {
    color: colors.accentBlue,
    fontSize: 8,
    fontWeight: '700',
  },
  seatLabelMeta: {
    color: colors.textSecondary,
    fontSize: 8,
  },
  mapOuter: {
    marginHorizontal: -12,
    marginBottom: spacing.xxxl,
  },
  mapCanvas: {
    width: '100%',
    aspectRatio: 366 / 490,
    position: 'relative',
  },
  trackLayer: {
    position: 'absolute',
    left: '4.37%',
    top: '30.20%',
    width: '90.16%',
    height: '40.82%',
  },
  tierBg: {
    position: 'absolute',
    padding: 8,
  },
  sTierBg: {
    left: '21.86%',
    top: '2.04%',
    width: '56.28%',
    height: '14.29%',
    backgroundColor: '#333338',
    borderRadius: 14,
    overflow: 'hidden',
  },
  sTierLabel: {
    position: 'absolute',
    left: '48.91%',
    top: '1.63%',
    color: '#9a9a9e',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  aTierLeft: {
    left: '0.27%',
    top: '3.67%',
    width: '18.58%',
    height: '18.37%',
    backgroundColor: '#2a2a2e',
    borderRadius: 12,
    paddingHorizontal: 6,
    overflow: 'hidden',
  },
  aTierRight: {
    left: '80.33%',
    top: '3.67%',
    width: '18.58%',
    height: '18.37%',
    backgroundColor: '#2a2a2e',
    borderRadius: 12,
    paddingHorizontal: 6,
    overflow: 'hidden',
  },
  bTierLeft: {
    left: '0.27%',
    top: '23.06%',
    width: '15.03%',
    height: '15.31%',
    backgroundColor: '#1e1e22',
    borderRadius: 12,
    paddingHorizontal: 6,
    overflow: 'hidden',
  },
  bTierRight: {
    left: '83.88%',
    top: '23.06%',
    width: '15.03%',
    height: '15.31%',
    backgroundColor: '#1e1e22',
    borderRadius: 12,
    paddingHorizontal: 6,
    overflow: 'hidden',
  },
  cTierBottom: {
    left: '6.97%',
    top: '74.29%',
    width: '86.07%',
    height: '11.84%',
    backgroundColor: '#1e1e22',
    borderRadius: 12,
    overflow: 'hidden',
  },
  cTierRow: {
    flexDirection: 'row',
    gap: 5,
  },
  westGate: {
    position: 'absolute',
    left: '-1.37%',
    top: '39.39%',
    alignItems: 'center',
    gap: 4,
    padding: 6,
    width: 60,
  },
  eastGate: {
    position: 'absolute',
    left: '88.80%',
    top: '62.86%',
    alignItems: 'center',
    gap: 4,
    padding: 6,
    width: 60,
  },
  gateIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  gateBar: {
    width: 6,
    height: 16,
    borderRadius: 2,
    backgroundColor: GATE_COLOR,
  },
  gateBox: {
    width: 10,
    height: 10,
    borderRadius: 1,
    borderWidth: 1.5,
    borderColor: GATE_COLOR,
    backgroundColor: 'transparent',
  },
  gateLabel: {
    color: GATE_COLOR,
    fontSize: 9,
    fontWeight: '700',
    flexShrink: 0,
  },
  amenityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#2a2a2e',
    borderRadius: 12,
    paddingLeft: 6,
    paddingRight: 8,
    paddingVertical: 4,
  },
  amenityIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#3a3a44',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amenityEmoji: {
    fontSize: 10,
    color: 'black',
  },
  amenityLabel: {
    color: '#9a9a9e',
    fontSize: 8,
  },
  shop1: {
    position: 'absolute',
    left: '21.86%',
    top: '16.94%',
  },
  shop2: {
    position: 'absolute',
    left: '63.93%',
    top: '16.94%',
  },
  infoDesk: {
    position: 'absolute',
    left: '20.77%',
    top: '23.47%',
  },
  restroom: {
    position: 'absolute',
    left: '-0.27%',
    top: '64.49%',
  },
  compass: {
    position: 'absolute',
    left: '90.16%',
    top: '85.71%',
    alignItems: 'center',
    gap: 2,
  },
  compassN: {
    color: '#6b6b70',
    fontSize: 8,
    fontWeight: '700',
  },
  glowDot: {
    position: 'absolute',
    left: '57.92%',
    top: '2.04%',
    width: '19.13%',
    height: '14.29%',
  },
  seatPinWrap: {
    position: 'absolute',
    left: '24.04%',
    top: '55.51%',
    width: '9.55%',
    height: '6.23%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatPinRotate: {
    transform: [{ rotate: '-27.75deg' }],
  },
  doneButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.accentBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButtonLabel: {
    color: colors.background,
    fontSize: 15,
    fontWeight: '700',
  },
});

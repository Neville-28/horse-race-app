import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useLocale } from '../i18n/LocaleContext';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

const RING_RADIUS = 32;
const RING_STROKE = 9;
const RING_CIRC = 2 * Math.PI * RING_RADIUS;

export function RaceHeroCard({
  horseName,
  odds,
  onRanking,
  onRacecard,
}: {
  horseName: string;
  odds: string;
  onRanking?: () => void;
  onRacecard?: () => void;
}) {
  const { t } = useLocale();

  const segments = [
    { pct: 50, color: colors.accentBlue, label: t.summary.hero.honmei },
    { pct: 30, color: colors.accentLime, label: t.summary.hero.taikou },
    { pct: 20, color: colors.recordRed, label: t.summary.hero.ana },
  ];

  let offsetAcc = 0;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.entryInfo}>
          <Text style={[typography.cardLabel, styles.entryLabel]}>{t.summary.hero.entryLabel}</Text>
          <View style={styles.horseRow}>
            <Text style={styles.horseEmoji}>🏅</Text>
            <Text style={[typography.cardTitle, styles.horseName]}>{horseName}</Text>
            <Text style={[typography.statLabel, styles.odds]}>{odds}</Text>
          </View>
          <View style={styles.countdownBox}>
            <Text style={[typography.cardLabel, styles.countdownLabel]}>
              {t.summary.hero.currentRaceLabel}
            </Text>
            <Text style={[typography.statValue, styles.countdownValue]}>
              {t.summary.hero.countdownValue}
            </Text>
          </View>
          <Text style={[typography.stepSubtitle, styles.nextRace]}>{t.summary.hero.nextRace}</Text>
        </View>

        <View style={styles.ringWrap}>
          <Svg width={80} height={80} viewBox="0 0 80 80">
            <Circle
              cx={40}
              cy={40}
              r={RING_RADIUS}
              stroke={colors.cardBorder}
              strokeWidth={RING_STROKE}
              fill="none"
              transform="rotate(-90 40 40)"
            />
            {segments.map((seg) => {
              const dash = (seg.pct / 100) * RING_CIRC;
              const el = (
                <Circle
                  key={seg.label}
                  cx={40}
                  cy={40}
                  r={RING_RADIUS}
                  stroke={seg.color}
                  strokeWidth={RING_STROKE}
                  strokeDasharray={`${dash} ${RING_CIRC - dash}`}
                  strokeDashoffset={-offsetAcc}
                  strokeLinecap="butt"
                  fill="none"
                  transform="rotate(-90 40 40)"
                />
              );
              offsetAcc += dash;
              return el;
            })}
          </Svg>
        </View>
      </View>

      <View style={styles.legendRow}>
        {segments.map((seg) => (
          <View key={seg.label} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: seg.color }]} />
            <Text style={[typography.statLabel, styles.legendLabel]}>{seg.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={onRanking} activeOpacity={0.8}>
          <Text style={[typography.buttonLabel, styles.buttonPrimaryLabel]}>
            {t.summary.hero.rankingButton}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonGhost]} onPress={onRacecard} activeOpacity={0.8}>
          <Text style={[typography.buttonLabel, styles.buttonGhostLabel]}>
            {t.summary.hero.racecardButton}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.xxl,
    marginBottom: spacing.xxxl,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  entryInfo: {
    flex: 1,
    gap: spacing.sm,
    paddingRight: spacing.lg,
  },
  entryLabel: {
    color: colors.textSecondary,
  },
  horseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  horseEmoji: {
    fontSize: 16,
  },
  horseName: {
    color: colors.textPrimary,
  },
  odds: {
    color: colors.textTertiary,
  },
  countdownBox: {
    alignSelf: 'flex-start',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.recordRedSoft,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    marginTop: spacing.xs,
    gap: 2,
  },
  countdownLabel: {
    color: colors.textSecondary,
  },
  countdownValue: {
    color: colors.accentLime,
  },
  nextRace: {
    color: colors.textSecondary,
  },
  ringWrap: {
    width: 80,
    height: 80,
  },
  legendRow: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginTop: spacing.xl,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  legendDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  legendLabel: {
    color: colors.textSecondary,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.xl,
  },
  button: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: colors.accentBlue,
  },
  buttonPrimaryLabel: {
    color: colors.textPrimary,
  },
  buttonGhost: {
    backgroundColor: colors.pillGhost,
  },
  buttonGhostLabel: {
    color: colors.textPrimary,
  },
});

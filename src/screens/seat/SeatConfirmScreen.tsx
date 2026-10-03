import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocale } from '../../i18n/LocaleContext';
import { colors } from '../../theme/colors';
import { radius, spacing } from '../../theme/spacing';
import type { SeatInfo } from './SeatFlow';
import { SeatScreenHeader } from './SeatScreenHeader';

export function SeatConfirmScreen({
  seat,
  onBack,
  onGuide,
  onRedo,
}: {
  seat: SeatInfo;
  onBack?: () => void;
  onGuide?: () => void;
  onRedo?: () => void;
}) {
  const { t } = useLocale();

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <SeatScreenHeader title={t.seatGuide.confirmTitle} onBack={onBack} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>{t.seatGuide.confirmSubtitle}</Text>

        <Text style={styles.floorTag}>F3</Text>
        <View style={styles.seatRow}>
          <SeatChip label={t.seatGuide.tierLabel} value={seat.tier} />
          <SeatChip label={t.seatGuide.rowLabel} value={seat.row} />
          <SeatChip label={t.seatGuide.seatNumberLabel} value={seat.number} />
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={onGuide} activeOpacity={0.85}>
          <Text style={styles.primaryButtonLabel}>{t.seatGuide.guideButton}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.redoPill} onPress={onRedo} activeOpacity={0.7}>
          <Text style={styles.redoLabel}>{t.seatGuide.redoButton}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function SeatChip({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipLabel}>{label}</Text>
      <Text style={styles.chipValue}>{value}</Text>
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
  subtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: spacing.xxl * 2,
  },
  floorTag: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: spacing.md,
  },
  seatRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xxxl,
  },
  chip: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: 4,
  },
  chipLabel: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  chipValue: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
  },
  primaryButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.accentBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  primaryButtonLabel: {
    color: colors.background,
    fontSize: 15,
    fontWeight: '700',
  },
  redoPill: {
    alignSelf: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.badgeGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  redoLabel: {
    color: colors.textSecondary,
    fontSize: 11,
  },
});

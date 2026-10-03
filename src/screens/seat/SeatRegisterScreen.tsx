import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocale } from '../../i18n/LocaleContext';
import { colors } from '../../theme/colors';
import { radius, spacing } from '../../theme/spacing';
import type { SeatInfo } from './SeatFlow';
import { SeatScreenHeader } from './SeatScreenHeader';

export function SeatRegisterScreen({
  seat,
  onBack,
  onReview,
}: {
  seat: SeatInfo;
  onBack?: () => void;
  onReview?: () => void;
}) {
  const { t } = useLocale();

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <SeatScreenHeader title={t.seatGuide.registerTitle} onBack={onBack} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>{t.seatGuide.registerSubtitle}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t.seatGuide.scanTitle}</Text>
          <TouchableOpacity style={styles.scanButton} onPress={onReview} activeOpacity={0.85}>
            <Text style={styles.scanButtonLabel}>{t.seatGuide.scanButton}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.manualHint}>{t.seatGuide.manualHint}</Text>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>{t.seatGuide.areaLabel}</Text>
          <Text style={styles.fieldValue}>{t.seatGuide.areaValue}</Text>
        </View>

        <View style={styles.seatRow}>
          <SeatChip label={t.seatGuide.tierLabel} value={seat.tier} />
          <SeatChip label={t.seatGuide.rowLabel} value={seat.row} />
          <SeatChip label={t.seatGuide.seatNumberLabel} value={seat.number} />
        </View>

        <TouchableOpacity style={styles.reviewButton} onPress={onReview} activeOpacity={0.85}>
          <Text style={styles.reviewButtonLabel}>{t.seatGuide.reviewButton}</Text>
        </TouchableOpacity>

        <Text style={styles.footnote}>{t.seatGuide.registerFootnote}</Text>
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
    marginBottom: spacing.xxl,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.xl,
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
  scanButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.accentBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButtonLabel: {
    color: colors.background,
    fontSize: 15,
    fontWeight: '700',
  },
  manualHint: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: spacing.lg,
  },
  field: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.lg,
    gap: 4,
    marginBottom: spacing.md,
  },
  fieldLabel: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  fieldValue: {
    color: colors.textPrimary,
    fontSize: 15,
  },
  seatRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xxl,
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
    fontSize: 16,
    fontWeight: '700',
  },
  reviewButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.accentBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  reviewButtonLabel: {
    color: colors.background,
    fontSize: 15,
    fontWeight: '700',
  },
  footnote: {
    color: colors.textSecondary,
    fontSize: 11,
  },
});

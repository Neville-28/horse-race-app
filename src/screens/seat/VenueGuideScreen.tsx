import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocale } from '../../i18n/LocaleContext';
import { colors } from '../../theme/colors';
import { radius, spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { SeatScreenHeader } from './SeatScreenHeader';

export function VenueGuideScreen({
  venueLabel,
  onBack,
  onFindSeat,
  onOpenMap,
}: {
  venueLabel: string;
  onBack?: () => void;
  onFindSeat?: () => void;
  onOpenMap?: () => void;
}) {
  const { t } = useLocale();

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <SeatScreenHeader title={t.seatGuide.guideTitle} onBack={onBack} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>{venueLabel}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitleLg}>{t.seatGuide.findSeatTitle}</Text>
          <Text style={styles.cardHint}>{t.seatGuide.findSeatHint}</Text>
          <TouchableOpacity style={styles.primaryButton} onPress={onFindSeat} activeOpacity={0.85}>
            <Text style={styles.primaryButtonLabel}>{t.seatGuide.findSeatButton}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitleMd}>{t.seatGuide.mapTitle}</Text>
          <Text style={styles.cardHint}>
            {t.seatGuide.mapVenueLabel} {venueLabel}
          </Text>
          <TouchableOpacity style={styles.primaryButton} onPress={onOpenMap} activeOpacity={0.85}>
            <Text style={styles.primaryButtonLabel}>{t.seatGuide.mapButton}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    gap: spacing.sm,
    marginBottom: spacing.xxl,
  },
  cardTitleLg: {
    color: colors.textPrimary,
    fontSize: 21,
    fontWeight: '700',
  },
  cardTitleMd: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
  cardHint: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: spacing.sm,
  },
  primaryButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.accentBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonLabel: {
    ...typography.buttonLabel,
    color: colors.textPrimary,
  },
});

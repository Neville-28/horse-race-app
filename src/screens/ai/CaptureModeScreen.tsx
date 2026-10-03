import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useLocale } from '../../i18n/LocaleContext';
import { colors } from '../../theme/colors';
import { radius, spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export function CaptureModeScreen({
  onSelectVideo,
  onSelectPhoto,
}: {
  onSelectVideo?: () => void;
  onSelectPhoto?: () => void;
}) {
  const { t } = useLocale();

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title={t.aiScan.modeTitle} />

      <View style={styles.body}>
        <Text style={[typography.stepHeading, styles.heading]}>{t.aiScan.modeHeading}</Text>

        <TouchableOpacity
          style={[styles.optionCard, styles.optionCardRecommended]}
          onPress={onSelectVideo}
          activeOpacity={0.8}
        >
          <View style={styles.optionIcon}>
            <Text style={styles.optionGlyph}>▶</Text>
          </View>
          <View style={styles.optionText}>
            <View style={styles.optionLabelRow}>
              <Text style={[typography.cardTitle, styles.optionLabel]}>{t.aiScan.modeVideoLabel}</Text>
              <View style={styles.recommendedBadge}>
                <Text style={styles.recommendedBadgeText}>{t.aiScan.modeVideoBadge}</Text>
              </View>
            </View>
            <Text style={[typography.cardSubtitle, styles.optionDesc]}>{t.aiScan.modeVideoDesc}</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionCard} onPress={onSelectPhoto} activeOpacity={0.8}>
          <View style={styles.optionIcon}>
            <Text style={styles.optionGlyph}>◎</Text>
          </View>
          <View style={styles.optionText}>
            <Text style={[typography.cardTitle, styles.optionLabel]}>{t.aiScan.modePhotoLabel}</Text>
            <Text style={[typography.cardSubtitle, styles.optionDesc]}>{t.aiScan.modePhotoDesc}</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xxxl,
  },
  heading: {
    color: colors.textPrimary,
    marginBottom: spacing.xxl,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.circleButton,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionGlyph: {
    color: colors.accentBlue,
    fontSize: 18,
  },
  optionCardRecommended: {
    borderColor: colors.accentBlue,
  },
  optionText: {
    flex: 1,
    gap: spacing.xs,
  },
  optionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  optionLabel: {
    color: colors.textPrimary,
  },
  recommendedBadge: {
    backgroundColor: colors.accentBlue,
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 1,
  },
  recommendedBadgeText: {
    color: colors.textPrimary,
    fontSize: 10,
    fontWeight: '700',
  },
  optionDesc: {
    color: colors.textSecondary,
  },
  chevron: {
    color: colors.textTertiary,
    fontSize: 20,
    fontWeight: '700',
  },
});

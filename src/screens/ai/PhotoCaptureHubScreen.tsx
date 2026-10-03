import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useLocale } from '../../i18n/LocaleContext';
import { colors } from '../../theme/colors';
import { radius, spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { PhotoAngle } from './AiScanFlow';

const ANGLES: { key: PhotoAngle; glyph: string }[] = [
  { key: 'front', glyph: '▲' },
  { key: 'side', glyph: '◀' },
];

export function PhotoCaptureHubScreen({
  captured,
  onBack,
  onCapture,
  onAnalyze,
}: {
  captured: Record<PhotoAngle, boolean>;
  onBack?: () => void;
  onCapture?: (angle: PhotoAngle) => void;
  onAnalyze?: () => void;
}) {
  const { t } = useLocale();
  const hasAny = captured.front || captured.side;

  const angleLabel = (angle: PhotoAngle) => (angle === 'front' ? t.aiScan.frontTitle : t.aiScan.sideTitle);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title={t.aiScan.photoHubTitle} onBack={onBack} />

      <View style={styles.body}>
        <Text style={[typography.stepHeading, styles.heading]}>{t.aiScan.photoHubHeading}</Text>
        <Text style={[typography.stepSubtitle, styles.subtitle]}>{t.aiScan.angleSubtitle}</Text>

        <View style={styles.list}>
          {ANGLES.map((angle) => {
            const done = captured[angle.key];
            return (
              <TouchableOpacity
                key={angle.key}
                style={[styles.slotCard, done && styles.slotCardDone]}
                onPress={() => onCapture?.(angle.key)}
                activeOpacity={0.8}
              >
                <View style={[styles.slotIcon, done && styles.slotIconDone]}>
                  <Text style={styles.slotGlyph}>{angle.glyph}</Text>
                </View>
                <View style={styles.slotText}>
                  <Text style={[typography.cardTitle, styles.slotLabel]}>{angleLabel(angle.key)}</Text>
                  <Text style={[typography.cardSubtitle, done ? styles.slotStatusDone : styles.slotStatus]}>
                    {done ? t.aiScan.captured : t.aiScan.notCaptured}
                  </Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.analyzeButton, !hasAny && styles.analyzeButtonDisabled]}
          onPress={() => hasAny && onAnalyze?.()}
          activeOpacity={0.8}
          disabled={!hasAny}
        >
          <Text style={[typography.buttonLabel, styles.analyzeLabel]}>{t.aiScan.analyzeButton}</Text>
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
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.textSecondary,
    marginBottom: spacing.xxl,
  },
  list: {
    gap: spacing.lg,
    marginBottom: spacing.xxxl,
  },
  slotCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.xl,
  },
  slotCardDone: {
    borderColor: colors.accentLime,
  },
  slotIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.captureBox,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotIconDone: {
    backgroundColor: colors.circleButton,
  },
  slotGlyph: {
    color: colors.accentBlue,
    fontSize: 16,
  },
  slotText: {
    flex: 1,
    gap: 2,
  },
  slotLabel: {
    color: colors.textPrimary,
  },
  slotStatus: {
    color: colors.textTertiary,
  },
  slotStatusDone: {
    color: colors.accentLime,
  },
  chevron: {
    color: colors.textTertiary,
    fontSize: 20,
    fontWeight: '700',
  },
  analyzeButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.accentBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  analyzeButtonDisabled: {
    opacity: 0.4,
  },
  analyzeLabel: {
    color: colors.textPrimary,
  },
});

import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CaptureGuide } from '../../components/CaptureGuide';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useLocale } from '../../i18n/LocaleContext';
import { colors } from '../../theme/colors';
import { radius, spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { PhotoAngle } from './AiScanFlow';

export function PhotoScanScreen({
  angle,
  title,
  heading,
  subtitle,
  onBack,
  onConfirm,
}: {
  angle: PhotoAngle;
  title: string;
  heading: string;
  subtitle: string;
  onBack?: () => void;
  onConfirm?: () => void;
}) {
  const { t } = useLocale();
  const [captured, setCaptured] = useState(false);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title={title} onBack={onBack} />

      <View style={styles.body}>
        <View style={styles.captureBox}>
          {!captured && <CaptureGuide angle={angle} />}
          {captured && (
            <View style={styles.capturedBadge}>
              <Text style={[typography.pillLabel, styles.capturedBadgeText]}>{t.aiScan.captured}</Text>
            </View>
          )}
        </View>

        <Text style={[typography.stepHeading, styles.heading]}>{heading}</Text>
        <Text style={[typography.stepSubtitle, styles.subtitle]}>{subtitle}</Text>

        {!captured ? (
          <TouchableOpacity
            style={styles.shutterOuter}
            onPress={() => setCaptured(true)}
            activeOpacity={0.8}
          >
            <View style={styles.shutterInner} />
          </TouchableOpacity>
        ) : (
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionGhost]}
              onPress={() => setCaptured(false)}
              activeOpacity={0.8}
            >
              <Text style={[typography.buttonLabel, styles.actionGhostLabel]}>{t.aiScan.retake}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionPrimary]}
              onPress={onConfirm}
              activeOpacity={0.8}
            >
              <Text style={[typography.buttonLabel, styles.actionPrimaryLabel]}>{t.aiScan.backToHub}</Text>
            </TouchableOpacity>
          </View>
        )}
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
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xxxl,
  },
  captureBox: {
    width: 300,
    height: 300,
    borderRadius: radius.lg,
    backgroundColor: colors.captureBox,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: 'center',
    paddingTop: spacing.lg,
  },
  capturedBadge: {
    height: 24,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    backgroundColor: colors.accentLime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  capturedBadgeText: {
    color: colors.background,
  },
  heading: {
    color: colors.textPrimary,
    marginTop: spacing.xl,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
    maxWidth: 320,
  },
  shutterOuter: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 4,
    borderColor: colors.shutterRing,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xxxl,
  },
  shutterInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.textPrimary,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginTop: spacing.xxxl,
  },
  actionButton: {
    width: 145,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionGhost: {
    backgroundColor: colors.pillGhost,
  },
  actionPrimary: {
    backgroundColor: colors.accentBlue,
  },
  actionGhostLabel: {
    color: colors.textPrimary,
  },
  actionPrimaryLabel: {
    color: colors.textPrimary,
  },
});

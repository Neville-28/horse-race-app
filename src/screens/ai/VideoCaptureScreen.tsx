import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CaptureGuide } from '../../components/CaptureGuide';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useLocale } from '../../i18n/LocaleContext';
import { colors } from '../../theme/colors';
import { radius, spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const DURATION_SECONDS = 10;

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
}

export function VideoCaptureScreen({
  onBack,
  onComplete,
}: {
  onBack?: () => void;
  onComplete?: () => void;
}) {
  const { t } = useLocale();
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [captured, setCaptured] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!recording) return;
    timerRef.current = setInterval(() => {
      setElapsed((prev) => {
        if (prev + 1 >= DURATION_SECONDS) {
          if (timerRef.current) clearInterval(timerRef.current);
          setRecording(false);
          setCaptured(true);
          return DURATION_SECONDS;
        }
        return prev + 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [recording]);

  const handleShutterPress = () => {
    if (captured) return;
    setRecording((prev) => !prev);
  };

  const handleRetake = () => {
    setRecording(false);
    setElapsed(0);
    setCaptured(false);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title={t.aiScan.videoTitle} onBack={onBack} />

      <View style={styles.body}>
        <View style={styles.captureBox}>
          {!recording && !captured && <CaptureGuide angle="side" />}
          {(recording || captured) && (
            <View style={styles.recordingBadge}>
              <Text style={[typography.pillLabel, styles.recordingBadgeText]}>
                ● {formatTime(elapsed)} / {formatTime(DURATION_SECONDS)}
              </Text>
            </View>
          )}
        </View>

        <Text style={[typography.stepHeading, styles.heading]}>{t.aiScan.videoHeading}</Text>
        <Text style={[typography.stepSubtitle, styles.subtitle]}>{t.aiScan.videoSubtitle}</Text>

        {!captured ? (
          <TouchableOpacity
            style={styles.shutterOuter}
            onPress={handleShutterPress}
            activeOpacity={0.8}
          >
            <View style={[styles.shutterInner, recording && styles.shutterInnerActive]} />
          </TouchableOpacity>
        ) : (
          <View style={styles.actionsRow}>
            <TouchableOpacity style={[styles.actionButton, styles.actionGhost]} onPress={handleRetake} activeOpacity={0.8}>
              <Text style={[typography.buttonLabel, styles.actionGhostLabel]}>{t.aiScan.retake}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionPrimary]}
              onPress={onComplete}
              activeOpacity={0.8}
            >
              <Text style={[typography.buttonLabel, styles.actionPrimaryLabel]}>{t.aiScan.complete}</Text>
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
  recordingBadge: {
    height: 26,
    paddingHorizontal: spacing.lg,
    borderRadius: 13,
    backgroundColor: colors.recordRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordingBadgeText: {
    color: colors.textPrimary,
  },
  heading: {
    color: colors.textPrimary,
    marginTop: spacing.xxxl,
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
    backgroundColor: colors.recordRed,
  },
  shutterInnerActive: {
    width: 26,
    height: 26,
    borderRadius: 6,
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

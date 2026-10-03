import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useLocale } from '../../i18n/LocaleContext';
import { colors } from '../../theme/colors';
import { radius, spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { PhotoAngle } from './AiScanFlow';

export type ResultSource = { type: 'video' } | { type: 'photo'; angles: PhotoAngle[] };

type Tier = 'grass' | 'gold';

type Metric = {
  id: string;
  label: string;
  comment: string;
  score: number;
  tier: Tier;
  requiresMotion?: boolean;
};

const OVERALL_REVIEW: Record<'ja' | 'zh', string> = {
  ja: '気配は非常に良く、パドックでの歩きぶりにも堂々とした落ち着きが見える。毛艶に清潔感があり、仕上げの精度の高さがうかがえる一頭。特に注目したいのは歩様のリズムで、後肢の踏み込みが深く、飛節の使い方に無駄のない力強さが感じられる。気合は十分だがイレ込みは見られず、精神面の安定感はそのままレース内容に直結するはず。渾身の仕上げで送り出してきた印象が強く、当日の状態面では死角が少ないと見る。',
  zh: '气色极佳，在亮相圈的步伐也显得沉稳大气。毛色富有光泽，可见调教精细。尤其值得关注的是步伐节奏——后蹄着地深，飞节动作自然有力。斗志充足但未见急躁，精神层面的稳定会直接反映在比赛内容上。整体呈送出巅峰状态的印象，当日状态面几乎没有明显短板。',
};

const METRICS: Record<'ja' | 'zh', Metric[]> = {
  ja: [
    {
      id: 'demeanor',
      label: '気配',
      comment: '目に力があり、周囲を落ち着いて見渡している。イレ込みは見られず精神面は安定',
      score: 91,
      tier: 'grass',
    },
    {
      id: 'coat',
      label: '毛艶',
      comment: '毛艶に清潔感があり、仕上げの精度の高さがうかがえる',
      score: 88,
      tier: 'grass',
    },
    {
      id: 'physique',
      label: '馬体・仕上がり',
      comment: '後躯の筋肉に厚みがあり、絞れ具合も良好。ピークに近い仕上がり',
      score: 90,
      tier: 'grass',
    },
    {
      id: 'gait',
      label: '歩様（踏み込み）',
      comment: '後肢の踏み込みが深く、歩幅にリズムの乱れがない',
      score: 86,
      tier: 'gold',
      requiresMotion: true,
    },
    {
      id: 'tension',
      label: 'テンション・気合',
      comment: '気合は十分だが力みは見られず、理想的な入れ込み具合',
      score: 84,
      tier: 'gold',
    },
    {
      id: 'neck',
      label: '首の使い方',
      comment: '首の使い方が柔らかく、リラックスした状態で歩けている',
      score: 89,
      tier: 'grass',
    },
  ],
  zh: [
    {
      id: 'demeanor',
      label: '气色',
      comment: '眼神有神，环顾四周时显得从容，未见急躁，精神状态稳定',
      score: 91,
      tier: 'grass',
    },
    {
      id: 'coat',
      label: '毛色光泽',
      comment: '毛色富有光泽，可见调教精细度很高',
      score: 88,
      tier: 'grass',
    },
    {
      id: 'physique',
      label: '体态・状态',
      comment: '后躯肌肉厚实，减重适度，接近状态巅峰',
      score: 90,
      tier: 'grass',
    },
    {
      id: 'gait',
      label: '步伐（后蹄着地）',
      comment: '后蹄着地深、步幅节奏没有紊乱',
      score: 86,
      tier: 'gold',
      requiresMotion: true,
    },
    {
      id: 'tension',
      label: '紧张度・斗志',
      comment: '斗志充足但不显僵硬，属于理想的入厩状态',
      score: 84,
      tier: 'gold',
    },
    {
      id: 'neck',
      label: '颈部动作',
      comment: '颈部动作柔和，能在放松状态下行走',
      score: 89,
      tier: 'grass',
    },
  ],
};

export function AnalysisResultScreen({
  source,
  onRetry,
}: {
  source: ResultSource;
  onRetry?: () => void;
}) {
  const { t, locale } = useLocale();
  const metrics = METRICS[locale];
  const review = OVERALL_REVIEW[locale];
  const overall = Math.round(metrics.reduce((sum, m) => sum + m.score, 0) / metrics.length);
  const hasMotion = source.type === 'video';

  const sourceText =
    source.type === 'video'
      ? t.aiScan.sourceVideo
      : `${t.aiScan.sourcePhoto}（${source.angles
          .map((a) => (a === 'front' ? t.aiScan.frontTitle : t.aiScan.sideTitle))
          .join('・')}）`;

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title={t.aiScan.resultTitle} onBack={onRetry} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.assistNotice}>
          <Text style={styles.assistIcon}>ⓘ</Text>
          <Text style={[typography.stepSubtitle, styles.assistText]}>{t.aiScan.assistNotice}</Text>
        </View>

        <View style={styles.sourceRow}>
          <View style={styles.sourceChip}>
            <Text style={[typography.pillLabel, styles.sourceChipLabel]}>{t.aiScan.sourceLabel}</Text>
            <Text style={[typography.pillLabel, styles.sourceChipValue]}>{sourceText}</Text>
          </View>
          <Text
            style={[
              typography.statLabel,
              hasMotion ? styles.confidenceHigh : styles.confidenceMedium,
            ]}
          >
            {hasMotion ? t.aiScan.confidenceHigh : t.aiScan.confidenceMedium}
          </Text>
        </View>

        <View style={styles.verdict}>
          <View style={styles.verdictTopRow}>
            <View style={styles.verdictScoreWrap}>
              <Text style={styles.verdictScore}>{overall}</Text>
              <Text style={styles.verdictScoreSuffix}>/100</Text>
            </View>
            <View style={styles.verdictMarkRow}>
              <View style={styles.markGlyph}>
                <Text style={styles.markGlyphText}>◎</Text>
              </View>
              <Text style={[typography.pillLabel, styles.verdictMarkText]}>{t.aiScan.verdictMark}</Text>
            </View>
          </View>
          <Text style={[typography.cardLabel, styles.overallLabel]}>{t.aiScan.overallReviewLabel}</Text>
          <Text style={[typography.stepSubtitle, styles.overallText]}>{review}</Text>
        </View>

        <Text style={[typography.sectionTitle, styles.breakdownTitle]}>{t.aiScan.breakdownLabel}</Text>
        <View style={styles.breakdown}>
          {metrics.map((m) => {
            const estimated = m.requiresMotion && !hasMotion;
            return (
              <View key={m.id} style={[styles.metricRow, estimated && styles.metricRowEstimated]}>
                <View style={styles.metricHeader}>
                  <View style={styles.metricLabelRow}>
                    <Text style={[typography.cardTitle, styles.metricLabel]}>{m.label}</Text>
                    {estimated && (
                      <View style={styles.estimatedTag}>
                        <Text style={styles.estimatedTagText}>{t.aiScan.estimatedTag}</Text>
                      </View>
                    )}
                  </View>
                  <Text
                    style={[
                      typography.statValue,
                      styles.metricScore,
                      { color: m.tier === 'grass' ? colors.accentLime : colors.accentCyan },
                    ]}
                  >
                    {m.score}
                  </Text>
                </View>
                <Text style={[typography.cardSubtitle, styles.metricComment]}>{m.comment}</Text>
                <View style={styles.metricBarTrack}>
                  <View
                    style={[
                      styles.metricBarFill,
                      {
                        width: `${m.score}%`,
                        backgroundColor: m.tier === 'grass' ? colors.accentLime : colors.accentCyan,
                        opacity: estimated ? 0.5 : 1,
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </View>

        {!hasMotion && (
          <Text style={[typography.statLabel, styles.gaitNote]}>{t.aiScan.gaitEstimatedNote}</Text>
        )}

        <Text style={[typography.statLabel, styles.disclaimer]}>{t.aiScan.disclaimer}</Text>

        <TouchableOpacity style={styles.retryButton} onPress={onRetry} activeOpacity={0.8}>
          <Text style={[typography.buttonLabel, styles.retryLabel]}>{t.aiScan.retryButton}</Text>
        </TouchableOpacity>
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
    paddingTop: spacing.xxl,
    paddingBottom: 60,
  },
  assistNotice: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: colors.accentBlueSoft,
    borderRadius: radius.sm,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  assistIcon: {
    color: colors.accentBlue,
    fontSize: 14,
  },
  assistText: {
    flex: 1,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  sourceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.pillGhost,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  sourceChipLabel: {
    color: colors.textTertiary,
  },
  sourceChipValue: {
    color: colors.textPrimary,
  },
  confidenceHigh: {
    color: colors.accentLime,
  },
  confidenceMedium: {
    color: colors.accentCyan,
  },
  verdict: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.accentBlue,
    padding: spacing.xxl,
    marginBottom: spacing.xxxl,
  },
  verdictTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  verdictScoreWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  verdictScore: {
    color: colors.accentBlue,
    fontSize: 40,
    fontWeight: '700',
  },
  verdictScoreSuffix: {
    color: colors.textTertiary,
    fontSize: 13,
    marginLeft: 2,
    marginBottom: 6,
  },
  verdictMarkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  markGlyph: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: colors.accentLime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markGlyphText: {
    color: colors.accentLime,
    fontSize: 11,
  },
  verdictMarkText: {
    color: colors.accentLime,
  },
  overallLabel: {
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  overallText: {
    color: colors.textPrimary,
    lineHeight: 21,
  },
  breakdownTitle: {
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  breakdown: {
    gap: spacing.lg,
    marginBottom: spacing.xxl,
  },
  metricRow: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.lg,
  },
  metricRowEstimated: {
    borderStyle: 'dashed',
    borderColor: colors.textTertiary,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabelRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  metricLabel: {
    color: colors.textPrimary,
  },
  estimatedTag: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.textTertiary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 1,
  },
  estimatedTagText: {
    color: colors.textTertiary,
    fontSize: 10,
    fontWeight: '600',
  },
  metricScore: {
    fontSize: 16,
  },
  metricComment: {
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  metricBarTrack: {
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.pillGhost,
    overflow: 'hidden',
    marginTop: spacing.md,
  },
  metricBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  gaitNote: {
    color: colors.textTertiary,
    marginBottom: spacing.md,
  },
  disclaimer: {
    color: colors.textTertiary,
    marginBottom: spacing.xxl,
  },
  retryButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.pillGhost,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryLabel: {
    color: colors.textPrimary,
  },
});

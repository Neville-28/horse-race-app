import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NaviMode, NaviToggle } from '../components/NaviToggle';
import { RaceHeroCard } from '../components/RaceHeroCard';
import { VenueServicesSection } from '../components/VenueServicesSection';
import { useTrack } from '../context/TrackContext';
import { useLocale } from '../i18n/LocaleContext';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { TrackSelectScreen } from './TrackSelectScreen';

export function SummaryScreen({ pulseKey = 0 }: { pulseKey?: number }) {
  const { t } = useLocale();
  const { track, setTrack } = useTrack();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [navi, setNavi] = useState<NaviMode>('race');
  const pulseOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (pulseKey === 0) return;
    pulseOpacity.setValue(0);
    Animated.sequence([
      Animated.timing(pulseOpacity, { toValue: 1, duration: 150, useNativeDriver: true }),
      Animated.delay(500),
      Animated.timing(pulseOpacity, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, [pulseKey, pulseOpacity]);

  const HORSES = [
    { id: 'goldShip', name: t.summary.horses.goldShip, emoji: '🐎' },
    { id: 'tokaiTeio', name: t.summary.horses.tokaiTeio, emoji: '🐎' },
    { id: 'specialWeek', name: t.summary.horses.specialWeek, emoji: '🐎' },
  ];

  const VIEWED_RACES = [
    { id: 'tenno', name: t.summary.viewedRaces.tenno },
    { id: 'satsuki', name: t.summary.viewedRaces.satsuki },
    { id: 'arima', name: t.summary.viewedRaces.arima },
  ];

  if (pickerOpen) {
    return (
      <TrackSelectScreen
        onClose={() => setPickerOpen(false)}
        onSelect={(selected) => {
          setTrack(selected);
          setPickerOpen(false);
        }}
      />
    );
  }

  const favorites = (
    <>
      <View style={styles.sectionHeaderRow}>
        <Text style={[typography.sectionTitle, styles.sectionTitle, { marginBottom: 0 }]}>
          {t.summary.favoritesSection}
        </Text>
        <TouchableOpacity>
          <Text style={[typography.link, { color: colors.accentBlue }]}>{t.summary.favoritesLink}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.horseRow}>
        {HORSES.map((horse) => (
          <View key={horse.id} style={styles.horseCard}>
            <Text style={styles.horseEmoji}>{horse.emoji}</Text>
            <Text style={[typography.horseName, styles.horseName]}>{horse.name}</Text>
          </View>
        ))}
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {!track && (
          <View style={styles.trackCardWrap}>
            <TouchableOpacity
              style={styles.trackCard}
              onPress={() => setPickerOpen(true)}
              activeOpacity={0.8}
            >
              <View style={styles.trackIcon}>
                <Text style={styles.trackIconGlyph}>📍</Text>
              </View>
              <View style={styles.trackCardText}>
                <Text style={[typography.buttonLabel, styles.trackCardTitle]} numberOfLines={1}>
                  {t.summary.selectTrackPrompt}
                </Text>
                <Text style={[typography.cardSubtitle, styles.trackCardSubtitle]} numberOfLines={1}>
                  {t.summary.selectTrackSubtitle}
                </Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
            <Animated.View
              pointerEvents="none"
              style={[styles.trackCardPulse, { opacity: pulseOpacity }]}
            />
          </View>
        )}

        {track && <NaviToggle mode={navi} onChange={setNavi} />}

        <View style={styles.headerRow}>
          <Text style={[typography.largeTitle, styles.title]}>{t.summary.title}</Text>
          {track && (
            <TouchableOpacity style={styles.trackPill} onPress={() => setPickerOpen(true)} activeOpacity={0.8}>
              <Text style={styles.trackPillIcon}>📍</Text>
              <Text style={[typography.link, styles.trackPillLabel]} numberOfLines={1}>
                {track.name}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {!track && (
          <>
            <View style={styles.overviewCard}>
              <Text style={[typography.cardLabel, styles.overviewLabel]}>{t.summary.overviewLabel}</Text>
              <Text style={[typography.largeTitle, styles.overviewValue]}>{t.summary.overviewValue}</Text>
              <Text style={[typography.link, styles.overviewLink]}>{t.summary.overviewLink}</Text>
            </View>

            <Text style={[typography.sectionTitle, styles.sectionTitle]}>{t.summary.historySection}</Text>
            <View style={styles.statsCard}>
              <Stat label={t.summary.winRateBet} value="62%" color={colors.accentCyan} />
              <Stat label={t.summary.winRateAi} value="74%" color={colors.accentLime} />
              <Stat label={t.summary.historyCount} value="128" color={colors.textPrimary} />
            </View>

            {favorites}

            <Text style={[typography.sectionTitle, styles.sectionTitle]}>
              {t.summary.viewingHistorySection}
            </Text>
            <View style={styles.horseRow}>
              {VIEWED_RACES.map((race) => (
                <View key={race.id} style={styles.horseCard}>
                  <Text style={styles.horseEmoji}>🏆</Text>
                  <Text style={[typography.horseName, styles.horseName]}>{race.name}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {track && navi === 'race' && (
          <>
            <RaceHeroCard horseName={t.summary.horses.goldShip} odds="1:58.3" />
            {favorites}
            <View style={styles.menuList}>
              <TouchableOpacity style={styles.menuRow} activeOpacity={0.8}>
                <Text style={[typography.sectionTitle, styles.menuRowLabel]}>{t.summary.historyManage}</Text>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuRow} activeOpacity={0.8}>
                <Text style={[typography.sectionTitle, styles.menuRowLabel]}>{t.summary.venueEvent}</Text>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {track && navi === 'facility' && <VenueServicesSection />}
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={styles.stat}>
      <Text style={[typography.statLabel, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[typography.statValue, { color }]}>{value}</Text>
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
    paddingTop: spacing.xl,
    paddingBottom: 120,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  title: {
    color: colors.textPrimary,
  },
  trackPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    height: 32,
    maxWidth: 170,
    paddingHorizontal: spacing.lg,
    borderRadius: 16,
    backgroundColor: colors.pillGhost,
  },
  trackPillIcon: {
    fontSize: 11,
  },
  trackPillLabel: {
    color: colors.textPrimary,
    flexShrink: 1,
  },
  trackCardWrap: {
    position: 'relative',
  },
  trackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  trackCardPulse: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: radius.md + 4,
    borderWidth: 2,
    borderColor: colors.accentBlue,
  },
  trackIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.recordRedSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackIconGlyph: {
    fontSize: 14,
  },
  trackCardText: {
    flex: 1,
    gap: 2,
  },
  trackCardTitle: {
    color: colors.textPrimary,
  },
  trackCardSubtitle: {
    color: colors.textSecondary,
  },
  chevron: {
    color: colors.textTertiary,
    fontSize: 20,
    fontWeight: '700',
  },
  overviewCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: spacing.xxl,
    marginBottom: spacing.xxxl,
  },
  overviewLabel: {
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  overviewValue: {
    color: colors.textPrimary,
    marginBottom: spacing.xl,
  },
  overviewLink: {
    color: colors.accentBlue,
  },
  sectionTitle: {
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xxl,
    marginBottom: spacing.xxxl,
  },
  stat: {
    gap: spacing.sm,
  },
  horseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xxxl,
  },
  horseCard: {
    width: 104,
    height: 96,
    backgroundColor: colors.card,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  horseEmoji: {
    fontSize: 30,
  },
  horseName: {
    color: colors.textPrimary,
  },
  menuList: {
    gap: spacing.md,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 65,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  menuRowLabel: {
    color: colors.textPrimary,
    marginBottom: 0,
  },
});

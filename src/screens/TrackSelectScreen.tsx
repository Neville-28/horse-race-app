import React, { useState } from 'react';
import {
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '../components/ScreenHeader';
import { JRA_TICKET_URL } from '../constants/media';
import { Track } from '../context/TrackContext';
import { TRACKS } from '../data/tracks';
import { useLocale } from '../i18n/LocaleContext';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export function TrackSelectScreen({
  onClose,
  onSelect,
}: {
  onClose?: () => void;
  onSelect?: (track: Track) => void;
}) {
  const { t } = useLocale();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filteredTracks = TRACKS.filter((track) => track.name.includes(query.trim()));

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <ScreenHeader title={t.trackSelect.title} onBack={onClose} glyph="✕" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity activeOpacity={0.85} onPress={() => Linking.openURL(JRA_TICKET_URL)}>
          <ImageBackground
            source={require('../../assets/images/track-banner.png')}
            style={styles.banner}
            imageStyle={styles.bannerImage}
          >
            <View style={styles.bannerScrim}>
              <View style={styles.featuredBadge}>
                <Text style={[typography.pillLabel, styles.featuredBadgeText]}>
                  {t.trackSelect.featuredBadge}
                </Text>
              </View>
              <Text style={[typography.sectionTitle, styles.featuredTitle]}>天皇賞（秋）第80回</Text>
              <Text style={[typography.stepSubtitle, styles.featuredVenue]}>
                {t.trackSelect.featuredVenue}
              </Text>
            </View>
            <View style={styles.claimBadge}>
              <Text style={[typography.pillLabel, styles.claimBadgeText]}>
                {t.trackSelect.claimBadge}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <View style={styles.listHeaderRow}>
          <Text style={[typography.sectionTitle, styles.listTitle]}>{t.trackSelect.listTitle}</Text>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => setSearchOpen((open) => !open)}
            activeOpacity={0.7}
          >
            <Text style={styles.searchGlyph}>🔍</Text>
          </TouchableOpacity>
        </View>

        {searchOpen && (
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={t.trackSelect.searchPlaceholder}
            placeholderTextColor={colors.textTertiary}
            style={styles.searchInput}
            autoFocus
          />
        )}

        {filteredTracks.map((track) => (
          <TouchableOpacity
            key={track.id}
            style={styles.row}
            activeOpacity={0.8}
            onPress={() => onSelect?.(track)}
          >
            <Text style={[typography.buttonLabel, styles.rowLabel]}>{track.name}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
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
    paddingTop: spacing.xl,
    paddingBottom: 60,
  },
  banner: {
    height: 168,
    borderRadius: radius.lg,
    marginBottom: spacing.xxxl,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  bannerImage: {
    borderRadius: radius.lg,
  },
  bannerScrim: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: spacing.xxl,
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    height: 22,
    paddingHorizontal: spacing.md,
    borderRadius: 11,
    backgroundColor: colors.accentLime,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  featuredBadgeText: {
    color: colors.background,
  },
  featuredTitle: {
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  featuredVenue: {
    color: colors.textPrimary,
  },
  claimBadge: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    height: 22,
    paddingHorizontal: spacing.md,
    borderRadius: 11,
    backgroundColor: colors.accentLime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  claimBadgeText: {
    color: colors.background,
  },
  listHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  listTitle: {
    color: colors.textPrimary,
    marginBottom: 0,
  },
  searchButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.pillGhost,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchGlyph: {
    fontSize: 14,
  },
  searchInput: {
    height: 44,
    borderRadius: radius.sm,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingHorizontal: spacing.lg,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.card,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: spacing.md,
  },
  rowLabel: {
    color: colors.textPrimary,
  },
  chevron: {
    color: colors.textTertiary,
    fontSize: 18,
    fontWeight: '700',
  },
});

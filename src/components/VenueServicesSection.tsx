import React from 'react';
import { ImageBackground, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { JRA_TICKET_URL, RACE_BANNER_IMAGE_URL } from '../constants/media';
import { useLocale } from '../i18n/LocaleContext';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export function VenueServicesSection({ onGuidePress }: { onGuidePress?: () => void } = {}) {
  const { t } = useLocale();

  const SERVICES = [
    { id: 'guide', icon: '🧭', title: t.more.guideTitle, subtitle: t.more.guideSubtitle, onPress: onGuidePress },
    { id: 'fireworks', icon: '🎆', title: t.more.fireworksTitle, subtitle: t.more.fireworksSubtitle },
    { id: 'museum', icon: '🏛️', title: t.more.museumTitle, subtitle: t.more.museumSubtitle },
    { id: 'firstaid', icon: '🩺', title: t.more.firstAidTitle, subtitle: t.more.firstAidSubtitle },
    { id: 'ticket-support', icon: '☎️', title: t.more.ticketSupportTitle, subtitle: t.more.ticketSupportSubtitle },
    { id: 'venue-guide', icon: '☎️', title: t.more.venueGuideTitle, subtitle: t.more.venueGuideSubtitle },
  ];

  return (
    <View>
      <ImageBackground
        source={{ uri: RACE_BANNER_IMAGE_URL }}
        style={styles.banner}
        imageStyle={styles.bannerImage}
      >
        <View style={styles.bannerOverlay}>
          <Text style={[typography.cardTitle, styles.bannerCaption]}>{t.more.bannerCaption}</Text>
        </View>
      </ImageBackground>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary]}
          activeOpacity={0.8}
          onPress={() => Linking.openURL(JRA_TICKET_URL)}
        >
          <Text style={[typography.buttonLabel, styles.buttonPrimaryLabel]}>{t.more.ticket}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonGhost]} activeOpacity={0.8}>
          <Text style={[typography.buttonLabel, styles.buttonGhostLabel]}>{t.more.race}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {SERVICES.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.serviceCard}
            activeOpacity={service.onPress ? 0.8 : 1}
            disabled={!service.onPress}
            onPress={service.onPress}
          >
            <Text style={typography.cardIcon}>{service.icon}</Text>
            <Text style={[typography.cardTitle, styles.serviceTitle]}>{service.title}</Text>
            <Text style={[typography.cardSubtitle, styles.serviceSubtitle]}>{service.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 140,
    borderRadius: radius.lg,
    backgroundColor: colors.bannerTint,
    marginBottom: spacing.xxl,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  bannerImage: {
    borderRadius: radius.lg,
  },
  bannerOverlay: {
    backgroundColor: 'rgba(11,15,12,0.55)',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  bannerCaption: {
    color: colors.textPrimary,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.xxl,
    marginBottom: spacing.xxxl,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: colors.accentBlue,
  },
  buttonPrimaryLabel: {
    color: colors.textPrimary,
  },
  buttonGhost: {
    backgroundColor: colors.pillGhost,
  },
  buttonGhostLabel: {
    color: colors.textPrimary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.md + 2,
  },
  serviceCard: {
    width: 163,
    height: 112,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    justifyContent: 'center',
    paddingLeft: spacing.xl,
    gap: spacing.sm,
  },
  serviceTitle: {
    color: colors.textPrimary,
  },
  serviceSubtitle: {
    color: colors.textSecondary,
  },
});

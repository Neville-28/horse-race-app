import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VenueServicesSection } from '../components/VenueServicesSection';
import { Locale, useLocale } from '../i18n/LocaleContext';
import { SeatFlow } from './seat/SeatFlow';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export function MoreScreen() {
  const { t, locale, setLocale } = useLocale();
  const [guideOpen, setGuideOpen] = useState(false);

  if (guideOpen) {
    return <SeatFlow onClose={() => setGuideOpen(false)} />;
  }

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Text style={[typography.largeTitle, styles.title]}>{t.more.title}</Text>
          <LanguageToggle locale={locale} onChange={setLocale} />
        </View>

        <VenueServicesSection onGuidePress={() => setGuideOpen(true)} />
      </ScrollView>
    </SafeAreaView>
  );
}

function LanguageToggle({
  locale,
  onChange,
}: {
  locale: Locale;
  onChange: (locale: Locale) => void;
}) {
  return (
    <View style={styles.langToggle}>
      {(['ja', 'zh'] as Locale[]).map((code) => {
        const active = code === locale;
        return (
          <TouchableOpacity
            key={code}
            style={[styles.langOption, active && styles.langOptionActive]}
            onPress={() => onChange(code)}
            activeOpacity={0.7}
          >
            <Text style={[typography.link, { color: active ? colors.background : colors.textPrimary }]}>
              {code === 'ja' ? '日本語' : '中文'}
            </Text>
          </TouchableOpacity>
        );
      })}
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
    marginBottom: spacing.xxl,
  },
  title: {
    color: colors.textPrimary,
  },
  langToggle: {
    flexDirection: 'row',
    backgroundColor: colors.badgeGray,
    borderRadius: 12,
    padding: 2,
  },
  langOption: {
    height: 22,
    paddingHorizontal: spacing.md,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  langOptionActive: {
    backgroundColor: colors.textPrimary,
  },
});

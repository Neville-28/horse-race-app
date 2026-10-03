import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocale } from '../i18n/LocaleContext';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export type NaviMode = 'race' | 'facility';

export function NaviToggle({
  mode,
  onChange,
}: {
  mode: NaviMode;
  onChange: (mode: NaviMode) => void;
}) {
  const { t } = useLocale();

  return (
    <View style={styles.wrap}>
      <Text style={[typography.cardSubtitle, styles.label]}>{t.summary.hero.naviLabel}</Text>
      {/* Dynamic-Island-style capsule: one black pill, active segment floats inside it */}
      <View style={styles.island}>
        <Option
          label={t.summary.hero.naviRace}
          color={colors.accentLime}
          active={mode === 'race'}
          onPress={() => onChange('race')}
        />
        <Option
          label={t.summary.hero.naviFacility}
          color={colors.accentBlue}
          active={mode === 'facility'}
          onPress={() => onChange('facility')}
        />
      </View>
    </View>
  );
}

function Option({
  label,
  color,
  active,
  onPress,
}: {
  label: string;
  color: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.option, active && { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[typography.buttonLabel, { color: active ? colors.background : colors.textPrimary }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.xl,
  },
  label: {
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  island: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    borderRadius: 999,
    padding: 4,
    gap: 4,
  },
  option: {
    flex: 1,
    height: 42,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocale } from '../i18n/LocaleContext';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export function PlaceholderScreen({ label }: { label: string }) {
  const { t } = useLocale();
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.center}>
        <Text style={[typography.sectionTitle, { color: colors.textSecondary }]}>
          {label} {t.placeholder.suffix}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

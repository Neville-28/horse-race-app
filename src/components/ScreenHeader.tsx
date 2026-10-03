import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export function ScreenHeader({
  title,
  onBack,
  glyph = '‹',
}: {
  title: string;
  onBack?: () => void;
  glyph?: string;
}) {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
        <Text style={styles.backGlyph}>{glyph}</Text>
      </TouchableOpacity>
      <Text style={[typography.navTitle, styles.title]} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.backButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.circleButton,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backGlyph: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.textPrimary,
  },
});

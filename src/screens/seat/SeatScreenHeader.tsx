import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export function SeatScreenHeader({ title, onBack }: { title: string; onBack?: () => void }) {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
        <Text style={styles.backGlyph}>‹</Text>
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.lg,
  },
  backButton: {
    width: 40,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backGlyph: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  title: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '700',
  },
});

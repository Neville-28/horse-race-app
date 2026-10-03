import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocale } from '../i18n/LocaleContext';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type Tab = { key: 'summary' | 'ai' | 'bet' | 'more'; icon: string };

const TABS: Tab[] = [
  { key: 'summary', icon: '▤' },
  { key: 'ai', icon: '◎' },
  { key: 'bet', icon: '￥' },
  { key: 'more', icon: '⋯' },
];

export function BottomTabBar({
  activeKey = 'summary',
  onSelect,
  disabledKeys = [],
  onDisabledPress,
}: {
  activeKey?: string;
  onSelect?: (key: string) => void;
  disabledKeys?: string[];
  onDisabledPress?: (key: string) => void;
}) {
  const { t } = useLocale();
  return (
    <View style={styles.wrapper}>
      <View style={styles.bar}>
        {TABS.map((tab) => {
          const active = tab.key === activeKey;
          const disabled = disabledKeys.includes(tab.key);
          const color = disabled ? colors.textTertiary : active ? colors.textPrimary : colors.textTertiary;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, disabled && styles.tabDisabled]}
              onPress={() => (disabled ? onDisabledPress?.(tab.key) : onSelect?.(tab.key))}
              activeOpacity={0.7}
            >
              <Text style={[typography.tabIcon, { color }]}>{tab.icon}</Text>
              <Text style={[typography.tabLabel, { color }]}>{t.tabs[tab.key]}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: spacing.xxxl - 4,
    right: spacing.xxxl - 4,
    bottom: spacing.xxl,
  },
  bar: {
    flexDirection: 'row',
    height: 64,
    borderRadius: radius.pill,
    backgroundColor: colors.tabBarBackground,
    borderWidth: 1,
    borderColor: colors.tabBarBorder,
    ...Platform.select({
      ios: {
        shadowColor: colors.tabBarShadow,
        shadowOpacity: 1,
        shadowRadius: 24,
        shadowOffset: { width: 0, height: 8 },
      },
      android: { elevation: 12 },
    }),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  tabDisabled: {
    opacity: 0.4,
  },
});

import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export function Toast({ message, visible }: { message: string; visible: boolean }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [visible, opacity]);

  return (
    <Animated.View style={[styles.wrapper, { opacity }]} pointerEvents="none">
      <Text style={[typography.buttonLabel, styles.text]}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: spacing.xxxl,
    right: spacing.xxxl,
    bottom: 104,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  text: {
    color: colors.textPrimary,
  },
});

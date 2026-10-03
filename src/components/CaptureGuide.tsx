import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Ellipse, Path, Polygon } from 'react-native-svg';
import { colors } from '../theme/colors';

// Font Awesome Free "horse" icon (CC BY 4.0) — https://fontawesome.com/icons/horse
const HORSE_SIDE_PATH =
  'M448 238.1l0-78.1 16 0 9.8 19.6c12.5 25.1 42.2 36.4 68.3 26c20.5-8.2 33.9-28 33.9-50.1L576 80c0-19.1-8.4-36.3-21.7-48l5.7 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L480 0 448 0C377.3 0 320 57.3 320 128l-96 0-20.8 0-54.4 0c-30.7 0-57.6 16.3-72.5 40.8C33.2 174.5 0 211.4 0 256l0 56c0 13.3 10.7 24 24 24s24-10.7 24-24l0-56c0-13.4 6.6-25.2 16.7-32.5c1.6 13 6.3 25.4 13.6 36.4l28.2 42.4c8.3 12.4 6.4 28.7-1.2 41.6c-16.5 28-20.6 62.2-10 93.9l17.5 52.4c4.4 13.1 16.6 21.9 30.4 21.9l33.7 0c21.8 0 37.3-21.4 30.4-42.1l-20.8-62.5c-2.1-6.4-.5-13.4 4.3-18.2l12.7-12.7c13.2-13.2 20.6-31.1 20.6-49.7c0-2.3-.1-4.6-.3-6.9l84 24c4.1 1.2 8.2 2.1 12.3 2.8L320 480c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-164.3c19.2-19.2 31.5-45.7 32-75.7c0 0 0 0 0 0l0-1.9zM496 64a16 16 0 1 1 0 32 16 16 0 1 1 0-32z';

export function CaptureGuide({ angle }: { angle: 'front' | 'side' }) {
  return (
    <View style={styles.wrap} pointerEvents="none">
      {angle === 'side' ? (
        <Svg width={200} height={177} viewBox="0 0 576 512">
          <Path d={HORSE_SIDE_PATH} fill={colors.textPrimary} opacity={0.28} />
        </Svg>
      ) : (
        <Svg width={140} height={200} viewBox="0 0 140 200">
          {/* Chest / body */}
          <Ellipse cx={70} cy={150} rx={48} ry={44} fill={colors.textPrimary} opacity={0.28} />
          {/* Neck */}
          <Path d="M45 120 L50 60 Q70 45 90 60 L95 120 Z" fill={colors.textPrimary} opacity={0.28} />
          {/* Head */}
          <Ellipse cx={70} cy={45} rx={26} ry={32} fill={colors.textPrimary} opacity={0.28} />
          {/* Ears */}
          <Polygon points="48,25 54,4 62,24" fill={colors.textPrimary} opacity={0.28} />
          <Polygon points="92,25 86,4 78,24" fill={colors.textPrimary} opacity={0.28} />
          {/* Eyes */}
          <Circle cx={58} cy={42} r={3} fill={colors.captureBox} />
          <Circle cx={82} cy={42} r={3} fill={colors.captureBox} />
        </Svg>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

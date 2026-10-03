import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomTabBar } from './src/components/BottomTabBar';
import { Toast } from './src/components/Toast';
import { TrackProvider, useTrack } from './src/context/TrackContext';
import { LocaleProvider, useLocale } from './src/i18n/LocaleContext';
import { AiScanFlow } from './src/screens/ai/AiScanFlow';
import { SummaryScreen } from './src/screens/SummaryScreen';
import { MoreScreen } from './src/screens/MoreScreen';
import { PlaceholderScreen } from './src/screens/PlaceholderScreen';
import { colors } from './src/theme/colors';

export default function App() {
  return (
    <LocaleProvider>
      <TrackProvider>
        <SafeAreaProvider>
          <AppContent />
          <StatusBar style="light" />
        </SafeAreaProvider>
      </TrackProvider>
    </LocaleProvider>
  );
}

const TRACK_GATED_TABS = ['ai', 'bet'];

function AppContent() {
  const { t } = useLocale();
  const { track } = useTrack();
  const [activeTab, setActiveTab] = useState('summary');
  const [toastVisible, setToastVisible] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const disabledKeys = track ? [] : TRACK_GATED_TABS;
  const effectiveTab = disabledKeys.includes(activeTab) ? 'summary' : activeTab;

  const handleDisabledPress = () => {
    setActiveTab('summary');
    setPulseKey((k) => k + 1);
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2200);
  };

  const screens: Record<string, React.ReactElement> = {
    summary: <SummaryScreen pulseKey={pulseKey} />,
    ai: <AiScanFlow />,
    bet: <PlaceholderScreen label={t.tabs.bet} />,
    more: <MoreScreen />,
  };

  return (
    <View style={styles.root}>
      {screens[effectiveTab]}
      <Toast message={t.summary.selectTrackToast} visible={toastVisible} />
      <BottomTabBar
        activeKey={effectiveTab}
        onSelect={setActiveTab}
        disabledKeys={disabledKeys}
        onDisabledPress={handleDisabledPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

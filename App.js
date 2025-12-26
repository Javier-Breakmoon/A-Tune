import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ScreenOrientation from "expo-screen-orientation";

import { PlayerProvider } from "./PlayerContext";
import StationsScreen from "./screens/StationsScreen";
import MiniPlayer from "./components/MiniPlayer";
import AdBanner from "./components/AdBanner";

export default function App() {
  // 🔒 Bloquear orientación en vertical
  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );

    // (opcional) al desmontar, liberar el lock
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <PlayerProvider>
          <StationsScreen />

          {/* Mini player fijo */}
          <MiniPlayer />

          {/* Publicidad fija abajo */}
          <AdBanner />
        </PlayerProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
});

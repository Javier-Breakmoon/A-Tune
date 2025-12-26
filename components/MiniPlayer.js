import React, { useContext, useRef, useEffect, useState } from "react";
import WaveBars from "./WaveBars";
import * as Haptics from "expo-haptics";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Modal,
} from "react-native";
import { PlayerContext } from "../PlayerContext";
import { LOGOS } from "../assets/logos";

export default function MiniPlayer() {
  const { currentStation, status, togglePlayPause } = useContext(PlayerContext);

  // ✅ Hooks SIEMPRE arriba (nunca después de returns condicionales)
  const scale = useRef(new Animated.Value(1)).current;
  const [expanded, setExpanded] = useState(false);

  // Calculamos esto sin hooks (y soporta currentStation null)
  const localLogo =
    currentStation?.logoKey ? LOGOS[currentStation.logoKey] : null;

  const stationName = currentStation?.name || "";
  const initial = (stationName.trim()[0] || "R").toUpperCase();

  useEffect(() => {
    Animated.spring(scale, {
      toValue: status === "playing" ? 1.1 : 1,
      useNativeDriver: true,
    }).start();
  }, [status, scale]);

  // ✅ Return condicional DESPUÉS de hooks
  if (!currentStation) return null;

  const statusText = {
    loading: "Cargando...",
    playing: "🔴 En directo",
    paused: "Pausado",
    error: "Reconectando...",
  };

  const onOpen = () => {
    Haptics.selectionAsync().catch(() => {});
    setExpanded(true);
  };

  return (
    <>
      {/* MINI PLAYER */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onOpen}
        style={styles.wrapper}
      >
        <View style={styles.container}>
          {/* Logo / Fallback */}
          <View style={styles.logoWrap}>
            {localLogo ? (
              <Image
                source={localLogo}
                style={styles.logo}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.fallbackLogo}>
                <Text style={styles.fallbackText}>{initial}</Text>
              </View>
            )}
          </View>

          {/* Info de emisora */}
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1}>
              {currentStation.name}
            </Text>
            <Text style={styles.status}>{statusText[status]}</Text>
          </View>

          {/* Ondas animadas */}
          {status === "playing" && <WaveBars />}

          {/* Botón Play / Pause */}
          <Animated.View style={{ transform: [{ scale }] }}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={(e) => {
                e.stopPropagation?.();
                togglePlayPause();
              }}
              activeOpacity={0.9}
            >
              <Text style={styles.playIcon}>
                {status === "playing" ? "⏸" : "▶"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </TouchableOpacity>

      {/* EXPANDED PLAYER */}
      <Modal visible={expanded} animationType="slide">
        <View style={styles.expanded}>
          <View style={styles.bigLogoWrap}>
            {localLogo ? (
              <Image
                source={localLogo}
                style={styles.bigLogo}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.bigFallback}>
                <Text style={styles.bigFallbackText}>{initial}</Text>
              </View>
            )}
          </View>

          <Text style={styles.bigName}>{currentStation.name}</Text>
          <Text style={styles.status}>{statusText[status]}</Text>

          {status === "playing" && <WaveBars />}

          <TouchableOpacity
            style={styles.bigPlay}
            onPress={togglePlayPause}
            activeOpacity={0.9}
          >
            <Text style={styles.bigIcon}>
              {status === "playing" ? "⏸" : "▶"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setExpanded(false)}
            activeOpacity={0.9}
          >
            <Text style={styles.close}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 80, // encima del banner de publicidad
    left: 0,
    right: 0,
    padding: 10,
  },
  container: {
    height: 72,
    backgroundColor: "#1c1c1c",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    elevation: 8,
  },

  logoWrap: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginRight: 12,
    overflow: "hidden",
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 44,
    height: 44,
  },
  fallbackLogo: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2A2A2A",
  },
  fallbackText: { color: "#fff", fontWeight: "800", fontSize: 16 },

  info: { flex: 1 },
  name: { color: "#fff", fontSize: 16, fontWeight: "600" },
  status: { color: "#e53935", fontSize: 12, marginTop: 2 },

  playButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#e53935",
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  expanded: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  bigLogoWrap: {
    width: 150,
    height: 150,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  bigLogo: {
    width: 150,
    height: 150,
  },
  bigFallback: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2A2A2A",
  },
  bigFallbackText: { color: "#fff", fontWeight: "900", fontSize: 48 },

  bigName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  bigPlay: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e53935",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  bigIcon: { color: "#fff", fontSize: 36, fontWeight: "bold" },

  close: { color: "#fff", fontSize: 16, marginTop: 10 },
});

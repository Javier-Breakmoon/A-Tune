import React, { useMemo, useState } from "react";
import { Pressable as GHPressable } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";


import { LOGOS } from "../assets/logos";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function StationCard({
  station,
  isCurrent,
  isFavorite,
  onPress,        // reproducir
  onOpenOptions,  // sheet
  onDrag,         // drag()
}) {
  const [logoOk, setLogoOk] = useState(true);

  const initial = useMemo(() => {
    const t = (station?.name || "").trim();
    return t ? t[0].toUpperCase() : "R";
  }, [station?.name]);

  const localLogo = station.logoKey ? LOGOS[station.logoKey] : null;


  return (
    <View style={styles.row}>
      {/* Drag handle (izquierda del logo) */}
      <Pressable
        onLongPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
          onDrag?.();
        }}
        delayLongPress={250}
        hitSlop={{ top: 18, bottom: 18, left: 18, right: 18 }}
        style={styles.dragIcon}
      >
        <MaterialCommunityIcons name="menu" size={20} color="#8E8E8E" />
      </Pressable>



      {/* Zona clicable para reproducir (logo + textos) */}
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.mainPress, pressed && styles.pressed]}
      >
        {/* Logo / Fallback */}
        <View style={styles.left}>
          {localLogo && logoOk ? (
          <Image
            source={localLogo}
            style={styles.logo}
            resizeMode="contain"
            onError={() => setLogoOk(false)}
          />
          ) : (
            <View style={styles.fallbackLogo}>
              <Text style={styles.fallbackText}>{initial}</Text>
            </View>
          )}
        </View>

        {/* Textos */}
        <View style={styles.middle}>
          <View style={styles.titleRow}>
            {isFavorite && (
              <MaterialCommunityIcons
                name="star"
                size={16}
                color="#FFD54A"
                style={{ marginRight: 6 }}
              />
            )}

            <Text numberOfLines={1} style={styles.title}>
              {station.name}
            </Text>

            {isCurrent && (
              <View style={styles.livePill}>
                <Text style={styles.liveText}>EN DIRECTO</Text>
              </View>
            )}
          </View>

          {!!station.info && (
            <Text numberOfLines={1} style={styles.subtitle}>
              {station.info}
            </Text>
          )}
        </View>
      </Pressable>

      {/* Kebab (derecha) */}
      <Pressable
        onPress={() => onOpenOptions?.(station)}
        hitSlop={12}
        style={styles.kebabBtn}
      >
        <MaterialCommunityIcons name="dots-vertical" size={20} color="#BDBDBD" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1C",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  dragIcon: {
    width: 36,
    height: 48,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  mainPress: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  pressed: { opacity: 0.9 },

  left: { width: 48, marginRight: 12 },
  logo: { width: 48, height: 48, borderRadius: 10, backgroundColor: "#111" },
  fallbackLogo: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#2A2A2A",
    alignItems: "center",
    justifyContent: "center",
  },
  fallbackText: { color: "#fff", fontWeight: "700", fontSize: 18 },

  middle: { flex: 1 },
  titleRow: { flexDirection: "row", alignItems: "center" },
  title: { color: "#fff", fontSize: 16, fontWeight: "700", flexShrink: 1 },
  subtitle: { color: "#A7A7A7", marginTop: 4, fontSize: 12 },

  livePill: {
    marginLeft: 8,
    backgroundColor: "rgba(0, 200, 0, 0.18)",
    borderColor: "rgba(0, 200, 0, 0.35)",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  liveText: { color: "#2DFF57", fontSize: 10, fontWeight: "800" },

  kebabBtn: {
    marginLeft: 10,
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#151515",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
});

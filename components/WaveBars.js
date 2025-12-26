import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";

export default function WaveBars() {
  // ✅ hooks correctos: un solo useRef con un array fijo
  const bars = useRef(
    Array.from({ length: 10 }, () => new Animated.Value(10))
  ).current;

  useEffect(() => {
    const animations = bars.map((bar, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(bar, {
            toValue: Math.random() * 20 + 10,
            duration: 300 + i * 100,
            useNativeDriver: false,
          }),
          Animated.timing(bar, {
            toValue: 10,
            duration: 300,
            useNativeDriver: false,
          }),
        ])
      )
    );

    animations.forEach((a) => a.start());

    return () => {
      // ✅ limpiar
      animations.forEach((a) => a.stop());
    };
  }, [bars]);

  return (
    <View style={styles.container}>
      {bars.map((bar, i) => (
        <Animated.View key={i} style={[styles.bar, { height: bar }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 52,
    height: 26,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginRight: 12,
  },
  bar: {
    width: 4,
    backgroundColor: "#e53935",
    borderRadius: 2,
  },
});

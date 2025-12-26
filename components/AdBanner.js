import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AdBanner() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>PUBLICIDAD</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "#aaa", fontSize: 12 },
});

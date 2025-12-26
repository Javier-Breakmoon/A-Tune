import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function StationOptionsSheet({
  visible,
  station,
  isFavorite,
  onClose,
  onToggleFavorite,
}) {
  if (!station) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.sheet}>
        <Text style={styles.title} numberOfLines={1}>
          {station.name}
        </Text>

        <Pressable
          onPress={() => {
            onToggleFavorite(station);
            onClose();
          }}
          style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
        >
          <MaterialCommunityIcons
            name={isFavorite ? "star-off-outline" : "star-outline"}
            size={20}
            color="#fff"
          />
          <Text style={styles.itemText}>
            {isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
          </Text>
        </Pressable>

        <Pressable
          onPress={onClose}
          style={({ pressed }) => [styles.cancel, pressed && styles.itemPressed]}
        >
          <Text style={styles.cancelText}>Cancelar</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  sheet: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2E2E2E",
    padding: 12,
  },
  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#2A2A2A",
    borderWidth: 1,
    borderColor: "#3A3A3A",
  },
  itemPressed: { opacity: 0.9 },
  itemText: { color: "#fff", fontSize: 14, fontWeight: "600" },
  cancel: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#151515",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  cancelText: { color: "#BDBDBD", fontSize: 14, fontWeight: "700" },
});

import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  Platform,
  UIManager,
  LayoutAnimation,
  FlatList,
  Animated,
  Easing,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DraggableFlatList from "react-native-draggable-flatlist";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { STATIONS } from "../stations";
import { PlayerContext } from "../PlayerContext";
import StationCard from "../components/StationCard";
import StationOptionsSheet from "../components/StationOptionsSheet";

const STORAGE_KEYS = {
  FAVORITES: "@tunebox:favorites",
  ORDER: "@tunebox:manualOrder",
};

export default function StationsScreen() {
  const { playStation, currentStation } = useContext(PlayerContext);

  const [favoriteIds, setFavoriteIds] = useState([]);
  const [manualOrderIds, setManualOrderIds] = useState(null);

  // ✅ Array REAL para la lista (evita glitches)
  const [listData, setListData] = useState([]);

  const [sheetVisible, setSheetVisible] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);

  // 🔎 Search UI
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Animación búsqueda
  const searchAnim = useRef(new Animated.Value(0)).current;

  const saveTimerRef = useRef(null);

  // LayoutAnimation enable (lo dejamos por si lo usas en otros lados)
  useEffect(() => {
    if (
      Platform.OS === "android" &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  // Base alfabética (solo para construir orden inicial)
  const baseStationsAlpha = useMemo(() => {
    return [...STATIONS].sort((a, b) =>
      (a.name || "").localeCompare(b.name || "", "es", { sensitivity: "base" })
    );
  }, []);

  const isFavorite = (id) => favoriteIds.includes(id);

  // Load storage
  useEffect(() => {
    const load = async () => {
      try {
        const favsRaw = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
        const orderRaw = await AsyncStorage.getItem(STORAGE_KEYS.ORDER);

        const favs = favsRaw ? JSON.parse(favsRaw) : [];
        const order = orderRaw ? JSON.parse(orderRaw) : null;

        setFavoriteIds(favs);
        setManualOrderIds(order);
      } catch (e) {
        console.warn("Error loading storage", e);
      }
    };
    load();
  }, []);

  // Build listData from storage state
  useEffect(() => {
    if (!baseStationsAlpha.length) return;

    const favSet = new Set(favoriteIds);

    if (manualOrderIds && manualOrderIds.length) {
      const map = new Map(baseStationsAlpha.map((s) => [s.id, s]));
      const ordered = manualOrderIds.map((id) => map.get(id)).filter(Boolean);
      const missing = baseStationsAlpha.filter(
        (s) => !manualOrderIds.includes(s.id)
      );
      setListData([...ordered, ...missing]);
      return;
    }

    const favStations = favoriteIds
      .map((id) => baseStationsAlpha.find((s) => s.id === id))
      .filter(Boolean);

    const nonFavStations = baseStationsAlpha.filter((s) => !favSet.has(s.id));

    setListData([...favStations, ...nonFavStations]);
  }, [baseStationsAlpha, favoriteIds, manualOrderIds]);

  // Persist favorites
  const persistFavorites = (ids) => {
    AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(ids)).catch(
      () => {}
    );
  };

  // Persist order debounced
  const persistOrderDebounced = (ids) => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      AsyncStorage.setItem(STORAGE_KEYS.ORDER, JSON.stringify(ids)).catch(
        () => {}
      );
    }, 350);
  };

  // Toggle favorite
  const toggleFavorite = (station) => {
    setFavoriteIds((prevFavs) => {
      const exists = prevFavs.includes(station.id);

      // ✅ último añadido = primero
      const nextFavs = exists
        ? prevFavs.filter((id) => id !== station.id)
        : [station.id, ...prevFavs];

      // guardar favoritos
      persistFavorites(nextFavs);

      // reordenar listData: favs arriba + resto manteniendo orden actual
      setListData((current) => {
        const byId = new Map(baseStationsAlpha.map((s) => [s.id, s]));

        const favSet = new Set(nextFavs);

        const favStations = nextFavs
          .map((id) => byId.get(id))
          .filter(Boolean);

        const restStations = current.filter((s) => !favSet.has(s.id));

        const newList = [...favStations, ...restStations];

        // si llevas orden manual persistido, lo actualizamos también
        const ids = newList.map((s) => s.id);
        setManualOrderIds(ids);
        persistOrderDebounced(ids);

        return newList;
      });

      return nextFavs;
    });
  };


  // Options
  const openOptions = (station) => {
    setSelectedStation(station);
    setSheetVisible(true);
  };

  const closeOptions = () => {
    setSelectedStation(null);
    setSheetVisible(false);
  };

  // Search filtering (mantiene el orden actual de listData)
  const normalizedQuery = query.trim().toLowerCase();
  const filteredData = useMemo(() => {
    if (!normalizedQuery) return listData;
    return listData.filter((s) => {
      const haystack = `${s.name || ""} ${s.info || ""}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [listData, normalizedQuery]);

  const searching = searchOpen && normalizedQuery.length > 0;

  // Toggle search animado
  const toggleSearch = () => {
    const toValue = searchOpen ? 0 : 1;

    setSearchOpen(!searchOpen);

    Animated.timing(searchAnim, {
      toValue,
      duration: 220,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false, // height + opacity
    }).start(() => {
      if (toValue === 0) setQuery("");
    });

    if (!searchOpen) {
      setTimeout(() => inputRef.current?.focus?.(), 100);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Emisoras</Text>

        <Pressable
          onPress={toggleSearch}
          hitSlop={12}
          style={styles.headerIconBtn}
        >
          <MaterialCommunityIcons
            name={searchOpen ? "close" : "magnify"}
            size={22}
            color="#EDEDED"
          />
        </Pressable>
      </View>

      {/* Search bar animada */}
      <Animated.View
        style={[
          styles.searchWrap,
          {
            opacity: searchAnim,
            maxHeight: searchAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 44],
            }),
            transform: [
              {
                translateY: searchAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-8, 0],
                }),
              },
            ],
          },
        ]}
      >
        <MaterialCommunityIcons name="magnify" size={18} color="#9A9A9A" />

        <TextInput
          ref={inputRef}
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar emisora…"
          placeholderTextColor="#8A8A8A"
          style={styles.searchInput}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
        />

        {!!query && (
          <Pressable
            onPress={() => setQuery("")}
            hitSlop={10}
            style={styles.clearBtn}
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={18}
              color="#9A9A9A"
            />
          </Pressable>
        )}
      </Animated.View>

      {/* Lista */}
      {searching ? (
        // ✅ Cuando buscas: lista normal (sin drag)
        <FlatList
          data={filteredData}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          removeClippedSubviews={false}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <StationCard
              station={item}
              isCurrent={currentStation?.id === item.id}
              isFavorite={isFavorite(item.id)}
              onPress={() => playStation(item)}
              onOpenOptions={openOptions}
              onDrag={null}
            />
          )}
        />
      ) : (
        // ✅ Sin búsqueda: drag normal
        <DraggableFlatList
          data={filteredData}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          removeClippedSubviews={false}
          keyboardShouldPersistTaps="handled"
          onDragEnd={({ data: newData }) => {
            setListData(newData);

            const ids = newData.map((s) => s.id);
            setManualOrderIds(ids);
            persistOrderDebounced(ids);
          }}
          renderItem={({ item, drag, isActive }) => (
            <View style={{ opacity: isActive ? 0.9 : 1 }}>
              <StationCard
                station={item}
                isCurrent={currentStation?.id === item.id}
                isFavorite={isFavorite(item.id)}
                onPress={() => playStation(item)}
                onOpenOptions={openOptions}
                onDrag={drag}
              />
            </View>
          )}
        />
      )}

      <StationOptionsSheet
        visible={sheetVisible}
        station={selectedStation}
        isFavorite={selectedStation ? isFavorite(selectedStation.id) : false}
        onClose={closeOptions}
        onToggleFavorite={toggleFavorite}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111" },

  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "800" },
  headerIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  searchWrap: {
    marginHorizontal: 16,
    marginBottom: 6,
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#2A2A2A",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    overflow: "hidden", // 👈 clave para colapsar suave
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
    paddingVertical: 0,
  },
  clearBtn: { paddingLeft: 6 },

  list: { padding: 16, paddingBottom: 240 },
});

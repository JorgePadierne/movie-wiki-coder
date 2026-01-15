import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { COLORS, SPACING } from "../theme/theme";

const FavoritesScreen = ({ navigation }) => {
  const { items: favorites } = useSelector((state) => state.favorites);

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aún no has agregado favoritos</Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate("HomeTab")}
          >
            <Text style={styles.browseButtonText}>Explorar Películas</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={favorites}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: SPACING.md }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.favItem}
              onPress={() =>
                navigation.navigate("MovieDetail", { movie: item })
              }
            >
              <Image
                source={{ uri: item.poster_path }}
                style={styles.favPoster}
              />
              <View style={styles.favOverlay}>
                <Text style={styles.favTitle} numberOfLines={2}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 18,
    textAlign: "center",
    marginBottom: SPACING.lg,
  },
  browseButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: 8,
  },
  browseButtonText: {
    color: COLORS.text,
    fontWeight: "bold",
  },
  favItem: {
    flex: 1,
    margin: SPACING.xs,
    aspectRatio: 2 / 3,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  favPoster: {
    width: "100%",
    height: "100%",
  },
  favOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: SPACING.sm,
  },
  favTitle: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FavoritesScreen;

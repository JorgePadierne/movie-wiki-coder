import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import { COLORS, SPACING, TYPOGRAPHY } from "../theme/theme";

const { height } = Dimensions.get("window");

const MovieDetailScreen = ({ route }) => {
  const { movie } = route.params;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: favorites } = useSelector((state) => state.favorites);

  const favorite = favorites.some(
    (item) => item.id.toString() === movie.id.toString(),
  );

  const handleToggle = () => {
    dispatch(toggleFavorite({ movie, userId: user?.uid }));
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: movie.poster_path }} style={styles.backdrop} />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={TYPOGRAPHY.header}>{movie.title}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" color="#FFD700" size={16} />
              <Text style={styles.ratingText}>{movie.rating} / 10</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.favButton, favorite && styles.favButtonActive]}
            onPress={handleToggle}
          >
            <Ionicons
              name={favorite ? "heart" : "heart-outline"}
              color={favorite ? COLORS.text : COLORS.active}
              size={24}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.genreChip}>
          <Text style={styles.genreText}>{movie.genre_id}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sinopsis</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
        </View>

        <TouchableOpacity style={styles.playButton}>
          <Text style={styles.playButtonText}>Ver Trailer</Text>
        </TouchableOpacity>

        <View style={{ height: SPACING.xl }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backdrop: {
    width: "100%",
    height: height * 0.6,
  },
  content: {
    padding: SPACING.lg,
    marginTop: -40,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    minHeight: 400,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.md,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  ratingText: {
    color: "#FFD700",
    fontWeight: "bold",
  },
  favButton: {
    backgroundColor: COLORS.surface,
    padding: SPACING.sm,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  favButtonActive: {
    backgroundColor: COLORS.active,
    borderColor: COLORS.active,
  },
  genreChip: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: "flex-start",
    marginBottom: SPACING.lg,
  },
  genreText: {
    color: COLORS.active,
    fontSize: 12,
    fontWeight: "bold",
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.subheader,
    marginBottom: SPACING.sm,
  },
  overview: {
    ...TYPOGRAPHY.body,
    lineHeight: 24,
    color: COLORS.textSecondary,
  },
  playButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: "center",
  },
  playButtonText: {
    color: COLORS.text,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default MovieDetailScreen;

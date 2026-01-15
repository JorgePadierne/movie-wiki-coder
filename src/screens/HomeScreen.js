import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/movies/moviesSlice";
import { CATEGORIES } from "../data/mockData";
import { COLORS, SPACING, TYPOGRAPHY } from "../theme/theme";

const MovieCard = ({ movie, navigation }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate("MovieDetail", { movie })}
  >
    <Image source={{ uri: movie.poster_path }} style={styles.poster} />
    <Text style={styles.movieTitle} numberOfLines={1}>
      {movie.title}
    </Text>
  </TouchableOpacity>
);

const CategoryRow = ({ title, movies, navigation }) => (
  <View style={styles.categoryContainer}>
    <Text style={styles.categoryTitle}>{title}</Text>
    <FlatList
      data={movies}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MovieCard movie={item} navigation={navigation} />
      )}
      contentContainerStyle={{ paddingHorizontal: SPACING.md }}
    />
  </View>
);

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items: movies, loading } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading && movies.length === 0) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const featuredMovie = movies[0];

  return (
    <ScrollView style={styles.container}>
      {featuredMovie && (
        <View style={styles.hero}>
          <Image
            source={{ uri: featuredMovie.poster_path }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>
              Destacado: {featuredMovie.title}
            </Text>
            <TouchableOpacity
              style={styles.heroButton}
              onPress={() =>
                navigation.navigate("MovieDetail", { movie: featuredMovie })
              }
            >
              <Text style={styles.heroButtonText}>Ver Detalles</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {CATEGORIES.map((category) => {
        // Fallback to empty array if movies is undefined
        const currentMovies = movies || [];
        const filteredMovies = currentMovies.filter(
          (m) => m.genre_id === category,
        );
        if (filteredMovies.length === 0) return null;
        return (
          <CategoryRow
            key={category}
            title={category}
            movies={filteredMovies}
            navigation={navigation}
          />
        );
      })}

      <View style={{ height: SPACING.xl }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  hero: {
    height: 400,
    width: "100%",
    position: "relative",
    marginBottom: SPACING.lg,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: SPACING.lg,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  heroTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: SPACING.md,
  },
  heroButton: {
    backgroundColor: COLORS.text,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  heroButtonText: {
    color: COLORS.background,
    fontWeight: "bold",
  },
  categoryContainer: {
    marginBottom: SPACING.lg,
  },
  categoryTitle: {
    ...TYPOGRAPHY.subheader,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  card: {
    width: 140,
    marginRight: SPACING.md,
  },
  poster: {
    width: 140,
    height: 200,
    borderRadius: 8,
    marginBottom: SPACING.xs,
  },
  movieTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "500",
  },
});

export default HomeScreen;

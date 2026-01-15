import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { CATEGORIES } from "../data/mockData";
import { COLORS, SPACING } from "../theme/theme";

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { items: movies } = useSelector((state) => state.movies);

  const filteredMovies = (movies || []).filter((movie) => {
    const matchesQuery = movie.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesCategory = selectedCategory
      ? movie.genre_id === selectedCategory
      : true;
    return matchesQuery && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons
          name="search-outline"
          color={COLORS.textSecondary}
          size={20}
        />
        <TextInput
          style={styles.input}
          placeholder="Busca por título..."
          placeholderTextColor={COLORS.textSecondary}
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")}>
            <Ionicons
              name="close-outline"
              color={COLORS.textSecondary}
              size={20}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.categories}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.chip, !selectedCategory && styles.chipActive]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text
              style={[
                styles.chipText,
                !selectedCategory && styles.chipTextActive,
              ]}
            >
              Todos
            </Text>
          </TouchableOpacity>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.chip,
                selectedCategory === cat && styles.chipActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedCategory === cat && styles.chipTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredMovies}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => navigation.navigate("MovieDetail", { movie: item })}
          >
            <Image
              source={{ uri: item.poster_path }}
              style={styles.gridPoster}
            />
            <Text style={styles.gridTitle} numberOfLines={1}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={COLORS.textSecondary}>
              No se encontraron películas
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    height: 50,
    marginBottom: SPACING.md,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  categories: {
    marginBottom: SPACING.md,
  },
  chip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipActive: {
    backgroundColor: COLORS.active,
    borderColor: COLORS.active,
  },
  chipText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  chipTextActive: {
    color: COLORS.text,
    fontWeight: "bold",
  },
  gridItem: {
    flex: 1 / 3,
    marginBottom: SPACING.md,
    alignItems: "center",
  },
  gridPoster: {
    width: "90%",
    aspectRatio: 2 / 3,
    borderRadius: 8,
  },
  gridTitle: {
    color: COLORS.text,
    fontSize: 12,
    marginTop: 4,
    width: "90%",
    textAlign: "center",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },
});

export default SearchScreen;

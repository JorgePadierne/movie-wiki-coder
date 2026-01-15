import * as SQLite from "expo-sqlite";

// Singleton connection helper
let dbInstance = null;

const getDb = async () => {
  if (!dbInstance) {
    // For expo-sqlite >= 14, use openDatabaseAsync
    dbInstance = await SQLite.openDatabaseAsync("movies.db");
  }
  return dbInstance;
};

// Initialize the database
export const initDatabase = async () => {
  try {
    const db = await getDb();
    // Use execAsync for DDL
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS favorites (id TEXT PRIMARY KEY NOT NULL, data TEXT NOT NULL);
    `);
  } catch (error) {
    console.error("SQLite Init Error:", error);
    throw error;
  }
};

// Save favorites to local storage (replace all)
export const saveFavoritesToLocal = async (favorites) => {
  try {
    const db = await getDb();

    // We can use a transaction or just runAsync sequentially for simplicity.
    // Modern expo-sqlite allows running multiple commands.
    // But for "replace all", we want atomicity.
    // Use withTransactionAsync if available, or just sequential for now.

    // 1. Delete all
    await db.runAsync("DELETE FROM favorites");

    // 2. Insert all
    for (const movie of favorites) {
      await db.runAsync(
        "INSERT INTO favorites (id, data) VALUES (?, ?)",
        movie.id.toString(),
        JSON.stringify(movie),
      );
    }
  } catch (error) {
    console.error("SQLite Save Error:", error);
    throw error;
  }
};

// Get favorites from local storage
export const getFavoritesFromLocal = async () => {
  try {
    const db = await getDb();
    // Use getAllAsync to get array of rows
    const allRows = await db.getAllAsync("SELECT * FROM favorites");

    return allRows.map((row) => JSON.parse(row.data));
  } catch (error) {
    console.error("SQLite Get Error:", error);
    return [];
  }
};

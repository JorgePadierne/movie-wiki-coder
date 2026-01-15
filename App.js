import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./src/app/store";
import AppNavigator from "./src/navigation/AppNavigator";
import { COLORS } from "./src/theme/theme";
import { initDatabase } from "./src/database/sqlite";

export default function App() {
  useEffect(() => {
    initDatabase()
      .then(() => console.log("Database initialized"))
      .catch((err) => console.log("Database init failed", err));
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor={COLORS.background} />
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { COLORS } from "../theme/theme";

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permiso de ubicación denegado");
        setLoading(false);
        return;
      }

      try {
        const timeout = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 5000)
        );

        let lastKnown = await Location.getLastKnownPositionAsync({});
        if (lastKnown) {
          setLocation(lastKnown);
          generateCinemas(lastKnown.coords);
        }

        let current = await Promise.race([
          Location.getCurrentPositionAsync({}),
          timeout,
        ]);
        setLocation(current);
        generateCinemas(current.coords);
      } catch (error) {
        console.log("Error getting location or timeout:", error);
        setErrorMsg("Usando ubicación por defecto (GPS lento en emulador)");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const generateCinemas = (coords) => {
    const newCinemas = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      title: `Cine ${i + 1}`,
      description: "Funciones disponibles",
      coordinate: {
        latitude: coords.latitude + (Math.random() - 0.5) * 0.05,
        longitude: coords.longitude + (Math.random() - 0.5) * 0.05,
      },
    }));
    setCinemas(newCinemas);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Obteniendo ubicación...</Text>
      </View>
    );
  }

  const initialRegion = {
    latitude: location?.coords.latitude || 19.432608,
    longitude: location?.coords.longitude || -99.133209,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {cinemas.map((cinema) => (
          <Marker
            key={cinema.id}
            coordinate={cinema.coordinate}
            title={cinema.title}
            description={cinema.description}
            pinColor={COLORS.primary}
          />
        ))}
      </MapView>

      {errorMsg && (
        <View style={styles.errorOverlay}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      )}
    </View>
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
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.text,
  },
  errorOverlay: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255, 0, 0, 0.8)",
    padding: 10,
    borderRadius: 8,
  },
  errorText: {
    color: "white",
    textAlign: "center",
  },
});

export default MapScreen;

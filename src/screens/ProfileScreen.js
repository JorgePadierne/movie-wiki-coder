import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, TYPOGRAPHY, SPACING } from "../theme/theme";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, updateUserProfile } from "../features/auth/authSlice";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const updatePhoto = async (uri) => {
    try {
      const result = await dispatch(updateUserProfile({ photoURL: uri }));
      if (updateUserProfile.fulfilled.match(result)) {
        Alert.alert("Éxito", "Foto de perfil actualizada");
      } else {
        Alert.alert("Error", "No se pudo actualizar la foto");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al actualizar");
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        updatePhoto(result.assets[0].uri);
      }
    } catch (_error) {
      Alert.alert("Error", "No se pudo abrir la galería");
    }
  };

  const takePhoto = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (permission.status !== "granted") {
        Alert.alert("Permiso denegado", "Se necesita acceso a la cámara");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        updatePhoto(result.assets[0].uri);
      }
    } catch (_error) {
      Alert.alert("Error", "No se pudo abrir la cámara");
    }
  };

  const handleEditPhoto = () => {
    Alert.alert("Cambiar Foto de Perfil", "Selecciona una opción", [
      { text: "Cancelar", style: "cancel" },
      { text: "Galería", onPress: pickImage },
      { text: "Cámara", onPress: takePhoto },
    ]);
  };

  if (!user) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Perfil</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.userInfo}>
          <TouchableOpacity
            onPress={handleEditPhoto}
            style={styles.avatarContainer}
          >
            <Image
              source={{
                uri:
                  user.photoURL ||
                  "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&auto=format&fit=crop&q=60",
              }}
              style={styles.avatar}
            />
            <View style={styles.editIconContainer}>
              <Ionicons name="camera" size={20} color={COLORS.text} />
            </View>
          </TouchableOpacity>
          <Text style={styles.username}>{user.displayName || "Usuario"}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <View style={styles.menu}>
          {/* ... existing menu items ... */}
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings-outline" color={COLORS.text} size={20} />
            <Text style={styles.menuText}>Configuración</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons
              name="notifications-outline"
              color={COLORS.text}
              size={20}
            />
            <Text style={styles.menuText}>Notificaciones</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Ionicons name="log-out-outline" color={COLORS.primary} size={20} />
            <Text style={[styles.menuText, { color: COLORS.primary }]}>
              Cerrar Sesión
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Movie Wiki v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  header: {
    padding: SPACING.lg,
    alignItems: "center",
  },
  title: {
    ...TYPOGRAPHY.header,
  },
  userInfo: {
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  username: {
    ...TYPOGRAPHY.subheader,
    marginBottom: SPACING.xs,
  },
  email: {
    color: COLORS.lightGray,
    fontSize: 14,
  },
  menu: {
    paddingHorizontal: SPACING.lg,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.card,
  },
  menuText: {
    color: COLORS.text,
    marginLeft: SPACING.md,
    fontSize: 16,
  },
  footer: {
    marginTop: SPACING.xl,
    alignItems: "center",
  },
  footerText: {
    color: COLORS.gray,
    fontSize: 12,
  },
});

export default ProfileScreen;

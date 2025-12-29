import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { COLORS, SPACING, TYPOGRAPHY } from "../theme/theme";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.photoURL }} style={styles.avatar} />
        <Text style={styles.name}>{user.displayName}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="shield-outline" color={COLORS.text} size={20} />
          <Text style={styles.menuText}>Privacidad</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="settings-outline" color={COLORS.text} size={20} />
          <Text style={styles.menuText}>Configuración</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.menuItem} onPress={logout}>
          <Ionicons name="log-out-outline" color={COLORS.primary} size={20} />
          <Text style={[styles.menuText, { color: COLORS.primary }]}>
            Cerrar Sesión
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={TYPOGRAPHY.caption}>Movie Wiki v1.0.0</Text>
        <Text style={TYPOGRAPHY.caption}>Powered by TMDB data (simulated)</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: "center",
    paddingVertical: SPACING.xl,
    backgroundColor: COLORS.surface,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: SPACING.md,
    borderWidth: 3,
    borderColor: COLORS.active,
  },
  name: {
    ...TYPOGRAPHY.subheader,
    marginBottom: 4,
  },
  email: {
    ...TYPOGRAPHY.caption,
  },
  section: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuText: {
    color: COLORS.text,
    fontSize: 16,
    marginLeft: SPACING.md,
  },
  divider: {
    height: SPACING.lg,
  },
  footer: {
    alignItems: "center",
    marginTop: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
});

export default ProfileScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { COLORS, SPACING, TYPOGRAPHY } from "../theme/theme";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) return alert("Por favor llena todos los campos");
    await login(email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={TYPOGRAPHY.header}>Movie Wiki</Text>
      <Text style={[TYPOGRAPHY.caption, { marginBottom: SPACING.xl }]}>
        Bienvenido de nuevo
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={COLORS.textSecondary}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor={COLORS.textSecondary}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.text} />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: SPACING.md }}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={TYPOGRAPHY.caption}>
          ¿No tienes cuenta?{" "}
          <Text style={{ color: COLORS.active }}>Regístrate</Text>
        </Text>
      </TouchableOpacity>

      {/* Comentario para el futuro: Aquí insertar lógica de Firebase Auth */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 8,
    color: COLORS.text,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  button: {
    width: "100%",
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: "center",
    marginTop: SPACING.md,
  },
  buttonText: {
    color: COLORS.text,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LoginScreen;

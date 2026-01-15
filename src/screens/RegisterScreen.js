import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { COLORS, SPACING, TYPOGRAPHY } from "../theme/theme";
import { Ionicons } from "@expo/vector-icons";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.status !== "granted") {
        alert("Se necesitan permisos para usar la cámara.");
        return;
      }

      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error taking photo: ", error);
      alert("Error: " + error.message);
    }
  };

  const handleRegister = async () => {
    if (!name || !email || !password)
      return alert("Por favor llena todos los campos");
    dispatch(registerUser({ name, email, password, photoURL: image }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={TYPOGRAPHY.header}>Crear Cuenta</Text>
      <Text style={[TYPOGRAPHY.caption, { marginBottom: SPACING.xl }]}>
        Únete a la comunidad cinéfila
      </Text>

      <View style={{ alignItems: "center", marginBottom: SPACING.xl }}>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons
                name="camera-outline"
                color={COLORS.textSecondary}
                size={32}
              />
              <Text style={styles.placeholderText}>Galería</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={takePhoto}
          style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}
        >
          <Ionicons
            name="camera"
            size={20}
            color={COLORS.primary}
            style={{ marginRight: 5 }}
          />
          <Text style={{ color: COLORS.primary, fontWeight: "bold" }}>
            Tomar Foto
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        placeholderTextColor={COLORS.textSecondary}
        value={name}
        onChangeText={setName}
      />
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
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.text} />
        ) : (
          <Text style={styles.buttonText}>Registrarse</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: SPACING.md }}
        onPress={() => navigation.goBack()}
      >
        <Text style={TYPOGRAPHY.caption}>
          ¿Ya tienes cuenta?{" "}
          <Text style={{ color: COLORS.active }}>Inicia sesión</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePicker: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    alignItems: "center",
  },
  placeholderText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 4,
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

export default RegisterScreen;

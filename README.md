# Movie Wiki Coder

Una aplicación móvil completa desarrollada en React Native y Expo para explorar películas, gestionar favoritos y encontrar cines cercanos.

## 📱 Características

- **Autenticación**: Registro e inicio de sesión con correo y contraseña (Firebase Auth).
- **Exploración de Películas**:
  - Lista de películas populares y recientes.
  - Generos y filtros por categoría.
  - Búsqueda en tiempo real.
- **Detalle de Película**: Información detallada, sinopsis y opción para añadir a favoritos.
- **Favoritos**: Gestión de lista personal de películas favoritas (Redux + Persistencia).
- **Mapa de Cines**:
  - Visualización de ubicación del usuario.
  - **Generación dinámica de cines**: Muestra cines "falsos" generados aleatoriamente alrededor de tu ubicación actual.
- **Perfil de Usuario**:
  - Gestión de avatar (Cámara o Galería).
  - Persistencia de sesión.

## 🛠 Tecnologías Utilizadas

- **Core**: React Native, Expo.
- **Estado Global**: Redux Toolkit.
- **Navegación**: React Navigation (Stack & Tab).
- **Backend & Auth**: Firebase.
- **Mapa**: React Native Maps.
- **UI/UX**: Estilos personalizados, Iconos (Ionicons).

## 🚀 Instalación y Configuración

1.  **Clonar el repositorio**
2.  **Instalar dependencias**:
    ```bash
    npm install
    ```
3.  **Configurar Firebase**:
    - Asegúrate de que `src/config/firebaseConfig.js` tenga tus credenciales válida.
4.  **Ejecutar la aplicación**:
    ```bash
    npm start
    ```

    - Presiona `a` para Android (Emulador o Dispositivo).
    - Presiona `i` para iOS (Mac).
    - Presiona `w` para Web.

## 📝 Notas

- La funcionalidad de mapa requiere permisos de ubicación. Si estás en un emulador, asegúrate de configurar una ubicación simulada.
- Las fotos de perfil se manejan actualmente con URIs locales para demostración.

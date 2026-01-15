import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { setUser } from "../features/auth/authSlice";
import {
  subscribeToFavorites,
  setFavorites,
} from "../features/favorites/favoritesSlice";
import { COLORS } from "../theme/theme";

// Screens
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MovieDetailScreen from "../screens/MovieDetailScreen";
import MapScreen from "../screens/MapScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: true,
      headerStyle: {
        backgroundColor: COLORS.background,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTintColor: COLORS.text,
      tabBarStyle: {
        backgroundColor: COLORS.background,
        borderTopColor: COLORS.border,
      },
      tabBarActiveTintColor: COLORS.active,
      tabBarInactiveTintColor: COLORS.inactive,
      tabBarIcon: ({ color, size, focused }) => {
        let iconName;
        if (route.name === "HomeTab")
          iconName = focused ? "home" : "home-outline";
        if (route.name === "SearchTab")
          iconName = focused ? "search" : "search-outline";
        if (route.name === "FavoritesTab")
          iconName = focused ? "heart" : "heart-outline";
        if (route.name === "MapsTab")
          iconName = focused ? "map" : "map-outline";
        if (route.name === "ProfileTab")
          iconName = focused ? "person" : "person-outline";

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarLabelStyle: { display: "none" },
    })}
  >
    <Tab.Screen
      name="HomeTab"
      component={HomeScreen}
      options={{ title: "Movie Wiki" }}
    />
    <Tab.Screen
      name="SearchTab"
      component={SearchScreen}
      options={{ title: "Explorar" }}
    />
    <Tab.Screen
      name="FavoritesTab"
      component={FavoritesScreen}
      options={{ title: "Mis Favoritos" }}
    />
    <Tab.Screen
      name="MapsTab"
      component={MapScreen}
      options={{ title: "Cines" }}
    />
    <Tab.Screen
      name="ProfileTab"
      component={ProfileScreen}
      options={{ title: "Perfil" }}
    />
  </Tab.Navigator>
);

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Main" component={MainTabs} />
    <Stack.Screen
      name="MovieDetail"
      component={MovieDetailScreen}
      options={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: "",
        headerTintColor: COLORS.text,
      }}
    />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Serializamos solo lo necesario
        const serializedUser = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        };
        dispatch(setUser(serializedUser));
        dispatch(subscribeToFavorites(currentUser.uid));
      } else {
        dispatch(setUser(null));
        dispatch(setFavorites([]));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;

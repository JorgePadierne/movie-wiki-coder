import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBNPwzaLdsp7LZYV7Jp6cfD9iMf53WbZtc",
  authDomain: "coder-react-native-f940e.firebaseapp.com",
  projectId: "coder-react-native-f940e",
  storageBucket: "coder-react-native-f940e.firebasestorage.app",
  messagingSenderId: "344875532433",
  appId: "1:344875532433:web:3129d1c399426eef12ff30",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);

export { auth, db };

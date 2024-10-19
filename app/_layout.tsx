import { useFonts } from "expo-font";
import { useState, useEffect } from "react";
import { useAuthentication } from "@/hooks/useAuthentication";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { ANDROID_CLIENT_ID, SCOPES, WEB_CLIENT_ID } from "@/config";
import Login from "./login";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isLayoutMounted, setLayoutMounted] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const { checkExistingToken, user } = useAuthentication();

  useEffect(() => {
    GoogleSignin.configure({
      scopes: SCOPES,
      webClientId: WEB_CLIENT_ID,
      androidClientId: ANDROID_CLIENT_ID,
      offlineAccess: true,
    });
    checkExistingToken();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    // Marcar que el layout está montado cuando los efectos iniciales estén completos
    if (loaded) {
      setLayoutMounted(true);
    }
  }, [loaded]);

  if (!loaded || !isLayoutMounted) {
    return null; // Esperar a que todo esté listo antes de renderizar el contenido
  }

  // Renderiza el login si no hay usuario, sino, el Slot
  return (
    <ThemeProvider value={DefaultTheme}>
      {user ? <Slot /> : <Login />}
    </ThemeProvider>
  );
}

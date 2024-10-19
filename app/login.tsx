import { Button, View } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthentication } from "@/hooks/useAuthentication";
import { Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function Login() {
  const { user, setUser } = useAuthentication();
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Hook para redirigir

  const handleSignIn = async () => {
    setLoading(true); // Empieza el estado de carga
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const token = await GoogleSignin.getTokens();
      setUser(userInfo);
      await AsyncStorage.setItem("googleToken", token.accessToken);
      alert("Usuario logueado con éxito");
      console.log("Usuario logueado con éxito");
      router.replace("/(tabs)/");
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      alert(`Error durante el inicio de sesión: ${JSON.stringify(error)}`);
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  // // Si el usuario está logueado, redirigir al home ("/tabs")
  // if (user) {
  //   return <Redirect href="/(tabs)" />;
  // }

  return (
    <View className="flex-1 justify-center items-center gap-4">
      {loading ? (
        <Button title="Cargando..." disabled />
      ) : (
        <Button title="Loguearse con Google" onPress={handleSignIn} />
      )}
    </View>
  );
}

import { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";

export const useAuthentication = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const checkExistingToken = async () => {
    const token = await AsyncStorage.getItem("googleToken");
    if (token) {
      setUser({ token });
    } else {
      setUser(null);
    }
  };

  const handleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem("googleToken");
      setUser(null);
      alert("Deslogueado correctamente");
      router.replace("/login");
    } catch (error) {
      alert(`Error de deslogueo: ${JSON.stringify(error)}`);
      console.error("Sign out error:", error);
    }
  };

  return { user, setUser, checkExistingToken, handleSignOut };
};

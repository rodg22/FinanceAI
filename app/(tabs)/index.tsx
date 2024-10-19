import { Image, StyleSheet, Platform, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useEffect } from "react";
import { router } from "expo-router";

export default function HomeScreen() {
  const { user, handleSignOut } = useAuthentication();

  // useEffect(() => {
  //   if (!user) {
  //     router.replace("/");
  //   }
  // }, [user]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#d6dbdf", dark: "#d6dbdf" }}
      headerImage={
        <Image
          source={require("@/assets/images/logo-finance.jpg")}
          style={styles.logo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Finance AI</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">
          La app para gestionar tus finanzas
        </ThemedText>
        <ThemedText>
          Usando IA y planillas de google para ayudarte con tu dinero.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Datos</ThemedText>
        <ThemedText>
          Navegá a "Datos" para ver tus gastos e ingresos.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Carga</ThemedText>
        <ThemedText>
          Navegá a "Carga" para reportar gastos e ingresos.
        </ThemedText>
      </ThemedView>

      <Button title="Desloguearse" onPress={handleSignOut} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  logo: {
    height: 267,
    width: 435,
    top: 20,
    left: -20,
    position: "absolute",
  },
});

import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          paddingBottom: 3,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="data"
        options={{
          title: "Datos",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "analytics" : "analytics-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          title: "Carga",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "add" : "add-outline"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

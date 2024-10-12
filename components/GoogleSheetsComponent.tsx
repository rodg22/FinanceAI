import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WEB_CLIENT_ID, ANDROID_CLIENT_ID, SCOPES } from "../config";
import useGoogleFetching from "@/hooks/useGoogleFetching";

export default function GoogleSheetsComponent() {
  const [user, setUser] = useState(null);
  const { sheetData, setSheetData, fetchSheetData } = useGoogleFetching();
  useEffect(() => {
    GoogleSignin.configure({
      scopes: SCOPES,
      webClientId: WEB_CLIENT_ID,
      androidClientId: ANDROID_CLIENT_ID,
      offlineAccess: true,
    });
    checkExistingToken();
  }, []);

  const checkExistingToken = async () => {
    const token = await AsyncStorage.getItem("googleToken");
    if (token) {
      setUser({ token });
      fetchSheetData();
    }
  };

  const handleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const token = await GoogleSignin.getTokens();
      setUser(userInfo);
      await AsyncStorage.setItem("googleToken", token.accessToken);
      fetchSheetData();
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem("googleToken");
      setUser(null);
      setSheetData([]);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4 mt-10">
      {user ? (
        <>
          <Text className="text-xl font-bold mt-6 mb-4">
            Google Sheets Data
          </Text>
          <ScrollView horizontal className="mb-4">
            <View>
              {sheetData.map((row, rowIndex) => (
                <View key={rowIndex} className="flex flex-row">
                  {row.map((cell, cellIndex) => (
                    <View
                      key={cellIndex}
                      className={`border border-gray-300 p-2 w-24 ${
                        rowIndex === 0 ? "bg-gray-100" : ""
                      }`}
                    >
                      <Text
                        className={`${rowIndex === 0 ? "font-bold" : ""} ${
                          cellIndex === 0 ? "font-semibold" : ""
                        }`}
                      >
                        {cell}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
          <Button title="Sign Out" onPress={handleSignOut} />
        </>
      ) : (
        <Button title="Sign In with Google" onPress={handleSignIn} />
      )}
    </View>
  );
}

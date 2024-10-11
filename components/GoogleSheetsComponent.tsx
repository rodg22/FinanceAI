import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, ScrollView } from "react-native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  WEB_CLIENT_ID,
  ANDROID_CLIENT_ID,
  SCOPES,
  SPREADSHEET_ID,
} from "../config";

export default function GoogleSheetsComponent() {
  const [user, setUser] = useState(null);
  const [sheetData, setSheetData] = useState([]);
  const [inputs, setInputs] = useState(["", "", "", "", ""]);

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
      fetchSheetData(token);
    }
  };

  console.log(sheetData);

  const handleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const token = await GoogleSignin.getTokens();
      setUser(userInfo);
      await AsyncStorage.setItem("googleToken", token.accessToken);
      fetchSheetData(token.accessToken);
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

  const fetchSheetData = async (token) => {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Octubre!A5:E40`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      if (result.values) {
        setSheetData(result.values);
      }
    } catch (error) {
      console.error("Error fetching sheet data:", error);
    }
  };

  const handleInputChange = (text, index) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = text;
    setInputs(updatedInputs);
  };

  const addExpense = async () => {
    if (inputs.some((input) => input === "")) {
      alert("Please fill all fields");
      return;
    }

    const token = await AsyncStorage.getItem("googleToken");

    const nextRow = sheetData.length + 5; // Para empezar después de la fila 4
    const range = `Octubre!A${nextRow}:E${nextRow}`;

    // Convertir el monto (cuarto input) a número
    const newExpense = [
      inputs.map((input, index) => (index === 3 ? parseFloat(input) : input)),
    ];

    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}:append?valueInputOption=RAW`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            values: newExpense,
          }),
        }
      );
      const result = await response.json();
      if (result.updates) {
        fetchSheetData(token); // Refrescar los datos después de añadir la fila
        alert("Gasto añadido correctamente");
        setInputs(["", "", "", "", ""]); // Limpiar inputs
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4 mt-10">
      {user ? (
        <>
          <Text className="text-xl font-bold mb-4">Cargar Datos</Text>
          {["Fecha", "Quien pago?", "Cuenta", "Monto", "Observaciones"].map(
            (label, index) => (
              <TextInput
                key={index}
                placeholder={label}
                value={inputs[index]}
                onChangeText={(text) => handleInputChange(text, index)}
                className="border border-gray-300 p-2 mb-2 w-full"
              />
            )
          )}
          <Button title="Cargar" onPress={addExpense} />

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

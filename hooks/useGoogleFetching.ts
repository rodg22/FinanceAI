import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ANDROID_CLIENT_ID,
  SCOPES,
  SPREADSHEET_ID,
  WEB_CLIENT_ID,
} from "@/config";
import { useState, useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const useGoogleFetching = (dataFromAudio: boolean = false) => {
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
      fetchSheetData();
    }
  };

  const handleInputChange = (text: string, index: number) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = text;
    setInputs(updatedInputs);
  };

  const handleInputChangeFromAudio = async (data: any) => {
    const inputFromAudio: any = Object.values(data);
    await AsyncStorage.setItem(
      "inputFromAudio",
      JSON.stringify(inputFromAudio)
    );
    await addExpense();
  };

  const addExpense = async () => {
    if (inputs.some((input) => input === "") && !dataFromAudio) {
      alert("Please fill all fields");
      return;
    }

    let uploadableData;

    if (dataFromAudio) {
      const inputFromAudio = await AsyncStorage.getItem("inputFromAudio");
      uploadableData = inputFromAudio && JSON.parse(inputFromAudio);
    } else {
      uploadableData = inputs;
    }

    console.log("uploadableData", uploadableData);

    const token = await AsyncStorage.getItem("googleToken");
    const sheetDataStored = JSON.parse(
      (await AsyncStorage.getItem("sheetData")) || "[]"
    );

    const nextRow = sheetDataStored?.length + 5; // Para empezar después de la fila 4 por mi planilla en especifico
    const range = `Octubre!A${nextRow}:E${nextRow}`;

    // Convertir el monto (cuarto input) a número
    const newExpense = [
      uploadableData.map((input: string, index: number) =>
        index === 3 ? parseFloat(input) : input
      ),
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
        alert("Datos subidos correctamente!");
        fetchSheetData();
        setInputs(["", "", "", "", ""]);
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const fetchSheetData = async () => {
    const token = await AsyncStorage.getItem("googleToken");
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Octubre!A5:E50`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      if (result.values) {
        setSheetData(result.values);
        await AsyncStorage.setItem("sheetData", JSON.stringify(result.values));
      }
    } catch (error) {
      console.error("Error fetching sheet data:", error);
    }
  };

  return {
    inputs,
    handleInputChange,
    handleInputChangeFromAudio,
    addExpense,
    fetchSheetData,
    sheetData,
    setSheetData,
  };
};

export default useGoogleFetching;

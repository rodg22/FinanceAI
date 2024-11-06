import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SCOPES,
  ANDROID_CLIENT_ID,
  WEB_CLIENT_ID,
  EDIT_SPREADSHEET_URL,
  GET_SPREADSHEET_URL,
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
      console.log("inputFromAudio", inputFromAudio);
      uploadableData = inputFromAudio && JSON.parse(inputFromAudio);
    } else {
      uploadableData = inputs;
    }

    const body = JSON.stringify({
      fecha: uploadableData[0],
      quienPago: uploadableData[1],
      cuenta: uploadableData[2],
      monto: parseFloat(uploadableData[3]),
      observaciones: uploadableData[4],
    });

    try {
      const response = await fetch(EDIT_SPREADSHEET_URL, {
        method: "POST",
        body,
      });
      console.log("response", response);
      const result = await response.json();
      console.log("result", result);
      if (result.updates) {
        alert("Datos subidos correctamente!");
        fetchSheetData();
        setInputs(["", "", "", "", ""]);
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Error subiendo los datos!");
    }
  };

  const fetchSheetData = async () => {
    try {
      const response = await fetch(GET_SPREADSHEET_URL);
      console.log("response", response);

      // Verifica si la respuesta es exitosa
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("result", result);

      // Directamente puedes usar result, ya que es un array de objetos
      setSheetData(result);
      await AsyncStorage.setItem("sheetData", JSON.stringify(result));
    } catch (error) {
      alert("Error fetching sheet data");
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

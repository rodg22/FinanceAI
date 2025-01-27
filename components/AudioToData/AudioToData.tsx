import { Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import axios from "axios";
import AudioToDataTemplate from "./AudioToData.template";
import useGoogleFetching from "@/hooks/useGoogleFetching";

const AudioToData: React.FC = () => {
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isMicrophoneButtonEnabled, setIsMicrophoneButtonEnabled] =
    useState(true);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [AIResponse, setAIResponse] = useState({ data: "", transcript: "" });
  const [responseData, setResponseData] = useState("");
  const { handleInputChangeFromAudio } = useGoogleFetching(true);

  const getMicrophonePermission = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();

      if (!granted) {
        Alert.alert(
          "Permisos",
          "Por favor, otorgue permisos para acceder al micrófono"
        );
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const uploadData = async () => {
    try {
      // Esperamos la respuesta de la función asíncrona
      const result = await handleInputChangeFromAudio(responseData);
      // Solo se ejecuta si no hubo excepción
      result && resetResponse();
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  const resetResponse = () => {
    setTranscript("");
    setAIResponse({ data: "", transcript: "" });
    setResponseData("");
    setIsMicrophoneButtonEnabled(true);
  };

  const recordingOptions: any = {
    android: {
      extension: ".m4a", // Cambiamos la extensión a .m4a
      outputFormat: Audio.AndroidOutputFormat.MPEG_4, // MPEG-4 es el contenedor para .m4a
      androidEncoder: Audio.AndroidAudioEncoder.AAC, // Usamos el codificador AAC
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    ios: {
      extension: ".m4a", // Igual en iOS
      audioQuality: Audio.IOSAudioQuality.HIGH,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
  };

  const startRecording = async () => {
    const hasPermission = await getMicrophonePermission();
    if (!hasPermission) return;
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      setIsRecording(true);
      const { recording } = await Audio.Recording.createAsync(recordingOptions);
      setRecording(recording);
    } catch (error) {
      setIsRecording(false);
      setLoading(false);
      console.log("Error al empezar a grabar", error);
      Alert.alert("Error", "Error al grabar, intente de nuevo.");
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      setLoading(true);
      await recording?.stopAndUnloadAsync();

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      const uri = recording?.getURI() || "";

      // Send audio to n8n workflow
      const aiResponse = await sendAudioTon8n(uri!);
      console.log("aiResponse", aiResponse);
      setAIResponse(aiResponse);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Failed to stop Recording", error);
      Alert.alert("Error", "Failed to stop recording");
    }
  };

  const sendAudioTon8n = async (uri: string) => {
    try {
      const formData: any = new FormData();
      formData.append("file", {
        uri: uri,
        name: "recording.m4a",
        type: "audio/m4a",
      });

      const response = await axios.post(
        "https://n8n.giutech-innovations.com.ar/webhook/924cd8b4-f968-4a84-ba8a-291b638507bb",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data || error.message);
      } else {
        alert(error);
      }
    }
  };

  useEffect(() => {
    if (AIResponse.data) {
      try {
        console.log("AIResponse", AIResponse);
        const { data, transcript } = AIResponse;
        console.log("data", data);
        setTranscript(transcript);
        setResponseData(data);
        setIsMicrophoneButtonEnabled(false);
      } catch (error) {
        console.error("Error parsing AIResponse:", error);
      }
    }
  }, [AIResponse]);

  return (
    <AudioToDataTemplate
      isRecording={isRecording}
      startRecording={startRecording}
      stopRecording={stopRecording}
      loading={loading}
      transcript={transcript}
      responseData={responseData}
      isMicrophoneButtonEnabled={isMicrophoneButtonEnabled}
      resetResponse={resetResponse}
      uploadData={uploadData}
    />
  );
};

export default AudioToData;

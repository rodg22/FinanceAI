import { Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import axios from "axios";
import { dataToSend } from "@/constants/constants";
import AudioToDataTemplate from "./AudioToData.template";
import useGoogleFetching from "@/hooks/useGoogleFetching";
import { OPENAI_API_KEY } from "@/config/config";

const AudioToData: React.FC = () => {
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isMicrophoneButtonEnabled, setIsMicrophoneButtonEnabled] =
    useState(true);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [AIResponse, setAIResponse] = useState("");
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

  const uploadData = () => handleInputChangeFromAudio(responseData);

  const resetResponse = () => {
    setTranscript("");
    setAIResponse("");
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

      const uri = recording?.getURI();

      // send audio to whisper API for transcription
      const transcriptAudio = await sendAudioToWhisper(uri!);

      setTranscript(transcriptAudio);
    } catch (error) {
      console.log("Failed to stop Recording", error);
      Alert.alert("Error", "Failed to stop recording");
    }
  };

  const sendAudioToWhisper = async (uri: string) => {
    try {
      const formData: any = new FormData();
      formData.append("model", "whisper-1");
      formData.append("file", {
        uri: uri,
        name: "recording.m4a",
        type: "audio/m4a",
      });

      const response = await axios.post(
        "https://api.openai.com/v1/audio/transcriptions",
        formData,
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.text;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Axios error:", error.response?.data || error.message);
      } else {
        console.log("Error:", error);
      }
    }
  };

  useEffect(() => {
    if (transcript?.length > 25) {
      sendToGpt(transcript);
    }
  }, [transcript]);

  const sendToGpt = async (transcript: string) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: dataToSend(transcript),
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      setAIResponse(response.data.choices[0].message.content);
      setLoading(false);
      return;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error mandando el texto a gpt:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
      } else {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    if (AIResponse) {
      try {
        const data = JSON.parse(AIResponse);
        const now = new Date();
        const utcOffset = -3 * 60;
        const localDate = new Date(now.getTime() + utcOffset * 60 * 1000);

        const dia = localDate.getDate();
        const mes = localDate.getMonth() + 1;
        const anio = localDate.getFullYear();

        const formattedDia = dia < 10 ? "0" + dia : dia;
        const formattedMes = mes < 10 ? "0" + mes : mes;
        const fecha = `${formattedDia}/${formattedMes}/${anio}`;

        const updatedData = {
          fecha,
          ...data,
        };

        setResponseData(updatedData);
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

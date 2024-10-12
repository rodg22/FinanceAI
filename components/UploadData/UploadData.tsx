import { Alert } from "react-native";
import React, { useState } from "react";
import UploadDataTemplate from "./UploadData.template";
import { Audio } from "expo-av";
import axios from "axios";
import { dataToSend } from "@/constants/constants";

const UploadData: React.FC = () => {
  const [transcript, setTranscript] = useState("");
  const [responseData, setResponseData] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording>();
  // const [AIResponse, setAIResponse] = useState(false);

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

      // send the transcript to GPT API for response
      await sendToGpt(transcriptAudio);
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

      const API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

      const response = await axios.post(
        "https://api.openai.com/v1/audio/transcriptions",
        formData,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
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

  // send text to model
  const sendToGpt = async (transcriptAudio: string) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: dataToSend(transcriptAudio),
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      setResponseData(
        JSON.parse(JSON.parse(response.data.choices[0].message.content))
      );
      setLoading(false);
      // setAIResponse(true);
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

  console.log("transcript", transcript);
  console.log("text", responseData);

  return (
    <UploadDataTemplate
      isRecording={isRecording}
      startRecording={startRecording}
      stopRecording={stopRecording}
      loading={loading}
      transcript={transcript}
      responseData={responseData}
    />
  );
};

export default UploadData;

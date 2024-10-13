import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { TabBarIcon } from "../navigation/TabBarIcon";
import { styled } from "nativewind";

interface AudioToDataTemplateProps {
  //   onUpload: () => void;
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  loading: boolean;
  transcript: string;
  responseData: any;
  isMicrophoneButtonEnabled: boolean;
  resetResponse: () => void;
  uploadData: () => void;
}

const StyledPressable = styled(Pressable);

const AudioToDataTemplate: React.FC<AudioToDataTemplateProps> = ({
  isRecording,
  startRecording,
  stopRecording,
  loading,
  transcript,
  responseData,
  isMicrophoneButtonEnabled,
  resetResponse,
  uploadData,
}) => {
  return (
    <View className="flex flex-col items-center h-[100vh] justify-center px-4">
      <View className="flex items-center justify-center">
        <Text className="text-xl font-bold mb-4">Cargar Datos | Con Audio</Text>
        <View className="text-md text-center flex gap-2">
          {!loading && !transcript ? (
            <Text className="text-md text-center">
              {isRecording ? "Grabando..." : "Mantén presionado para grabar"}
            </Text>
          ) : transcript ? (
            <>
              <Text className="text-md text-center font-bold">
                Transcripción
              </Text>
              <Text className="text-md text-center italic">"{transcript}"</Text>
            </>
          ) : (
            <Text className="text-md text-center">Cargando...</Text>
          )}
        </View>
        {responseData && (
          <View className="flex flex-col items-center justify-center mt-8">
            <Text className="text-md text-center font-bold mb-2">
              Datos que se subirán:
            </Text>
            {Object.keys(responseData).map((item: any, index: number) => (
              <Text key={index} className="text-md text-center">
                <Text className="capitalize underline">{item}:</Text>{" "}
                {responseData[item]}
              </Text>
            ))}
            <View className="flex flex-row gap-4 mt-4 pl-3">
              <StyledPressable
                className="active:opacity-70 bg-green-500 py-2 px-4 rounded-md"
                onPress={uploadData}
              >
                <Text className="text-white font-bold text-lg">
                  Subir Datos
                </Text>
              </StyledPressable>
              <StyledPressable
                className="bg-slate-500 py-2 px-4 rounded-md"
                onPress={resetResponse}
              >
                <Text className="active:opacity-70 text-white font-bold text-lg">
                  Volver a grabar
                </Text>
              </StyledPressable>
            </View>
          </View>
        )}
      </View>
      {isMicrophoneButtonEnabled ? (
        <View className="absolute bottom-10">
          <StyledPressable
            className="active:opacity-70 bg-green-500 rounded-full p-4"
            onLongPress={startRecording}
            onPressOut={stopRecording}
          >
            <TabBarIcon name={"mic-sharp"} size={50} />
          </StyledPressable>
        </View>
      ) : null}
    </View>
  );
};

export default AudioToDataTemplate;

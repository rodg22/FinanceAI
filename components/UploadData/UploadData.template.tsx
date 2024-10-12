import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TabBarIcon } from "../navigation/TabBarIcon";

interface UploadDataTemplateProps {
  //   onUpload: () => void;
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
  loading: boolean;
  transcript: string;
  responseData: any;
}

const UploadDataTemplate: React.FC<UploadDataTemplateProps> = ({
  isRecording,
  startRecording,
  stopRecording,
  loading,
  transcript,
  responseData,
}) => {
  return (
    <View className="flex flex-col items-center h-[100vh] justify-center px-4">
      <View className="flex items-center justify-center">
        <Text className="text-xl font-bold mb-6">Subir Datos</Text>
        <View className="text-md text-center flex gap-2">
          {loading ? (
            <Text className="text-md text-center font-bold">...</Text>
          ) : (
            (
              <>
                <Text className="text-md text-center font-bold">
                  Transcripción
                </Text>
                <Text className="text-md text-center italic">
                  "{transcript}"
                </Text>
              </>
            ) || (
              <Text className="text-md text-center font-bold">Cargando...</Text>
            )
          )}
        </View>
        {responseData && (
          <View className="flex flex-col items-center justify-center mt-8">
            <Text className="text-md text-center font-bold mb-2">
              Datos que se subirán:
            </Text>
            {Object.keys(responseData).map((item: any, index: number) => (
              <Text key={index} className="text-md text-center italic">
                {item}: {responseData[item]}
              </Text>
            ))}
          </View>
        )}
      </View>
      <View className="absolute bottom-10">
        <TouchableOpacity onPressIn={startRecording} onPressOut={stopRecording}>
          <TabBarIcon name={"mic-circle"} size={80} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UploadDataTemplate;

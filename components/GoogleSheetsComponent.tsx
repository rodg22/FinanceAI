import { useEffect } from "react";
import { View, Text, Button, ScrollView } from "react-native";

import useGoogleFetching from "@/hooks/useGoogleFetching";

export default function GoogleSheetsComponent() {
  const { sheetData, fetchSheetData } = useGoogleFetching();

  useEffect(() => {
    fetchSheetData();
  }, []);

  const headers = ["Fecha", "Quien Pago", "Cuenta", "Monto", "Observaciones"];

  return (
    <View className="flex-1 justify-center items-center p-4 mt-10">
      <Button title="Actualizar" onPress={fetchSheetData} />
      {sheetData?.length ? (
        <>
          <ScrollView horizontal>
            <View className="my-4">
              {/* Headers */}
              <View className="flex flex-row">
                {headers?.map((cell, cellIndex) => (
                  <View
                    key={cellIndex}
                    className={`border border-gray-300 p-2 w-24 bg-gray-100`}
                  >
                    <Text className={"font-bold"}>{cell}</Text>
                  </View>
                ))}
              </View>
              <View>
                {sheetData?.map((row, rowIndex) => (
                  <View key={rowIndex} className="flex flex-row">
                    {Object.values(row)?.map((cell, cellIndex) => {
                      if (cellIndex === 0) return;
                      return (
                        <View
                          key={cellIndex}
                          className={`border border-gray-300 p-2 w-24 ${
                            rowIndex === 0 ? "bg-gray-100" : ""
                          }`}
                        >
                          <Text>{cell}</Text>
                        </View>
                      );
                    })}
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </>
      ) : (
        <Text>Cargando Información...</Text>
      )}
    </View>
  );
}

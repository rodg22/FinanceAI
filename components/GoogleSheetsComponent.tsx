import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView } from "react-native";

import useGoogleFetching from "@/hooks/useGoogleFetching";

export default function GoogleSheetsComponent() {
  const { sheetData, setSheetData, fetchSheetData } = useGoogleFetching();

  useEffect(() => {
    fetchSheetData();
  }, []);

  return (
    <View className="flex-1 justify-center items-center p-4 mt-10">
      {sheetData ? (
        <>
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
        </>
      ) : (
        <Text>Cargando Información...</Text>
      )}
    </View>
  );
}

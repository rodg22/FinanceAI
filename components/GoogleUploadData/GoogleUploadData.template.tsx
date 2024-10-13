import React from "react";
import { View, Text, TextInput, Button } from "react-native";

const GoogleUploadDataTemplate = ({
  inputs,
  handleInputChange,
  addExpense,
}: {
  inputs: string[];
  handleInputChange: (text: string, index: number) => void;
  addExpense: () => void;
}) => {
  return (
    <View>
      <Text className="text-xl font-bold mb-4">Cargar Datos | Manual</Text>
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
    </View>
  );
};

export default GoogleUploadDataTemplate;

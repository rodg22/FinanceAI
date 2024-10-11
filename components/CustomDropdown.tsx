import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

interface CustomDropdownProps {
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  selectedValue,
  onSelect,
  placeholder = "Seleccionar",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="w-52 z-50 relative">
      <TouchableOpacity
        className="p-2.5 border border-gray-300 rounded-md bg-white"
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text className="text-base">{selectedValue || placeholder}</Text>
      </TouchableOpacity>

      {isOpen && (
        <ScrollView className="max-h-52 border border-gray-300 rounded-md absolute top-12 left-0 right-0 bg-white">
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              className="p-2.5 border-b border-gray-100"
              onPress={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              <Text className="text-base">{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default CustomDropdown;

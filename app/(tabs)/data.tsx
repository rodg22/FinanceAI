import { StyleSheet, Image, Platform, ScrollView } from "react-native";
import GoogleSheetsComponent from "@/components/GoogleSheetsComponent";

export default function Data() {
  return (
    <ScrollView>
      <GoogleSheetsComponent />
    </ScrollView>
  );
}

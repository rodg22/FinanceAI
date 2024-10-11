import { StyleSheet, Image, Platform, ScrollView } from "react-native";
import GoogleSheetsComponent from "@/components/GoogleSheetsComponent";

export default function Data() {
  return (
    <ScrollView>
      <GoogleSheetsComponent />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});

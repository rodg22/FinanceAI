import { ScrollView } from "react-native";
import AudioToData from "@/components/AudioToData";
import GoogleUploadData from "@/components/GoogleUploadData";

export default function Data() {
  return (
    <ScrollView className="px-4">
      {/* <GoogleUploadData /> */}
      <AudioToData />
    </ScrollView>
  );
}

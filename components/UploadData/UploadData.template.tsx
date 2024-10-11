import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface UploadDataTemplateProps {
  //   onUpload: () => void;
  isUploading: boolean;
}

const UploadDataTemplate: React.FC<UploadDataTemplateProps> = ({
  isUploading,
}) => {
  return (
    <View className="flex items-center h-[100vh] justify-center">
      <Text className="text-xl font-bold mb-8">Subir Datos</Text>
      <TouchableOpacity
        className="bg-blue-500 p-2 rounded-md"
        // onPress={onUpload}
        // disabled={isUploading}
      >
        <Text>{isUploading ? "Subiendo..." : "Mandar audio"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadDataTemplate;

// return (
//     <LinearGradient
//       colors={["#250152", "#000"]}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 1 }}
//       style={styles.container}
//     >
//       <StatusBar barStyle={"light-content"} />

//       {/* back shadows */}
//       <Image
//         source={require("@/assets/main/blur.png")}
//         style={{
//           position: "absolute",
//           right: scale(-15),
//           top: 0,
//           width: scale(240),
//         }}
//       />
//       <Image
//         source={require("@/assets/main/purple-blur.png")}
//         style={{
//           position: "absolute",
//           left: scale(-15),
//           bottom: verticalScale(100),
//           width: scale(210),
//         }}
//       />

//       {/* Back arrow */}
//       {AIResponse && (
//         <TouchableOpacity
//           style={{
//             position: "absolute",
//             top: verticalScale(50),
//             left: scale(20),
//           }}
//           onPress={() => {
//             setIsRecording(false);
//             setAIResponse(false);
//             setText("");
//           }}
//         >
//           <AntDesign name="arrowleft" size={scale(20)} color="#fff" />
//         </TouchableOpacity>
//       )}

//       <View style={{ marginTop: verticalScale(-40) }}>
//         {loading ? (
//           <TouchableOpacity>
//             <LottieView
//               source={require("@/assets/animations/loading.json")}
//               autoPlay
//               loop
//               speed={1.3}
//               style={{ width: scale(270), height: scale(270) }}
//             />
//           </TouchableOpacity>
//         ) : (
//           <>
//             {!isRecording ? (
//               <>
//                 {AIResponse ? (
//                   <View>
//                     <LottieView
//                       ref={lottieRef}
//                       source={require("@/assets/animations/ai-speaking.json")}
//                       autoPlay={false}
//                       loop={false}
//                       style={{ width: scale(250), height: scale(250) }}
//                     />
//                   </View>
//                 ) : (
//                   <TouchableOpacity
//                     style={{
//                       width: scale(110),
//                       height: scale(110),
//                       backgroundColor: "#fff",
//                       flexDirection: "row",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       borderRadius: scale(100),
//                     }}
//                     onPress={startRecording}
//                   >
//                     <FontAwesome
//                       name="microphone"
//                       size={scale(50)}
//                       color="#2b3356"
//                     />
//                   </TouchableOpacity>
//                 )}
//               </>
//             ) : (
//               <TouchableOpacity onPress={stopRecording}>
//                 <LottieView
//                   source={require("@/assets/animations/animation.json")}
//                   autoPlay
//                   loop
//                   speed={1.3}
//                   style={{ width: scale(250), height: scale(250) }}
//                 />
//               </TouchableOpacity>
//             )}
//           </>
//         )}
//       </View>
//       <View
//         style={{
//           alignItems: "center",
//           width: scale(350),
//           position: "absolute",
//           bottom: verticalScale(90),
//         }}
//       >
//         <Text
//           style={{
//             color: "#fff",
//             fontSize: scale(16),
//             width: scale(269),
//             textAlign: "center",
//             lineHeight: 25,
//           }}
//         >
//           {loading ? "..." : text || "Press the microphone to start recording!"}
//         </Text>
//       </View>
//       {AIResponse && (
//         <View
//           style={{
//             position: "absolute",
//             bottom: verticalScale(40),
//             left: 0,
//             paddingHorizontal: scale(30),
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//             width: scale(360),
//           }}
//         >
//           <TouchableOpacity onPress={() => sendToGpt(text)}>
//             <Regenerate />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => speakText(text)}>
//             <Reload />
//           </TouchableOpacity>
//         </View>
//       )}
//     </LinearGradient>
//   );

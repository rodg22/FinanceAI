module.exports = {
  name: "FinanceIA",
  slug: "financeapp",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/logo-finance.jpg",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    permissions: [
      "INTERNET",
      "android.permission.RECORD_AUDIO",
      "android.permission.MODIFY_AUDIO_SETTINGS",
    ],
    package: "com.rodg22.financeapp",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    "@react-native-google-signin/google-signin",
    [
      "expo-av",
      {
        microphonePermission: "¿Desea que Finance AI acceda a su micrófono?",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: "3b243cc4-66c2-4c9d-b954-ede10e6e59af",
    },
    WEB_CLIENT_ID: process.env.WEB_CLIENT_ID,
    ANDROID_CLIENT_ID: process.env.ANDROID_CLIENT_ID,
    SCOPES: [process.env.SCOPES],
    SPREADSHEET_ID: process.env.SPREADSHEET_ID,
    N8N_AGENT_URL: process.env.N8N_AGENT_URL,
    GET_SPREADSHEET_URL: process.env.GET_SPREADSHEET_URL,
    EDIT_SPREADSHEET_URL: process.env.EDIT_SPREADSHEET_URL,
  },
  owner: "rodg22",
  runtimeVersion: "1.0.0",
  updates: {
    url: "https://u.expo.dev/3b243cc4-66c2-4c9d-b954-ede10e6e59af",
  },
};

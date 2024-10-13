import Constants from "expo-constants";

const WEB_CLIENT_ID = Constants.expoConfig.extra.WEB_CLIENT_ID;
const ANDROID_CLIENT_ID = Constants.expoConfig.extra.ANDROID_CLIENT_ID;
const SCOPES = Constants.expoConfig.extra.SCOPES;
const SPREADSHEET_ID = Constants.expoConfig.extra.SPREADSHEET_ID;
const OPENAI_API_KEY = Constants.expoConfig.extra.OPENAI_API_KEY;

export {
  WEB_CLIENT_ID,
  ANDROID_CLIENT_ID,
  SCOPES,
  SPREADSHEET_ID,
  OPENAI_API_KEY,
};

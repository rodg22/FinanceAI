import Constants from "expo-constants";

const WEB_CLIENT_ID = Constants.expoConfig.extra.WEB_CLIENT_ID;
const ANDROID_CLIENT_ID = Constants.expoConfig.extra.ANDROID_CLIENT_ID;
const SCOPES = Constants.expoConfig.extra.SCOPES;
const SPREADSHEET_ID = Constants.expoConfig.extra.SPREADSHEET_ID;
const N8N_AGENT_URL = Constants.expoConfig.extra.N8N_AGENT_URL;
const GET_SPREADSHEET_URL = Constants.expoConfig.extra.GET_SPREADSHEET_URL;
const EDIT_SPREADSHEET_URL = Constants.expoConfig.extra.EDIT_SPREADSHEET_URL;

export {
  WEB_CLIENT_ID,
  ANDROID_CLIENT_ID,
  SCOPES,
  SPREADSHEET_ID,
  N8N_AGENT_URL,
  GET_SPREADSHEET_URL,
  EDIT_SPREADSHEET_URL,
};

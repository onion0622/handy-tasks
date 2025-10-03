import * as SecureStore from "expo-secure-store";

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string; // el ? indica que es opcional por si el backend a veces lo envía vacío
};

const ACCESS_KEY  = "auth_access_token";
const REFRESH_KEY = "auth_refresh_token";

export const Token = {
  // === getters ===
  getAccess: () => SecureStore.getItemAsync(ACCESS_KEY),
  getRefresh: () => SecureStore.getItemAsync(REFRESH_KEY),

  // === setters ===
  setAccess: (t: string) => SecureStore.setItemAsync(ACCESS_KEY, t),
  setTokens: async ({ accessToken, refreshToken }: AuthTokens) => {
    await SecureStore.setItemAsync(ACCESS_KEY, accessToken);
    if (refreshToken && refreshToken.trim() !== "") {
      await SecureStore.setItemAsync(REFRESH_KEY, refreshToken);
    } else {
      await SecureStore.deleteItemAsync(REFRESH_KEY);
    }
  },

  // === utils ===
  clear: async () => {
    await SecureStore.deleteItemAsync(ACCESS_KEY);
    await SecureStore.deleteItemAsync(REFRESH_KEY);
  },

  isLoggedIn: async () => !!(await SecureStore.getItemAsync(ACCESS_KEY)),
};

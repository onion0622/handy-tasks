// theme/index.ts -- archivo que centraliza los temas para elegir 
import { useColorScheme } from "react-native";
//Constructor de el objeto tema, para poner los datos y los parametros que luego se van a elegir 
type Theme = {
  colors: {
    background: string; 
    surface: string;
    surfaceMuted: string;
    text: string;
    textMuted: string;
    border: string;
    primary: string;
    //tokens semanticos
    success: string; 
    warning: string;
    kpiPositive: string;
    kpiPending: string;
    progressTrack: string;
    progressFill: string;
    cardBg: string;
    cardBorder: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  radii: {
    sm: number;
    md: number;
    lg: number;
    pill: number;
  };
  typography: {
    titleLg: { fontSize: number; fontWeight: any; lineHeight: number };
    kpiNumber: { fontSize: number; fontWeight: any; lineHeight: number };
    subtitle: { fontSize: number; fontWeight: any; lineHeight: number };
    body: { fontSize: number; fontWeight: any; lineHeight: number };
    labelSm: { fontSize: number; fontWeight: any; lineHeight: number };
  };
  layout: {
    screenPadding: number;
    cardPadding: number;
    sectionGap: number;
    itemGap: number;
    progressHeight: number;
  };
};

const light: Theme = {
  colors: {
    background: "#FFFFFF",
    surface: "#F3F4F6",
    surfaceMuted: "#E5E7EB",
    text: "#0B0B0C",
    textMuted: "#6B7280",
    border: "#E5E7EB",
    primary: "#ff2b2bff",
    success: "#22C55E",
    warning: "#F59E0B",
    kpiPositive: "#22C55E",
    kpiPending: "#F59E0B",
    progressTrack: "#E5E7EB",
    progressFill: "#0A84FF",
    cardBg: "#F3F4F6",
    cardBorder: "#E5E7EB",
  },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },
  radii: { sm: 8, md: 12, lg: 16, pill: 999 },
  typography: {
    titleLg: { fontSize: 24, fontWeight: "600", lineHeight: 28 },
    kpiNumber: { fontSize: 36, fontWeight: "800", lineHeight: 44 },
    subtitle: { fontSize: 16, fontWeight: "500", lineHeight: 22 },
    body: { fontSize: 14, fontWeight: "400", lineHeight: 20 },
    labelSm: { fontSize: 12, fontWeight: "500", lineHeight: 16 },
  },
  layout: {
    screenPadding: 16,
    cardPadding: 16,
    sectionGap: 16,
    itemGap: 12,
    progressHeight: 10,
  },
};

const dark: Theme = {
  ...light,
  colors: {
    ...light.colors,
    background: "#0B0B0C",
    surface: "#111214",
    surfaceMuted: "rgba(255,255,255,0.06)",
    text: "#F5F5F5",
    textMuted: "#9CA3AF",
    border: "#1F2937",
    cardBg: "#111214",
    cardBorder: "#1F2937",
  },
};

export const getTheme = (mode: "light" | "dark"): Theme =>
  mode === "dark" ? dark : light;

export const useAppTheme = () => {
  const scheme = useColorScheme();
  return getTheme(scheme === "dark" ? "dark" : "light");
};

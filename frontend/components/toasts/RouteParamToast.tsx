import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "@/components/ui/Toast";

type Props = {
  param: string;            // nombre del query param (ej: "justRegistered")
  message: string;          // texto del toast
  duration?: number;        // ms (default 2500)
};

export default function RouteParamToast({ param, message, duration = 3000 }: Props) {
  const router = useRouter(); 
  const params = useLocalSearchParams();
  const active = params?.[param] === "1";
  const [visible, setVisible] = useState<boolean>(active);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => {
      setVisible(false);
      // limpiar el parámetro para que no reaparezca
      router.setParams({ [param]: undefined as any });
    }, duration);
    return () => clearTimeout(t);
  }, [active, duration, param,]);

  if (!visible) return null;
  return <Toast visible={visible} text={message} />;
}

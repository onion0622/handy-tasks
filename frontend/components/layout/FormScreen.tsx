import { ReactNode } from "react";
import {
  View,
  ViewStyle,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
  contentContainerStyle?: ViewStyle;
  footer?: ReactNode;              // botón/acciones al final (fijo)
  keyboardOffset?: number;         // offset extra (altura de header propio, si aplica)
  centerContent?: boolean;         // centrar verticalmente el form
};

export default function FormScreen({
  children,
  contentContainerStyle,
  footer,
  keyboardOffset = 0,
  centerContent = true,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={insets.top + keyboardOffset}
      >
        <View style={{ flex: 1 }}>
          {/* CONTENIDO SCROLLEABLE (form) */}
          <ScrollView
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
            bounces={false}
            contentContainerStyle={[
              {
                flexGrow: 1,
                padding: 16,
                // deja espacio abajo para que el contenido no quede tapado por el footer fijo
                paddingBottom: 16,
                ...(centerContent ? { justifyContent: "center" } : null),
              },
              contentContainerStyle,
            ]}
          >
            <View style={{ gap: 12 }}>{children}</View>
          </ScrollView>

          {/* FOOTER FIJO (botón) */}
          {footer ? (
            <View
              style={{
                paddingHorizontal: 16,
                paddingTop: 8,
                paddingBottom: insets.bottom + 12,
                backgroundColor: "transparent",
              }}
            >
              {footer}
            </View>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}


/* Explicación 
El objetivo principal de este 


*/ 
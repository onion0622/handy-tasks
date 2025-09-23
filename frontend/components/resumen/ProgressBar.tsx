// componente para la barra de progreso
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { View, Text, Animated, Easing, LayoutChangeEvent } from "react-native";
import { useFocusEffect } from "expo-router"; // re-animar al enfocar la tab
import { useAppTheme } from "../../theme";
import { useTasks } from "../../app/store/tasks";// mocks 

export const ProgressBar: React.FC = () => {
  const theme = useAppTheme();
  const { progressPercent } = useTasks(); //Logica y definiciones por tareas


  // ancho real de la pista para animar en px, animated no maneja %
  // trackea el ancho apenas el <View onLayout={onTrackLayout} se activa - 0 porque no sabemos cual es el valor de la barra
  const [trackWidth, setTrackWidth] = useState(0);
  //crea un valor animable que empieza con 0
  //UseRef (cuando el render no se tiene que volver a renderizar dentro de la pagina)
  //UseState (cuando el render si se vuelve a renderizar dentro de la pagina, cuando el render es variable)
  const anim = useRef(new Animated.Value(0)).current;

  // se usa memo para un recalculo de animaciones entre renders
  // color dinámico y mensaje por % (verde/amarillo/rojo)
  const { barColor, helperText } = useMemo(() => {
    if (progressPercent >= 70) {
      return { barColor: theme.colors.success, helperText: "Opa champion, sos Ivan?" };
    }
    if (progressPercent >= 40) {
      return { barColor: theme.colors.warning, helperText: "Buen ritmo, sigue así" };
    }
    return { barColor: "#EF4444", helperText: "Sos Daza?" }; 
  }, [progressPercent, theme.colors.success, theme.colors.warning]);

  // reanimar cada vez que la pantalla gana foco
  useFocusEffect(
    // callback para que solo haga el re render de la barra
    useCallback(() => {
      anim.setValue(0); // reinicia a 0 para volver a hacer la anim
      Animated.timing(anim, {
        toValue: progressPercent,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
      // no cleanup necesario
    }, [anim, progressPercent])
  );

  // al montar y cuando cambie el % → animar hasta ese valor
  useEffect(() => {
    Animated.timing(anim, {
      toValue: progressPercent,
      duration: 900,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false, // animamos width (layout)
    }).start();
  }, [progressPercent]);
  // ancho animado en píxeles = (trackWidth * anim%) / 100
  const animatedWidth = anim.interpolate({
    inputRange: [0, 100],
    outputRange: [0, trackWidth || 1],
  });

    // justo dentro del componente ProgressBar, antes del return
  const onTrackLayout = (e: LayoutChangeEvent) => {
    setTrackWidth(e.nativeEvent.layout.width);
  };

  //Track (Barra de fondo) -- Fill (relleno) -- Progreso en %
  return (
    <View style={{ marginBottom: theme.layout.sectionGap }}>
      {/* Track */}
      <View
        onLayout={onTrackLayout}
        style={{
          height: theme.layout.progressHeight,
          backgroundColor: theme.colors.progressTrack,
          borderRadius: theme.radii.pill,
          overflow: "hidden",
        }}
      >
        {/* Fill animado */}
        <Animated.View
          style={{
            height: "100%",
            width: animatedWidth,
            backgroundColor: barColor,
            borderRadius: theme.radii.pill,
          }}
        />
      </View>

      {/* Texto: % + mensaje */}
      <Text
        style={{
          marginTop: theme.spacing.xs,
          ...theme.typography.labelSm,
          color: theme.colors.textMuted,
        }}
      >
        {progressPercent}% completado · {helperText}
      </Text>
    </View>
  );
};

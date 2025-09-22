// componente de las cartas de estadisticas
import React, { useEffect, useMemo, useRef } from "react";
import { View, Text, Animated, Easing } from "react-native";
import { Card } from "../ui/Card"; //Este da el componente de la tarjeta
import { useAppTheme } from "../../theme";
import { useTasks } from "../../app/store/tasks"; //Import parametros de los mocks
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";


export const StatsCards: React.FC = () => {
  const theme = useAppTheme();
  const { total, completadas, pendientes } = useTasks(); // Parametros de los mocks

  // 3 animaciones (una por tarjeta)
  const anims = useMemo(
    () => [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)],
    []
  );

  const play = useCallback(() => {
    // reset
    anims.forEach(a => a.setValue(0));
    // fade + slide con escalonamiento (stagger)
    Animated.stagger(
      120,
      anims.map(a =>
        Animated.timing(a, {
          toValue: 1,
          duration: 420,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        })
      )
    ).start();
  }, [anims]);

  // al montar 
  useEffect(() => {
    play();
  }, [play]);

  // cada vez que la pantalla gana foco (volver al tab)
  useFocusEffect(
    useCallback(() => {
      play();
    }, [play])
  );

  // helper para estilo animado
  const styleFor = (a: Animated.Value) => ({
    opacity: a,
    transform: [
      {
        translateY: a.interpolate({
          inputRange: [0, 1],
          outputRange: [14, 0], // sube suave
        }),
      },
      {
        scale: a.interpolate({
          inputRange: [0, 1],
          outputRange: [0.98, 1],
        }),
      },
    ],
  });

    //Contrsuctor de los datos para las tarjetas o cartas 
    const Item: React.FC<{ label: string; value: number; color?: string; index: number }> = ({
        label,
        value,
        color,
        index,
      }) => (
    <Animated.View style={[{ flex: 1 }, styleFor(anims[index])]}>
      <Card variant="elevated" style={{ flex: 1 }}>
        <Text style={{ ...theme.typography.kpiNumber, color: color ?? theme.colors.text }}>
          {value}
        </Text>
        <Text
          style={{
            ...theme.typography.subtitle,
            color: theme.colors.textMuted,
            marginTop: theme.spacing.xs,
          }}
        >
          {label}
        </Text>
      </Card>
    </Animated.View>
  );
  //Vista final y parametrizacion real
  return (
    <View
      style={{
        flexDirection: "row",
        gap: theme.spacing.md,
        marginBottom: theme.layout.sectionGap,
      }}
    >
      <Item index={0} label="Totales" value={total} />
      <Item index={1} label="Completadas" value={completadas} color={theme.colors.kpiPositive} />
      <Item index={2} label="Pendientes" value={pendientes} color={theme.colors.kpiPending} />
    </View>
  );
};

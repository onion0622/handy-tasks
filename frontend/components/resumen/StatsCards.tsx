// componente de las cartas de estadisticas
import React from "react";
import { View, Text } from "react-native";
import { Card } from "../ui/Card"; //Este da el componente de la tarjeta
import { useAppTheme } from "../../theme";
import { useTasks } from "../../app/store/tasks"; //Import parametros de los mocks

export const StatsCards: React.FC = () => {
  const theme = useAppTheme();
  const { total, completadas, pendientes } = useTasks(); // Parametros de los mocks


  //Contrsuctor de los datos para las tarjetas o cartas 
  const Item: React.FC<{ label: string; value: number; color?: string }> = ({
    label,
    value,
    color,
  }) => (
    //Configuracion de las cards del ui
    <Card variant="elevated" style={{ flex: 1 }}>
      <Text
        style={{
          ...theme.typography.kpiNumber,
          color: color ?? theme.colors.text,
        }}
      >
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
      <Item label="Totales" value={total} />
      <Item label="Completadas" value={completadas} color={theme.colors.kpiPositive} />
      <Item label="Pendientes" value={pendientes} color={theme.colors.kpiPending} />
    </View>
  );
};

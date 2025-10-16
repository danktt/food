import { useTheme } from 'heroui-native';
import { Pressable, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AppText } from './app-text';

interface WeeklyCalendarProps {
  currentDate?: Date;
  onDatePress?: (date: Date) => void;
}

export function WeeklyCalendar({ currentDate = new Date(), onDatePress }: WeeklyCalendarProps) {
  const { colors } = useTheme();

  // Função para obter os dias da semana
  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Ajusta para segunda-feira
    startOfWeek.setDate(diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays(currentDate);
  const today = new Date();
  const isToday = (date: Date) =>
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const isCurrentWeek = (date: Date) => {
    const weekStart = weekDays[0];
    const weekEnd = weekDays[6];
    return date >= weekStart && date <= weekEnd;
  };

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const dayNumbers = weekDays.map(day => day.getDate());

  return (
    <Animated.View entering={FadeInDown.duration(400).delay(200)}>
      <View className="bg-surface-2 rounded-xl p-4">
        {/* Header do calendário */}
        <View className="flex-row items-center justify-between mb-4">
          <AppText className="text-lg font-semibold text-foreground">
            Esta Semana
          </AppText>
          <AppText className="text-sm text-muted-foreground">
            {weekDays[0].toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} - {' '}
            {weekDays[6].toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
          </AppText>
        </View>

        {/* Dias da semana */}
        <View className="flex-row justify-between">
          {dayNames.map((dayName, index) => {
            const isCurrentDay = isToday(weekDays[index]);
            const isWeekend = index === 0 || index === 6; // Domingo ou Sábado

            return (
              <Pressable
                key={index}
                onPress={() => onDatePress?.(weekDays[index])}
                className="items-center flex-1"
              >
                <View className="items-center gap-1">
                  {/* Nome do dia */}
                  <AppText
                    className={`text-xs font-medium ${isWeekend ? 'text-muted-foreground' : 'text-foreground'
                      }`}
                  >
                    {dayName}
                  </AppText>

                  {/* Número do dia */}
                  <View
                    className={`w-8 h-8 rounded-full items-center justify-center ${isCurrentDay
                        ? 'bg-accent'
                        : isWeekend
                          ? 'bg-surface-3'
                          : 'bg-background'
                      }`}
                  >
                    <AppText
                      className={`text-sm font-semibold ${isCurrentDay
                          ? 'text-accent-foreground'
                          : isWeekend
                            ? 'text-muted-foreground'
                            : 'text-foreground'
                        }`}
                    >
                      {dayNumbers[index]}
                    </AppText>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Indicador de progresso da semana */}
        <View className="mt-4 pt-3 border-t border-border">
          <View className="flex-row items-center justify-between mb-2">
            <AppText className="text-sm text-muted-foreground">
              Progresso da semana
            </AppText>
            <AppText className="text-sm font-semibold text-foreground">
              {today.getDay() === 0 ? 7 : today.getDay()} / 7
            </AppText>
          </View>
          <View className="h-2 bg-surface-3 rounded-full overflow-hidden">
            <View
              className="h-full bg-accent rounded-full"
              style={{
                width: `${((today.getDay() === 0 ? 7 : today.getDay()) / 7) * 100}%`
              }}
            />
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

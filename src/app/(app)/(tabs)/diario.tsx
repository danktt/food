import { Ionicons } from '@expo/vector-icons';
import { Card, useTheme } from 'heroui-native';
import { View } from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { AppText } from '../../../components/app-text';
import { HeaderWithAvatar } from '../../../components/header-with-avatar';

const AnimatedScrollView = Animated.createAnimatedComponent(Animated.ScrollView);

export default function DiarioScreen() {
  const { colors } = useTheme();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <View className="flex-1 bg-background">
      <HeaderWithAvatar title="Diário" scrollY={scrollY} />

      <AnimatedScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: 100,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={FadeInDown.duration(400)}
          style={{ gap: 24 }}
        >
          {/* Subtitle */}
          <View className="gap-2">
            <AppText className="text-base text-muted-foreground">
              Acompanhe seu dia a dia
            </AppText>
          </View>

          {/* Cards de exemplo */}
          <View className="gap-4">
            <Card>
              <Card.Header>
                <Card.Title>Hoje</Card.Title>
                <Card.Description>
                  {new Date().toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                </Card.Description>
              </Card.Header>
              <Card.Body className="gap-4">
                <View className="flex-row items-center gap-3">
                  <View className="w-12 h-12 rounded-full bg-accent/10 items-center justify-center">
                    <Ionicons name="water-outline" size={24} color={colors.accent} />
                  </View>
                  <View className="flex-1">
                    <AppText className="text-base font-semibold text-foreground">
                      Hidratação
                    </AppText>
                    <AppText className="text-sm text-muted-foreground">
                      0 / 2L hoje
                    </AppText>
                  </View>
                </View>

                <View className="flex-row items-center gap-3">
                  <View className="w-12 h-12 rounded-full bg-green-500/10 items-center justify-center">
                    <Ionicons name="nutrition-outline" size={24} color="#22c55e" />
                  </View>
                  <View className="flex-1">
                    <AppText className="text-base font-semibold text-foreground">
                      Refeições
                    </AppText>
                    <AppText className="text-sm text-muted-foreground">
                      0 / 3 refeições
                    </AppText>
                  </View>
                </View>

                <View className="flex-row items-center gap-3">
                  <View className="w-12 h-12 rounded-full bg-orange-500/10 items-center justify-center">
                    <Ionicons name="barbell-outline" size={24} color="#f97316" />
                  </View>
                  <View className="flex-1">
                    <AppText className="text-base font-semibold text-foreground">
                      Treino
                    </AppText>
                    <AppText className="text-sm text-muted-foreground">
                      Nenhum treino hoje
                    </AppText>
                  </View>
                </View>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <Card.Title>Histórico Recente</Card.Title>
              </Card.Header>
              <Card.Body>
                <AppText className="text-sm text-muted-foreground text-center py-8">
                  Nenhum registro ainda. Comece a adicionar suas atividades!
                </AppText>
              </Card.Body>
            </Card>
          </View>
        </Animated.View>
      </AnimatedScrollView>
    </View>
  );
}


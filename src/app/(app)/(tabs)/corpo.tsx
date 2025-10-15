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

export default function CorpoScreen() {
  const { colors } = useTheme();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <View className="flex-1 bg-background">
      <HeaderWithAvatar title="Corpo" scrollY={scrollY} />

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
          entering={FadeInDown.duration(400).delay(100)}
          style={{ gap: 24 }}
        >
          {/* Subtitle */}
          <View className="gap-2">
            <AppText className="text-base text-muted-foreground">
              Acompanhe suas medidas e progresso
            </AppText>
          </View>

          {/* Card de Medidas */}
          <Card>
            <Card.Header>
              <Card.Title>Medidas Atuais</Card.Title>
              <Card.Description>
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </Card.Description>
            </Card.Header>
            <Card.Body className="gap-4">
              <View className="flex-row items-center justify-between p-3 rounded-lg bg-accent/5">
                <View className="flex-row items-center gap-3">
                  <Ionicons name="speedometer-outline" size={24} color={colors.accent} />
                  <AppText className="text-base font-medium text-foreground">
                    Peso
                  </AppText>
                </View>
                <AppText className="text-lg font-bold text-foreground">
                  -- kg
                </AppText>
              </View>

              <View className="flex-row items-center justify-between p-3 rounded-lg bg-accent/5">
                <View className="flex-row items-center gap-3">
                  <Ionicons name="resize-outline" size={24} color={colors.accent} />
                  <AppText className="text-base font-medium text-foreground">
                    Altura
                  </AppText>
                </View>
                <AppText className="text-lg font-bold text-foreground">
                  -- cm
                </AppText>
              </View>

              <View className="flex-row items-center justify-between p-3 rounded-lg bg-accent/5">
                <View className="flex-row items-center gap-3">
                  <Ionicons name="analytics-outline" size={24} color={colors.accent} />
                  <AppText className="text-base font-medium text-foreground">
                    IMC
                  </AppText>
                </View>
                <AppText className="text-lg font-bold text-foreground">
                  --
                </AppText>
              </View>
            </Card.Body>
          </Card>

          {/* Card de Circunferências */}
          <Card>
            <Card.Header>
              <Card.Title>Circunferências</Card.Title>
            </Card.Header>
            <Card.Body className="gap-3">
              {[
                { label: 'Pescoço', value: '-- cm' },
                { label: 'Tórax', value: '-- cm' },
                { label: 'Cintura', value: '-- cm' },
                { label: 'Quadril', value: '-- cm' },
                { label: 'Braço', value: '-- cm' },
                { label: 'Coxa', value: '-- cm' },
              ].map((item, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between py-2 border-b border-border last:border-b-0"
                >
                  <AppText className="text-base text-foreground">
                    {item.label}
                  </AppText>
                  <AppText className="text-base font-semibold text-muted-foreground">
                    {item.value}
                  </AppText>
                </View>
              ))}
            </Card.Body>
          </Card>

          {/* Card de Progresso */}
          <Card>
            <Card.Header>
              <Card.Title>Progresso</Card.Title>
            </Card.Header>
            <Card.Body>
              <AppText className="text-sm text-muted-foreground text-center py-8">
                Adicione suas medidas para ver seu progresso ao longo do tempo
              </AppText>
            </Card.Body>
          </Card>
        </Animated.View>
      </AnimatedScrollView>
    </View>
  );
}


import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { useRouter, type Href } from 'expo-router';
import { Button, Card, Chip, useTheme } from 'heroui-native';
import type { FC } from 'react';
import { Image, Pressable, View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { AppText } from '../../components/app-text';
import { ScreenScrollView } from '../../components/screen-scroll-view';
import { useAuth } from '../../contexts/auth-context';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

type HomeCardProps = {
  title: string;
  imageLight: string;
  imageDark: string;
  count: number;
  footer: string;
  path: string;
};

const cards: HomeCardProps[] = [
  {
    title: 'Components',
    imageLight:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/home-components-light.png',
    imageDark:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/home-components-dark.png',
    count: 20,
    footer: 'Explore all components',
    path: 'components',
  },
  {
    title: 'Themes',
    imageLight:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/home-themes-light.png',
    imageDark:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/home-themes-dark.png',
    count: 4,
    footer: 'Try different themes',
    path: 'themes',
  },
  {
    title: 'Showcases',
    imageLight:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/home-showcases-light.png',
    imageDark:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/home-showcases-dark-1.png',
    count: 4,
    footer: 'View components in action',
    path: 'showcases',
  },
];

const HomeCard: FC<HomeCardProps & { index: number }> = ({
  title,
  imageLight,
  imageDark,
  count,
  footer,
  path,
  index,
}) => {
  const router = useRouter();

  const { colors, isDark } = useTheme();

  const rLightImageStyle = useAnimatedStyle(() => {
    return {
      opacity: isDark ? 0 : withTiming(0.4),
    };
  });

  const rDarkImageStyle = useAnimatedStyle(() => {
    return {
      opacity: isDark ? withTiming(0.4) : 0,
    };
  });

  return (
    <AnimatedPressable
      entering={FadeInDown.duration(300)
        .delay(index * 100)
        .easing(Easing.out(Easing.ease))}
      onPress={() => router.push(path as Href)}
    >
      <Card className="p-0 rounded-xl">
        <AnimatedView
          entering={FadeIn}
          className="absolute inset-0 w-full h-full"
        >
          <AnimatedImage
            source={{ uri: imageLight }}
            className="absolute inset-0 w-full h-full"
            resizeMode="cover"
            style={rLightImageStyle}
          />
          <AnimatedImage
            source={{ uri: imageDark }}
            className="absolute inset-0 w-full h-full"
            resizeMode="cover"
            style={rDarkImageStyle}
          />
        </AnimatedView>
        <View className="gap-4">
          <Card.Header className="p-3">
            <Chip size="sm" className="bg-background/25">
              <Chip.Label className="text-foreground/85">
                {`${count} total`}
              </Chip.Label>
            </Chip>
          </Card.Header>
          <Card.Body className="h-16" />
          <Card.Footer className="px-3 pb-3 flex-row items-end gap-4">
            <View className="flex-1">
              <Card.Title className="text-2xl text-foreground/85">
                {title}
              </Card.Title>
              <Card.Description className="text-foreground/65 pl-0.5">
                {footer}
              </Card.Description>
            </View>
            <View className="w-9 h-9 rounded-full bg-background/25 items-center justify-center">
              <Feather
                name="arrow-up-right"
                size={20}
                color={colors.foreground}
              />
            </View>
          </Card.Footer>
        </View>
      </Card>
    </AnimatedPressable>
  );
};

export default function App() {
  const { logout } = useAuth();
  const router = useRouter();
  const { colors } = useTheme();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  return (
    <ScreenScrollView>
      <View className="items-center justify-center my-4">
        <AppText className="text-muted-foreground text-base">
          v1.0.0-alpha.15
        </AppText>
      </View>

      <View className="gap-6">
        {cards.map((card, index) => (
          <HomeCard
            key={card.title}
            title={card.title}
            imageLight={card.imageLight}
            imageDark={card.imageDark}
            count={card.count}
            footer={card.footer}
            path={card.path}
            index={index}
          />
        ))}
      </View>

      {/* Botão de Logout */}
      <View className="mt-8 mb-4">
        <Button variant="danger" onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={colors.dangerForeground} />
          <Button.Label>Sair da Conta</Button.Label>
        </Button>
      </View>
    </ScreenScrollView>
  );
}

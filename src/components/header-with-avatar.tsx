import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { Avatar, useTheme } from 'heroui-native';
import { Pressable, View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from './app-text';

interface HeaderWithAvatarProps {
  title: string;
  scrollY?: SharedValue<number>;
}

export function HeaderWithAvatar({ title, scrollY }: HeaderWithAvatarProps) {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const headerStyle = useAnimatedStyle(() => {
    const opacity = scrollY
      ? Math.min(scrollY.value / 60, 1)
      : 0;

    return {
      opacity: withTiming(opacity, { duration: 100 }),
    };
  });

  return (
    <>
      {/* Header com Blur */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
          },
          headerStyle,
        ]}
      >
        <BlurView
          intensity={80}
          tint={isDark ? 'dark' : 'light'}
          style={{
            paddingTop: insets.top + 8,
            paddingBottom: 12,
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: colors.border + '40',
          }}
        >
          <View className="flex-row items-center justify-between">
            <AppText className="text-3xl font-bold text-foreground">
              {title}
            </AppText>
            <Pressable onPress={() => router.push('/(app)/settings')}>
              <Avatar size="sm" alt="User Avatar">
                <Avatar.Image source={{ uri: 'https://github.com/danktt.png' }} />
                <Avatar.Fallback>
                  <AppText className="text-sm font-semibold">U</AppText>
                </Avatar.Fallback>
              </Avatar>
            </Pressable>
          </View>
        </BlurView>
      </Animated.View>

      {/* Header Fixo (sempre visível) */}
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingBottom: 12,
          paddingHorizontal: 20,
        }}
      >
        <View className="flex-row items-center justify-between">
          <AppText className="text-3xl font-bold text-foreground">
            {title}
          </AppText>
          <Pressable onPress={() => router.push('/(app)/settings')}>
            <Avatar size="sm" alt="User Avatar">
              <Avatar.Image source={{ uri: 'https://github.com/danktt.png' }} />
              <Avatar.Fallback>
                <AppText className="text-sm font-semibold">U</AppText>
              </Avatar.Fallback>
            </Avatar>
          </Pressable>
        </View>
      </View>
    </>
  );
}

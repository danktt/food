import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button, Card, useTheme } from 'heroui-native';
import React from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AppText } from '../../components/app-text';
import { ScreenScrollView } from '../../components/screen-scroll-view';
import { useAuth } from '../../contexts/auth-context';

export default function LoginScreen() {
  const { colors, isDark } = useTheme();
  const { login } = useAuth();
  const router = useRouter();

  const handleAppleLogin = () => {
    console.log('Apple login pressed');
    // Implementar lógica de login com Apple aqui
    login();
    router.replace('/(app)/(tabs)/diario');
  };

  const handleGoogleLogin = () => {
    console.log('Google login pressed');
    // Implementar lógica de login com Google aqui
    login();
    router.replace('/(app)/(tabs)/diario');
  };

  const handleEmailLogin = () => {
    console.log('Email login pressed');
    // Implementar lógica de login com Email aqui
    login();
    router.replace('/(app)/(tabs)/diario');
  };

  return (

    <ScreenScrollView contentContainerClassName="justify-center min-h-full">
      <Animated.View
        entering={FadeInDown.duration(500)}
        style={{ gap: 32, paddingHorizontal: 0 }}
      >
        {/* Logo e Header */}
        <View className="items-center gap-3">
          <View className="w-20 h-20 rounded-3xl bg-accent items-center justify-center mb-2">
            <Ionicons name="lock-closed" size={40} color={colors.accentForeground} />
          </View>
          <AppText className="text-3xl font-bold text-foreground">
            Bem-vindo
          </AppText>
          <AppText className="text-base text-muted-foreground text-center px-8">
            Entre com sua conta para continuar
          </AppText>
        </View>

        {/* Card de Login */}
        <Card className="mx-0">
          <Card.Body className="gap-4 p-6">
            {/* Botão Apple */}
            <Button
              variant="primary"
              className="bg-black dark:bg-white"
              onPress={handleAppleLogin}
            >
              <Ionicons
                name="logo-apple"
                size={20}
                color={isDark ? colors.background : '#ffffff'}
              />
              <Button.Label className="text-white dark:text-black font-semibold">
                Continuar com Apple
              </Button.Label>
            </Button>

            {/* Botão Google */}
            <Button
              variant="tertiary"
              className="border-2 border-border"
              onPress={handleGoogleLogin}
            >
              <Ionicons
                name="logo-google"
                size={20}
                color={colors.accentSoftForeground}
              />
              <Button.Label>
                Continuar com Google
              </Button.Label>
            </Button>

            {/* Divider */}
            <View className="flex-row items-center gap-4 my-2">
              <View className="flex-1 h-px bg-border" />
              <AppText className="text-sm text-muted-foreground">
                ou
              </AppText>
              <View className="flex-1 h-px bg-border" />
            </View>

            {/* Botão de Email */}
            <Button variant="secondary" onPress={handleEmailLogin}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={colors.accentSoftForeground}
              />
              <Button.Label className="font-semibold">
                Continuar com Email
              </Button.Label>
            </Button>
          </Card.Body>
        </Card>

        {/* Footer */}
        <View className="items-center gap-2 mt-4">
          <AppText className="text-sm text-muted-foreground text-center">
            Ao continuar, você concorda com nossos
          </AppText>
          <View className="flex-row gap-2">
            <AppText className="text-sm text-accent font-semibold">
              Termos de Uso
            </AppText>
            <AppText className="text-sm text-muted-foreground">
              e
            </AppText>
            <AppText className="text-sm text-accent font-semibold">
              Política de Privacidade
            </AppText>
          </View>
        </View>
      </Animated.View>
    </ScreenScrollView>

  );
}


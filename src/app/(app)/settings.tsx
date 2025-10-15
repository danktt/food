import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Accordion, Avatar, useTheme } from 'heroui-native';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../../components/app-text';
import { ScreenScrollView } from '../../components/screen-scroll-view';
import { useAuth } from '../../contexts/auth-context';

type SettingItem = {
  title: string;
  icon: React.ReactNode;
  onPress?: () => void;
};

const SettingIcon = ({ name }: { name: keyof typeof Ionicons.glyphMap }) => {
  const { colors } = useTheme();
  return <Ionicons name={name} size={16} color={colors.mutedForeground} />;
};

export default function SettingsScreen() {
  const { colors } = useTheme();
  const { logout } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  const settings: SettingItem[] = [
    {
      title: 'Informações do Perfil',
      icon: <SettingIcon name="person-outline" />,
    },
    {
      title: 'Notificações',
      icon: <SettingIcon name="notifications-outline" />,
    },
    {
      title: 'Privacidade',
      icon: <SettingIcon name="lock-closed-outline" />,
    },
    {
      title: 'Idioma',
      icon: <SettingIcon name="language-outline" />,
    },
    {
      title: 'Ajuda e Suporte',
      icon: <SettingIcon name="help-circle-outline" />,
    },
    {
      title: 'Ver Componentes',
      icon: <SettingIcon name="grid-outline" />,
      onPress: () => router.push('/(app)/components'),
    },
    {
      title: 'Sair da Conta',
      icon: <SettingIcon name="log-out-outline" />,
      onPress: handleLogout,
    },
  ];

  return (
    <View className="flex-1 bg-background">
      <ScreenScrollView>
        <View className="h-5" />

        {/* Header */}
        <View className="gap-4 items-center mb-6">
          <Avatar className="w-24 h-24 rounded-full bg-accent items-center justify-center" alt="Avatar">
            <Avatar.Image source={{ uri: 'https://github.com/danktt.png' }} />
            <Avatar.Fallback>
              <AppText className="text-3xl font-bold text-accent-foreground">U</AppText>
            </Avatar.Fallback>
          </Avatar>
          <View className="items-center gap-1">
            <AppText className="text-2xl font-bold text-foreground">
              Danilo Miranda
            </AppText>
            <AppText className="text-base text-muted-foreground">
              danilo@miranda.com
            </AppText>
          </View>
        </View>

        {/* Settings List */}
        <Accordion variant="border" isCollapsible={false}>
          {settings.map((item) => (
            <Accordion.Item key={item.title} value={item.title}>
              <Accordion.Trigger
                className="bg-surface-2"
                onPress={item.onPress}
              >
                <View className="flex-row items-center flex-1 gap-3">
                  {item.icon}
                  <AppText
                    className={`text-base flex-1 ${item.title === 'Sair da Conta'
                      ? 'text-danger'
                      : 'text-foreground'
                      }`}
                  >
                    {item.title}
                  </AppText>
                </View>
                <Accordion.Indicator>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={colors.mutedForeground}
                  />
                </Accordion.Indicator>
              </Accordion.Trigger>
            </Accordion.Item>
          ))}
        </Accordion>
      </ScreenScrollView>
    </View>
  );
}

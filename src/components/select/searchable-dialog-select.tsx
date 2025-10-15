import { LinearGradient } from 'expo-linear-gradient';
import { Button, ScrollShadow, Select, useTheme } from 'heroui-native';
import { useState } from 'react';
import { TextInput, useWindowDimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  KeyboardAvoidingView,
  KeyboardController,
} from 'react-native-keyboard-controller';
import { Easing } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../app-text';
import { SelectBlurBackdrop } from './select-blur-backdrop';

KeyboardController.preload();

type CountryOption = {
  value: string;
  label: string;
  flag: string;
  code: string;
};

const COUNTRIES: CountryOption[] = [
  { value: 'US', label: 'United States', flag: '🇺🇸', code: '+1' },
  { value: 'GB', label: 'United Kingdom', flag: '🇬🇧', code: '+44' },
  { value: 'CA', label: 'Canada', flag: '🇨🇦', code: '+1' },
  { value: 'AU', label: 'Australia', flag: '🇦🇺', code: '+61' },
  { value: 'DE', label: 'Germany', flag: '🇩🇪', code: '+49' },
  { value: 'FR', label: 'France', flag: '🇫🇷', code: '+33' },
  { value: 'JP', label: 'Japan', flag: '🇯🇵', code: '+81' },
  { value: 'CN', label: 'China', flag: '🇨🇳', code: '+86' },
  { value: 'IN', label: 'India', flag: '🇮🇳', code: '+91' },
  { value: 'BR', label: 'Brazil', flag: '🇧🇷', code: '+55' },
];

export function SearchableDialogSelect() {
  const [value, setValue] = useState<CountryOption | undefined>();
  const [searchQuery, setSearchQuery] = useState('');

  const { colors, isDark } = useTheme();
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const insetTop = insets.top + 12;
  const maxDialogHeight = (height - insetTop) / 2;

  const filteredCountries = COUNTRIES.filter((country) =>
    country.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Select
      value={value}
      onValueChange={(newValue) => {
        const country = COUNTRIES.find((c) => c.value === newValue?.value);
        setValue(country);
        setSearchQuery('');
      }}
      closeDelay={300}
    >
      <Select.Trigger asChild>
        <Button variant="tertiary" size="sm" className="min-w-28">
          {value ? (
            <View className="flex-row items-center gap-2">
              <AppText className="text-base">{value.flag}</AppText>
              <AppText className="text-sm text-foreground">
                {value.code}
              </AppText>
            </View>
          ) : (
            <AppText className="text-foreground">Dialog</AppText>
          )}
        </Button>
      </Select.Trigger>
      <Select.Portal
        progressAnimationConfigs={{
          onClose: {
            animationType: 'timing',
            animationConfig: {
              duration: 250,
              easing: Easing.out(Easing.quad),
            },
          },
        }}
      >
        <Select.Overlay className="bg-transparent" isDefaultAnimationDisabled>
          <SelectBlurBackdrop />
        </Select.Overlay>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={24}>
          <Select.Content
            classNames={{
              wrapper: 'justify-center',
              content: 'gap-2 rounded-2xl dark:bg-surface-1',
            }}
            style={{ marginTop: insetTop, height: maxDialogHeight }}
            presentation="dialog"
          >
            <View className="flex-row items-center justify-between mb-2">
              <Select.ListLabel>Country</Select.ListLabel>
              <Select.Close />
            </View>
            <View className="w-full mb-2">
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search country..."
                placeholderTextColor={colors.mutedForeground}
                className="p-3 rounded-md bg-surface-3/60 dark:bg-surface-2 text-foreground"
                autoFocus
              />
            </View>
            <ScrollShadow
              className="flex-1"
              LinearGradientComponent={LinearGradient}
              color={isDark ? colors.surface1 : colors.panel}
            >
              <ScrollView keyboardShouldPersistTaps="handled">
                {filteredCountries.map((country) => (
                  <Select.Item
                    key={country.value}
                    value={country.value}
                    label={country.label}
                    onPress={() => KeyboardController.dismiss()}
                  >
                    <View className="flex-row items-center gap-3 flex-1">
                      <AppText className="text-2xl">{country.flag}</AppText>
                      <AppText className="text-sm text-muted w-10">
                        {country.code}
                      </AppText>
                      <AppText className="text-base text-foreground flex-1">
                        {country.label}
                      </AppText>
                    </View>
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
                {filteredCountries.length === 0 && (
                  <AppText className="text-muted dark:text-muted-foreground text-center mt-8">
                    No countries found
                  </AppText>
                )}
              </ScrollView>
            </ScrollShadow>
          </Select.Content>
        </KeyboardAvoidingView>
      </Select.Portal>
    </Select>
  );
}

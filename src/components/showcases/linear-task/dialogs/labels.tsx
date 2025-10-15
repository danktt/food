import Feather from '@expo/vector-icons/Feather';
import * as Haptics from 'expo-haptics';
import { Checkbox, Chip, Dialog, FormField, useTheme } from 'heroui-native';
import { useMemo, useState, type FC } from 'react';
import { Platform, useWindowDimensions, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../../../app-text';
import { DialogBlurBackdrop } from '../../../dialog-blur-backdrop';
import { DialogHeader } from '../dialog-header';
import { SearchBar } from '../search-bar';

type LabelItem = {
  value: string;
  label: string;
  indicator: React.ReactNode;
};

export const Labels: FC = () => {
  const [selectedValues, setSelectedValues] = useState<Set<string>>(
    new Set(['feature'])
  );
  const [searchQuery, setSearchQuery] = useState('');

  const { colors } = useTheme();

  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const insetTop = insets.top + 12;
  const dialogContentHeight = (height - insetTop) / 2;

  const items: LabelItem[] = useMemo(
    () => [
      {
        value: 'feature',
        label: 'Feature',
        indicator: <View className="size-2.5 rounded-full bg-purple-400" />,
      },
      {
        value: 'bug',
        label: 'Bug',
        indicator: <View className="size-2.5 rounded-full bg-red-400" />,
      },
      {
        value: 'chore',
        label: 'Chore',
        indicator: <View className="size-2.5 rounded-full bg-orange-200" />,
      },
      {
        value: 'improvement',
        label: 'Improvement',
        indicator: <View className="size-2.5 rounded-full bg-blue-400" />,
      },
      {
        value: 'refactor',
        label: 'Refactor',
        indicator: <View className="size-2.5 rounded-full bg-cyan-400" />,
      },
    ],
    []
  );

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;
    return items.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, items]);

  const selectedItems = useMemo(() => {
    return items.filter((item) => selectedValues.has(item.value));
  }, [items, selectedValues]);

  const handleSelectionChange = (value: string, isSelected: boolean) => {
    setSelectedValues((prev) => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet.add(value);
      } else {
        newSet.delete(value);
      }
      return newSet;
    });

    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const renderStackedIndicators = () => {
    if (selectedItems.length === 0) return null;

    const maxVisible = 3;
    const visibleItems = selectedItems.slice(0, maxVisible);

    return (
      <View className="flex-row items-center">
        {visibleItems.map((item, index) => {
          const marginLeft = index === 0 ? 0 : -6;
          const zIndex = maxVisible + index;
          return (
            <View
              key={item.value}
              className="rounded-full border border-surface-2"
              style={{ marginLeft, zIndex }}
            >
              {item.indicator}
            </View>
          );
        })}
      </View>
    );
  };

  const getChipLabel = () => {
    if (selectedItems.length === 0) {
      return 'No labels';
    } else if (selectedItems.length === 1) {
      return selectedItems[0]?.label ?? 'No labels';
    } else {
      return `${selectedItems.length} labels`;
    }
  };

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Chip
          className="h-7 bg-surface-3 px-2"
          onPress={() => {
            if (Platform.OS === 'ios') {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
          }}
        >
          {renderStackedIndicators()}
          <Chip.Label className="text-foreground font-medium">
            {getChipLabel()}
          </Chip.Label>
        </Chip>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay isDefaultAnimationDisabled>
          <DialogBlurBackdrop />
        </Dialog.Overlay>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={24}>
          <Dialog.Content
            className="rounded-2xl border-0"
            style={{ marginTop: insetTop, height: dialogContentHeight }}
          >
            <DialogHeader>Labels</DialogHeader>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Add labels..."
            />
            {filteredItems.length === 0 && (
              <View className="flex-1 items-center justify-center">
                <AppText className="text-base font-medium text-muted-foreground">
                  No results
                </AppText>
              </View>
            )}
            {filteredItems.length > 0 && (
              <ScrollView
                contentContainerClassName="pt-3"
                showsVerticalScrollIndicator={false}
                bounces={false}
                keyboardShouldPersistTaps="handled"
              >
                <View className="gap-7">
                  {filteredItems.map((item) => {
                    const isSelected = selectedValues.has(item.value);
                    return (
                      <FormField
                        key={item.value}
                        isSelected={isSelected}
                        onSelectedChange={(selected) =>
                          handleSelectionChange(item.value, selected)
                        }
                        className="self-stretch"
                      >
                        <FormField.Content className="flex-row items-center gap-2">
                          <View className="w-5 pl-0.5 justify-center">
                            <View className="scale-105">{item.indicator}</View>
                          </View>
                          <FormField.Title>{item.label}</FormField.Title>
                        </FormField.Content>
                        <FormField.Indicator>
                          <Checkbox
                            isSelected={isSelected}
                            colors={{
                              defaultBorder: 'transparent',
                              selectedBorder: 'transparent',
                            }}
                          >
                            <Checkbox.Background
                              colors={{
                                defaultBackground: 'transparent',
                                selectedBackground: 'transparent',
                              }}
                            />
                            <Checkbox.Indicator>
                              {isSelected && (
                                <Animated.View
                                  key={`${item.value}-check`}
                                  entering={FadeIn.duration(200)}
                                >
                                  <Feather
                                    name="check"
                                    size={18}
                                    color={colors.foreground}
                                  />
                                </Animated.View>
                              )}
                            </Checkbox.Indicator>
                          </Checkbox>
                        </FormField.Indicator>
                      </FormField>
                    );
                  })}
                </View>
              </ScrollView>
            )}
          </Dialog.Content>
        </KeyboardAvoidingView>
      </Dialog.Portal>
    </Dialog>
  );
};

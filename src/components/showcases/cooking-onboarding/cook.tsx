import AntDesign from '@expo/vector-icons/AntDesign';
import {
  Button,
  Popover,
  useTheme,
  type PopoverTriggerRef,
} from 'heroui-native';
import { type FC, type RefObject } from 'react';
import { simulatePress } from '../../../helpers/utils/simulate-press';
import { AppText } from '../../app-text';
import { progressAnimationConfigs } from './constants';
import { className } from './styles';

type Props = {
  isOnboardingDone: boolean;
  triggerRef: RefObject<PopoverTriggerRef | null>;
};

export const Cook: FC<Props> = ({ isOnboardingDone, triggerRef }) => {
  const { colors } = useTheme();

  return (
    <Popover>
      <Popover.Trigger ref={triggerRef}>
        <Button
          className="h-12 px-4 rounded-[14px] flex-row items-center gap-1 bg-orange-300"
          onPress={isOnboardingDone ? simulatePress : undefined}
        >
          <AntDesign name="fire" size={16} color="black" />
          <AppText className="text-lg text-black font-semibold">Cook</AppText>
        </Button>
      </Popover.Trigger>
      <Popover.Portal progressAnimationConfigs={progressAnimationConfigs}>
        <Popover.Content className={className.popoverContent} placement="top">
          <Popover.Arrow stroke={colors.foreground} fill={colors.foreground} />
          <AppText className={className.popoverText}>
            Start cooking with step-by-step instructions
          </AppText>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
};

import { FormField, Switch } from 'heroui-native';
import type { FC } from 'react';
import { BlurContainer } from './blur-container';

type Props = {
  isSelected: boolean;
  onSelectedChange: (value: boolean) => void;
};

export const StyledFormField: FC<Props> = ({
  isSelected,
  onSelectedChange,
}) => {
  return (
    <BlurContainer className="mb-8">
      <FormField
        isSelected={isSelected}
        onSelectedChange={onSelectedChange}
        className="h-full px-6"
      >
        <FormField.Content>
          <FormField.Title className="text-gray-50 text-lg font-semibold">
            Enable Free Trial
          </FormField.Title>
        </FormField.Content>
        <FormField.Indicator>
          <Switch />
        </FormField.Indicator>
      </FormField>
    </BlurContainer>
  );
};

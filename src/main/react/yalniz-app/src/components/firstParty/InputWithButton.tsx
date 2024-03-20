import { TextInput, TextInputProps, ActionIcon, useMantineTheme, rem } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import {useState} from "react";

export function InputWithButton({runnableOnSubmit = (input:any) => {}, placeholder = 'Your input'}, props: TextInputProps) {
  const theme = useMantineTheme();
  const [value, setValue] = useState('');

  return (
    <TextInput
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          runnableOnSubmit(value);
        }}
      }
      onSubmit={() => runnableOnSubmit(value)}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      radius="xl"
      size="md"
      placeholder={placeholder}
      rightSectionWidth={42}
      leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
      rightSection={
        <ActionIcon onClick={() => runnableOnSubmit(value)} size={32} radius="xl" color={theme.primaryColor} variant="filled">
          <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        </ActionIcon>
      }
      {...props}
    />
  );
}
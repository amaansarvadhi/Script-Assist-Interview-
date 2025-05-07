import React, { useState, useEffect } from 'react';
import { TextInput, TextInputProps } from '@mantine/core';

type InputProps = TextInputProps & {
  debounceDelay?: number; // Delay for the debounce in milliseconds
  onDebouncedChange: (value: string) => void; // Callback for debounced value change
};

const Input: React.FC<InputProps> = ({
  debounceDelay = 300,
  onDebouncedChange,
  value,
  onChange,
  ...rest
}) => {
  const [localValue, setLocalValue] = useState<any>(value || '');

  useEffect(() => {
    const handler = setTimeout(() => {
      onDebouncedChange(localValue);
    }, debounceDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [localValue, debounceDelay, onDebouncedChange]);

  return (
    <TextInput
      value={localValue}
      onChange={(e) => {
        setLocalValue(e.currentTarget.value);
        if (onChange) {
          onChange(e); // Propagate the raw onChange if provided
        }
      }}
      {...rest} // Pass Mantine props like label, placeholder, etc.
    />
  );
};

export default Input;

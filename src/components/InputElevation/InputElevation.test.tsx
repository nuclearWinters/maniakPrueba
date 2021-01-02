import {InputElevation} from './InputElevation';
import React, {useRef, useState, FC} from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {TextInput} from 'react-native';

const Wrapper: FC = () => {
  const [value, setValue] = useState('');
  const ref = useRef<TextInput>(null);
  return (
    <InputElevation
      iconName="lock"
      placeholder="placeholder"
      value={value}
      ref={ref}
      onChangeText={(text) => {
        setValue(text);
      }}
    />
  );
};

describe('InputElevation component test', () => {
  test('test onChangeText, blur and focus', async () => {
    const component = <Wrapper />;

    const {getByText, getByDisplayValue, getByTestId} = render(component);

    const input = getByDisplayValue('');
    expect(input).toBeTruthy();

    const placeholder = getByText('placeholder');
    expect(placeholder).toBeTruthy();

    const icon = getByTestId('animated_icon');
    expect(icon).toBeTruthy();

    fireEvent(input, 'focus');

    await waitFor(() =>
      expect(input.parent?.parent?.parent?.props.style.elevation).toBe(6),
    );

    fireEvent.changeText(input, 'prueba');

    const inputFilled = getByDisplayValue('prueba');
    expect(inputFilled).toBeTruthy();

    fireEvent(input, 'blur');

    await waitFor(() =>
      expect(input.parent?.parent?.parent?.props.style.elevation).toBe(0),
    );
  });
});

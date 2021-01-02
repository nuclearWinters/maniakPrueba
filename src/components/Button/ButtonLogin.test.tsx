import {ButtonLogin} from './ButtonLogin';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

describe('ButtonLogin component test', () => {
  test('test onPress and props', async () => {
    const onPressEvent = jest.fn();

    const component = <ButtonLogin onPress={onPressEvent} title="title" />;

    const {getByText} = render(component);

    const title = getByText('title');
    expect(title).toBeTruthy();

    expect(title?.parent).toBeTruthy();

    fireEvent.press(title);

    expect(onPressEvent.mock.calls.length).toBe(1);
  });
});

import {BaseButton} from './BaseButton';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

describe('BaseButton component test', () => {
  test('test onPress and props', async () => {
    const onPressEvent = jest.fn();

    const component = (
      <BaseButton
        onPress={onPressEvent}
        title="title"
        containerStyle={{backgroundColor: 'black'}}
        titleStyle={{color: 'black'}}
      />
    );

    const {getByText} = render(component);

    const title = getByText('title');
    expect(title).toBeTruthy();

    expect(title?.parent).toBeTruthy();

    expect(title.parent?.props.style.backgroundColor).toBe('black');
    expect(title.props.style.color).toBe('black');

    fireEvent.press(title);

    expect(onPressEvent.mock.calls.length).toBe(1);
  });
});

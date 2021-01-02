import {NetMessage} from './NetMessage';
import React from 'react';
import {render} from '@testing-library/react-native';

describe('NetMessage component test', () => {
  test('test conection info message', async () => {
    const component = <NetMessage />;

    const {getByText} = render(component);

    const message = getByText('Connection detected');
    expect(message).toBeTruthy();
  });
});

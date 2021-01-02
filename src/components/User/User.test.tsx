import {User} from './User';
import React from 'react';
import {render} from '@testing-library/react-native';

describe('User component test', () => {
  test('testing props being properly rendered', async () => {
    const component = (
      <User title="title" description="description" image="image" />
    );

    const {getByText, getByTestId} = render(component);

    const image = getByTestId('image');
    expect(image).toBeTruthy();

    const title = getByText('title');
    expect(title).toBeTruthy();

    const description = getByText('description');
    expect(description).toBeTruthy();
  });
});

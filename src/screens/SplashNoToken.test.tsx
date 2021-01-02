import {Splash} from './Splash';
import * as React from 'react';
import {Provider} from 'react-redux';
import {render, waitFor} from '@testing-library/react-native';
import {store} from '../redux';

describe('Splash component test', () => {
  test('token is not in AsyncStorage', async () => {
    const component = (
      <Provider store={store}>
        <Splash />
      </Provider>
    );

    render(component);

    await waitFor(() =>
      expect(store.getState().auth).toEqual({
        isLoading: false,
        token: '',
      }),
    );
  });
});

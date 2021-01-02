import {Splash} from './Splash';
import * as React from 'react';
import {Provider} from 'react-redux';
import {render, waitFor} from '@testing-library/react-native';
import {store} from '../redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

describe('Splash component test', () => {
  test('token is in AsyncStorage', async () => {
    await AsyncStorage.setItem('token', 'dummytoken');

    const component = (
      <Provider store={store}>
        <Splash />
      </Provider>
    );

    render(component);

    await waitFor(() => {
      expect(store.getState().auth).toEqual({
        isLoading: false,
        token: 'dummytoken',
      });
    });
  });
});

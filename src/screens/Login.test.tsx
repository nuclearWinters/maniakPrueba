import {Login} from './Login';
import * as React from 'react';
import {Provider} from 'react-redux';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {store} from '../redux';
import {MenuProvider} from 'react-native-popup-menu';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mock = new MockAdapter(axios, {delayResponse: 100});

mock
  .onPost('https://challenge.maniak.co/api/login', {
    username: 'challenge@maniak.co',
    password: 'maniak2020',
  })
  .reply(200, {
    token: 'dummytoken',
  })
  .onAny()
  .reply(500);

describe('Login component test', () => {
  test('token is in storage and reducer', async () => {
    const component = (
      <MenuProvider>
        <Provider store={store}>
          <Login />
        </Provider>
      </MenuProvider>
    );

    const {
      getByText,
      getByDisplayValue,
      findByText,
      queryByText,
      getByTestId,
    } = render(component);

    const icon = getByTestId('user_icon');
    expect(icon).toBeTruthy();

    const welcome = getByText('Welcome Back');
    expect(welcome).toBeTruthy();

    const toContinue = getByText('Sign to continue');
    expect(toContinue).toBeTruthy();

    const email = getByDisplayValue('challenge@maniak.co');
    expect(email).toBeTruthy();

    const password = getByDisplayValue('maniak2020');
    expect(password).toBeTruthy();

    const loginButton = getByText('Login');
    expect(loginButton).toBeTruthy();

    fireEvent.changeText(email, 'challenge@maniak.c');

    fireEvent(loginButton, 'onPress');

    const error = await findByText('Error');
    expect(error).toBeTruthy();

    fireEvent.changeText(email, 'challenge@maniak.co');

    const newError = queryByText('Error');
    expect(newError).toBeNull();

    fireEvent(loginButton, 'onPress');

    await waitFor(() => expect(store.getState().auth.token).toBe('dummytoken'));

    const token = await AsyncStorage.getItem('token');
    expect(token).toBe('dummytoken');
  });
});

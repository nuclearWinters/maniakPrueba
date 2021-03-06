import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {ReduxChild} from '../App';
import {store} from '../src/redux';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {MenuProvider} from 'react-native-popup-menu';
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
  .onGet(
    'https://challenge.maniak.co/api/images',
    undefined,
    expect.objectContaining({
      Authorization: expect.stringMatching(/^Bearer dummytoken/),
    }),
  )
  .reply(200, [
    {
      id: 0,
      title: 'Armando',
      description: 'Programador con 2 años de experiencia',
      image: 'http://lorempixel.com/200/200/',
    },
    {
      id: 1,
      title: 'Fernando',
      description: 'Ingeniero civil con 2 años de experiencia',
      image: 'http://lorempixel.com/200/200/',
    },
    {
      id: 2,
      title: 'Alejandro',
      description: 'Programador junior sin experiencia laboral',
      image: 'http://lorempixel.com/200/200/',
    },
  ])
  .onAny()
  .reply(500);

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('Testing react navigation AppNavigationSplashToLoading', () => {
  test('Testing Splash -> Loading -> Main', async () => {
    await AsyncStorage.setItem('token', 'dummytoken');
    const component = (
      <MenuProvider>
        <Provider store={store}>
          <ReduxChild />
        </Provider>
      </MenuProvider>
    );

    const {findByText} = render(component);

    const loading = await findByText('Loading...');
    expect(loading).toBeTruthy();

    const inbox = await findByText('Inbox');
    expect(inbox).toBeTruthy();
  });
});

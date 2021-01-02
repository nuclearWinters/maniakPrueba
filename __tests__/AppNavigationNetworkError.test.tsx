import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
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
  .reply(500, 'Network Error');

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('Testing react navigation AppNavigationNetworkError', () => {
  test('Testing Splash -> Loading -> Main with token and network error', async () => {
    await AsyncStorage.setItem(
      'images',
      JSON.stringify([
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
      ]),
    );
    await AsyncStorage.setItem('token', 'dummytoken');
    const component = (
      <MenuProvider>
        <Provider store={store}>
          <ReduxChild />
        </Provider>
      </MenuProvider>
    );

    const {
      findByText,
      getByText,
      getAllByTestId,
      getByPlaceholderText,
    } = render(component);

    const loading = await findByText('Loading...');
    expect(loading).toBeTruthy();

    const inbox = await findByText('Inbox');
    expect(inbox).toBeTruthy();

    const firstTitle = getByText('Armando');
    expect(firstTitle).toBeTruthy();

    const firstDescription = getByText('Programador con 2 años de experiencia');
    expect(firstDescription).toBeTruthy();

    const secondTitle = getByText('Fernando');
    expect(secondTitle).toBeTruthy();

    const secondDescription = getByText(
      'Ingeniero civil con 2 años de experiencia',
    );
    expect(secondDescription).toBeTruthy();

    const thirdTitle = getByText('Alejandro');
    expect(thirdTitle).toBeTruthy();

    const thirdDescription = getByText(
      'Programador junior sin experiencia laboral',
    );
    expect(thirdDescription).toBeTruthy();

    const images = getAllByTestId('image');
    expect(images.length).toBe(3);

    const inputSearch = getByPlaceholderText('Search');
    expect(inputSearch).toBeTruthy();

    fireEvent.changeText(inputSearch, 'Armando');

    const imagesFiltered = getAllByTestId('image');
    expect(imagesFiltered.length).toBe(1);
  });
});

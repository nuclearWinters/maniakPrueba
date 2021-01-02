import {Main} from './Main';
import * as React from 'react';
import {Provider} from 'react-redux';
import {render, fireEvent} from '@testing-library/react-native';
import {store} from '../redux';
import {MenuProvider} from 'react-native-popup-menu';
import {SafeAreaProvider, Metrics} from 'react-native-safe-area-context';

const TEST_METRICS_1: Metrics = {
  insets: {top: 1, left: 2, right: 3, bottom: 4},
  frame: {x: 0, y: 0, height: 100, width: 100},
};

describe('Main component test', () => {
  test('testing screen search', async () => {
    store.dispatch({
      type: 'SET_IMAGES',
      payload: [
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
      ],
    });

    const component = (
      <SafeAreaProvider initialMetrics={TEST_METRICS_1}>
        <MenuProvider>
          <Provider store={store}>
            <Main />
          </Provider>
        </MenuProvider>
      </SafeAreaProvider>
    );

    const {getByText, getByPlaceholderText, getAllByTestId} = render(component);

    const inbox = getByText('Inbox');
    expect(inbox).toBeTruthy();

    const search = getByPlaceholderText('Search');
    expect(search).toBeTruthy();

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

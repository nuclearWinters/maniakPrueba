import {HeaderBar} from './HeaderBar';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {store} from '../../redux';
import {MenuProvider} from 'react-native-popup-menu';
import {SafeAreaProvider, Metrics} from 'react-native-safe-area-context';
const TEST_METRICS_1: Metrics = {
  insets: {top: 1, left: 2, right: 3, bottom: 4},
  frame: {x: 0, y: 0, height: 100, width: 100},
};

describe('HeaderBar component test', () => {
  test('testing elements being properly rendered', async () => {
    const component = (
      <SafeAreaProvider initialMetrics={TEST_METRICS_1}>
        <MenuProvider>
          <Provider store={store}>
            <HeaderBar />
          </Provider>
        </MenuProvider>
      </SafeAreaProvider>
    );

    const {getByText, getByTestId} = render(component);

    const inbox = getByText('Inbox');
    expect(inbox).toBeTruthy();

    const ellipsis = getByTestId('ellipsis');
    expect(ellipsis).toBeTruthy();

    fireEvent.press(ellipsis);
  });
});

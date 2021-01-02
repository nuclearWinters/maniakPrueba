import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Login} from './src/screens/Login';
import 'react-native-gesture-handler';
import {
  NavigationContainer,
  CompositeNavigationProp,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {Main} from './src/screens/Main';
import {Provider} from 'react-redux';
import {store, useTypedSelector} from './src/redux';
import {Splash} from './src/screens/Splash';
import {Loading} from './src/screens/Loading';
import {NetMessage} from './src/components/NetMessage/NetMessage';
import {MenuProvider} from 'react-native-popup-menu';

type StackParamList = {
  Login: undefined;
  Logout: undefined;
  Main: undefined;
  Loading: undefined;
};

export type IUseNavigationProp = CompositeNavigationProp<
  StackNavigationProp<StackParamList, 'Login'>,
  StackNavigationProp<StackParamList>
>;

const Stack = createStackNavigator();

export const ReduxChild = () => {
  const token = useTypedSelector((state) => state.auth.token);
  const isLoading = useTypedSelector((state) => state.auth.isLoading);
  const images = useTypedSelector((state) => state.images);
  if (isLoading) {
    return <Splash />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {!token ? (
            <Stack.Screen name="Login" component={Login} />
          ) : images.length === 0 ? (
            <Stack.Screen name="Loading" component={Loading} />
          ) : (
            <Stack.Screen name="Main" component={Main} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

const App = () => {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <Provider store={store}>
          <ReduxChild />
          <NetMessage />
        </Provider>
      </MenuProvider>
    </SafeAreaProvider>
  );
};

export default App;

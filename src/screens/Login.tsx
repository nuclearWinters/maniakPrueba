import React, {FC, useEffect, useState, useRef, useCallback} from 'react';
import {
  Text,
  ViewStyle,
  StatusBar,
  TextInput,
  TextStyle,
  Keyboard,
  KeyboardEvent,
  Animated,
  Platform,
  ActivityIndicator,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {DB} from '../database';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {InputElevation} from '../components/InputElevation/InputElevation';
import {ButtonLogin} from '../components/Button/ButtonLogin';

export const Login: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('challenge@maniak.co');
  const [password, setPassword] = useState('maniak2020');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      const response = await axios.post<{token: string}>(
        'https://challenge.maniak.co/api/login',
        {username: email, password},
      );
      await DB.saveToken(response.data.token);
      dispatch({type: 'SET_TOKEN', payload: response.data.token});
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  const firstInput = useRef<TextInput>(null);
  const secondInput = useRef<TextInput>(null);

  useEffect(() => {
    firstInput.current?.focus();
  }, [firstInput]);

  const onChangeTextUsername = useCallback((text: string) => {
    setEmail(text);
    setError(false);
  }, []);

  const onChangeTextPassword = useCallback((text: string) => {
    setPassword(text);
    setError(false);
  }, []);

  const height = useRef(new Animated.Value(0)).current;

  const _keyboardDidShow = useCallback(
    (event: KeyboardEvent) => {
      Animated.timing(height, {
        toValue: event.endCoordinates.height,
        duration: 400,
        useNativeDriver: false,
      }).start();
    },
    [height],
  );

  const _keyboardDidHide = useCallback(() => {
    Animated.timing(height, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [height]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, [_keyboardDidHide, _keyboardDidShow]);

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="forestgreen" />
        </View>
      )}
      <StatusBar barStyle="dark-content" />
      <Icon
        testID="user_icon"
        name="user-circle"
        size={80}
        color="rgb(220,220,220)"
      />
      <Text style={styles.welcome}>Welcome Back</Text>
      <Text style={styles.sign}>Sign to continue</Text>
      {error && <Text style={styles.error}>Error</Text>}
      <InputElevation
        iconName="envelope"
        ref={firstInput}
        value={email}
        onChangeText={onChangeTextUsername}
        placeholder="EMAIL"
      />
      <InputElevation
        iconName="lock"
        ref={secondInput}
        value={password}
        onChangeText={onChangeTextPassword}
        placeholder="PASSWORD"
      />
      <ButtonLogin onPress={login} title="Login" />
      {Platform.OS === 'ios' && <Animated.View style={{height}} />}
    </SafeAreaView>
  );
};

interface Styles {
  container: ViewStyle;
  welcome: TextStyle;
  sign: TextStyle;
  error: TextStyle;
  loading: ViewStyle;
}

const styles: Styles = {
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {marginTop: 10, fontSize: 24, fontWeight: 'bold'},
  sign: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  error: {
    marginBottom: 10,
    color: 'red',
  },
  loading: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
};

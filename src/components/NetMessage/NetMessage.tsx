import React, {FC, useEffect, useRef, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {Text, Animated, ViewStyle, TextStyle} from 'react-native';

export const NetMessage: FC = () => {
  const previoushasInternet = useRef(true);
  const [hasInternet, setHasInternet] = useState(true);
  const _animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!previoushasInternet.current !== hasInternet) {
      Animated.timing(_animation, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: false,
      }).start();
    } else if (!hasInternet) {
      _animation.setValue(1);
    }
  }, [hasInternet, _animation]);

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      setHasInternet(state.isConnected);
    });
  }, []);

  const height = _animation.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    outputRange: [0, 24, 24, 24, 24, 24],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        {
          height,
        },
        styles.container(hasInternet),
      ]}>
      <Text style={styles.message}>
        {hasInternet ? 'Connection detected' : 'No connection'}
      </Text>
    </Animated.View>
  );
};

const styles: {
  container: (hasInternet: boolean) => ViewStyle;
  message: TextStyle;
} = {
  container: (hasInternet) => ({
    backgroundColor: hasInternet ? 'forestgreen' : 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  message: {color: 'white', textAlign: 'center'},
};

import React, {FC, useEffect} from 'react';
import {View, ViewStyle} from 'react-native';
import {DB} from '../database';
import {AppDispatch} from '../redux';
import {useDispatch} from 'react-redux';

export const Splash: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const getTokenFromStorage = async () => {
      try {
        const token = await DB.getToken();
        dispatch({type: 'SET_TOKEN_FROM_DB', payload: token});
      } catch (e) {
        dispatch({type: 'SET_TOKEN_FROM_DB_FAILED'});
      }
    };
    getTokenFromStorage();
  }, [dispatch]);
  return <View style={styles.container} />;
};

const styles: {
  container: ViewStyle;
} = {container: {backgroundColor: 'white', flex: 1}};

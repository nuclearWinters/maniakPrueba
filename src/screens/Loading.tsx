import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {FC, useEffect} from 'react';
import {Text, ViewStyle, TextStyle, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {AppDispatch, useTypedSelector} from '../redux';
import {IUseNavigationProp} from '../../App';
import {DB} from '../database';

export interface IImage {
  title: string;
  description: string;
  image: string;
  id: number;
}

export const Loading: FC = () => {
  const token = useTypedSelector((state) => state.auth.token);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<IUseNavigationProp>();
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await axios.get<IImage[]>(
          'https://challenge.maniak.co/api/images',
          {
            headers: {Authorization: `Bearer ${token}`},
          },
        );
        await DB.saveImages(response.data);
        dispatch({type: 'SET_IMAGES', payload: response.data});
        navigation.navigate('Main');
      } catch (e) {
        if (e.message === 'Network Error') {
          try {
            const images = await DB.getImages();
            dispatch({type: 'SET_IMAGES', payload: images});
            navigation.navigate('Main');
          } catch (error) {
            await DB.deleteToken();
            dispatch({type: 'DELETE_TOKEN'});
          }
        } else {
          await DB.deleteToken();
          await DB.deleteImages();
          dispatch({type: 'DELETE_TOKEN'});
        }
      }
    };
    fetchAll();
  }, [token, dispatch, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.loading}>Loading...</Text>
      <ActivityIndicator color="forestgreen" size="large" />
    </SafeAreaView>
  );
};

const styles: {container: ViewStyle; loading: TextStyle} = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 10,
  },
};

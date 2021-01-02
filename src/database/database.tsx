import AsyncStorage from '@react-native-async-storage/async-storage';
import {IImage} from '../screens/Loading';

export const DB = {
  saveToken: async (token: string) =>
    new Promise<void>(async (resolve, reject) => {
      try {
        await AsyncStorage.setItem('token', token);
        resolve();
      } catch (e) {
        reject(e);
      }
    }),
  deleteToken: async () =>
    new Promise<void>(async (resolve, reject) => {
      try {
        await AsyncStorage.removeItem('token');
        resolve();
      } catch (e) {
        reject(e);
      }
    }),
  getToken: async () =>
    new Promise<string>(async (resolve, reject) => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('No hay token');
        }
        resolve(token);
      } catch (e) {
        reject(e);
      }
    }),
  saveImages: (images: IImage[]) =>
    new Promise<void>(async (resolve, reject) => {
      try {
        await AsyncStorage.setItem('images', JSON.stringify(images));
        resolve();
      } catch (e) {
        reject(e);
      }
    }),
  deleteImages: async () =>
    new Promise<void>(async (resolve, reject) => {
      try {
        await AsyncStorage.removeItem('images');
        resolve();
      } catch (e) {
        reject(e);
      }
    }),
  getImages: async () =>
    new Promise<IImage[]>(async (resolve, reject) => {
      try {
        const imagenes = await AsyncStorage.getItem('images');
        if (!imagenes) {
          throw new Error('No hay imagenes');
        }
        resolve(JSON.parse(imagenes));
      } catch (e) {
        reject(e);
      }
    }),
};

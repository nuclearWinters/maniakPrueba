import {DB} from './database';
import AsyncStorage from '@react-native-async-storage/async-storage';

describe('Database test', () => {
  test('saveToken works', async () => {
    await DB.saveToken('dummytoken');
    const token = await AsyncStorage.getItem('token');
    expect(token).toBe('dummytoken');
  });
  test('getToken works', async () => {
    const token = await DB.getToken();
    expect(token).toBe('dummytoken');
  });
  test('deleteToken works', async () => {
    await DB.deleteToken();
    const token = await AsyncStorage.getItem('token');
    expect(token).toBe(null);
  });

  test('saveImages works', async () => {
    await DB.saveImages([]);
    const images = await AsyncStorage.getItem('images');
    expect(images).toBe('[]');
  });
  test('getImages works', async () => {
    const images = await DB.getImages();
    expect(images).toEqual([]);
  });
  test('deleteImages works', async () => {
    await DB.deleteImages();
    const images = await AsyncStorage.getItem('images');
    expect(images).toBe(null);
  });
});

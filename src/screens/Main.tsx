import React, {FC, useState} from 'react';
import {
  StatusBar,
  ViewStyle,
  FlatList,
  TextStyle,
  TextInput,
  View,
} from 'react-native';
import {useTypedSelector} from '../redux';
import {User} from '../components/User/User';
import {IImage} from '../screens/Loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import {HeaderBar} from '../components/HeaderBar/HeaderBar';

import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const Main: FC = () => {
  const images = useTypedSelector((state) => state.images);
  const _renderItem = ({item: {image, title, description}}: {item: IImage}) => (
    <User image={image} title={title} description={description} />
  );
  const [value, setValue] = useState('');
  const onChangeTextValue = (text: string) => {
    setValue(text);
  };
  const imagesFiltered = images.filter(
    (image) =>
      image.title.toLowerCase().includes(value.toLowerCase()) ||
      image.description.toLowerCase().includes(value.toLowerCase()),
  );
  const {bottom} = useSafeAreaInsets();
  return (
    <View style={[styles.container, {paddingBottom: bottom}]}>
      <StatusBar barStyle="light-content" backgroundColor="#5b3a5c" />
      <HeaderBar />
      <View style={styles.searchBox}>
        <Icon name="search" style={styles.searchIcon} />
        <TextInput
          placeholderTextColor="#666"
          style={styles.searchTextInput}
          value={value}
          placeholder="Search"
          onChangeText={onChangeTextValue}
        />
      </View>
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0)']}
          style={styles.linearTop}
        />
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          style={styles.linearBottom}
        />
        <FlatList
          bounces={false}
          keyExtractor={(item) => String(item.id)}
          data={imagesFiltered}
          renderItem={_renderItem}
        />
      </View>
    </View>
  );
};

interface Styles {
  container: ViewStyle;
  searchBox: ViewStyle;
  searchIcon: TextStyle;
  searchTextInput: TextStyle;
  linearTop: ViewStyle;
  linearBottom: ViewStyle;
}

const styles: Styles = {
  container: {backgroundColor: 'white', flex: 1},
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(220,220,220)',
  },
  searchIcon: {
    color: '#999',
    fontSize: 26,
    marginLeft: 20,
  },
  searchTextInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 22,
    paddingVertical: 10,
  },
  linearTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 20,
    zIndex: 10,
  },
  linearBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    zIndex: 10,
  },
};

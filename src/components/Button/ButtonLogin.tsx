import React, {FC} from 'react';
import {TextStyle, ViewStyle, Dimensions} from 'react-native';
import {BaseButton} from './BaseButton';

const {width} = Dimensions.get('screen');

interface IProps {
  onPress: () => void;
  title: string;
}

export const ButtonLogin: FC<IProps> = ({onPress, title}) => {
  return (
    <BaseButton
      onPress={onPress}
      title={title}
      containerStyle={styles.container}
      titleStyle={styles.title}
    />
  );
};

const styles: {container: ViewStyle; title: TextStyle} = {
  container: {
    borderRadius: 2,
    width: width - 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#13ab62',
    height: 40,
    marginTop: 20,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
  },
};

import React, {FC} from 'react';
import {TouchableOpacity, Text, ViewStyle, TextStyle} from 'react-native';

interface IProps {
  onPress: () => void;
  title: string;
  containerStyle: ViewStyle;
  titleStyle: TextStyle;
}

export const BaseButton: FC<IProps> = ({
  onPress,
  title,
  containerStyle,
  titleStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Text style={titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

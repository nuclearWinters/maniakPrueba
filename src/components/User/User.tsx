import React, {FC} from 'react';
import {
  View,
  Image,
  Text,
  ViewStyle,
  TextStyle,
  Dimensions,
  ImageStyle,
} from 'react-native';
const {width} = Dimensions.get('screen');

interface IProps {
  image: string;
  title: string;
  description: string;
}

export const User: FC<IProps> = React.memo(({image, title, description}) => {
  return (
    <View style={styles.container}>
      <Image testID="image" source={{uri: image}} style={styles.image} />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.description}>
          {description}
        </Text>
      </View>
    </View>
  );
});

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  description: TextStyle;
  image: ImageStyle;
}

const styles: Styles = {
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    backgroundColor: 'white',
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    width: width - 100,
    paddingRight: 20,
  },
  image: {
    height: 80,
    width: 80,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 100,
  },
};

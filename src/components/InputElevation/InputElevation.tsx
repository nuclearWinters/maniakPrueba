import React, {useState, useEffect, useRef, forwardRef} from 'react';
import {
  View,
  Animated,
  TextInput,
  Dimensions,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width} = Dimensions.get('screen');

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

interface IProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  iconName: string;
}

const InputElevationComponent: React.ForwardRefRenderFunction<
  TextInput,
  IProps
> = ({value, onChangeText, placeholder, iconName}, ref) => {
  const _animation = useRef(new Animated.Value(0)).current;
  const [onFocus, setOnFocus] = useState(false);

  useEffect(() => {
    Animated.timing(_animation, {
      toValue: onFocus ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [onFocus, _animation]);

  const elevation = _animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 6],
  });

  const shadowOpacity = _animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.2],
  });

  const backgroundColor = _animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.0)'],
  });

  const color = _animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#666', '#13ab62'],
  });

  return (
    <Animated.View style={[styles.container, {elevation, shadowOpacity}]}>
      <Animated.Text style={[styles.placeholder, {color}]}>
        {placeholder}
      </Animated.Text>
      <View style={styles.iconInputBox}>
        <View style={styles.iconBox}>
          <AnimatedIcon
            testID="animated_icon"
            name={iconName}
            size={22}
            style={{color}}
          />
        </View>
        <TextInput
          ref={ref}
          onFocus={() => {
            setOnFocus(true);
          }}
          onBlur={() => {
            setOnFocus(false);
          }}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
        />
        <Animated.View
          style={[
            styles.line,
            {
              backgroundColor,
            },
          ]}
        />
      </View>
    </Animated.View>
  );
};

const InputElevationRef = forwardRef<TextInput, IProps>(
  InputElevationComponent,
);

export const InputElevation = React.memo(InputElevationRef);

interface Styles {
  container: ViewStyle;
  placeholder: TextStyle;
  iconInputBox: ViewStyle;
  input: TextStyle;
  line: ViewStyle;
  iconBox: ViewStyle;
}

const styles: Styles = {
  container: {
    width: width - 80,
    borderRadius: 6,
    backgroundColor: 'white',
    paddingTop: 6,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
  },
  placeholder: {
    marginLeft: 30,
    fontWeight: 'bold',
    fontSize: 12,
    color: '#666',
  },
  iconInputBox: {flexDirection: 'row', alignItems: 'center', paddingLeft: 10},
  input: {
    paddingLeft: 10,
    flex: 1,
    fontWeight: 'bold',
    color: '#666',
    paddingVertical: 12,
  },
  line: {
    position: 'absolute',
    height: 1,
    bottom: 0,
    left: 5,
    right: 5,
  },
  iconBox: {width: 30, alignItems: 'center'},
};

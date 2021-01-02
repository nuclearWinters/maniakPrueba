import React, {FC} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  Dimensions,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {DB} from '../../database';
import {AppDispatch} from '../../redux';
const {width} = Dimensions.get('screen');

export const HeaderBar: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const logout = async () => {
    await DB.deleteToken();
    await DB.deleteImages();
    dispatch({type: 'DELETE_TOKEN'});
  };

  const {top} = useSafeAreaInsets();

  return (
    <View style={[styles.headerBar, {height: 60 + top}]}>
      <View style={styles.popup}>
        <Menu>
          <MenuTrigger
            customStyles={{
              TriggerTouchableComponent: TouchableOpacity,
              triggerTouchable: {
                testID: 'ellipsis',
                style: {alignItems: 'center', justifyContent: 'center'},
              },
            }}>
            <Icon name="ellipsis-v" style={styles.ellipsis} />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={styles.menuOptions}>
            <MenuOption
              onSelect={logout}
              customStyles={{
                optionTouchable: {testID: 'Logout'},
              }}>
              <Text style={styles.logout}>Logout</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
      <Text style={[styles.inbox, {paddingTop: top}]}>Inbox</Text>
    </View>
  );
};

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  description: TextStyle;
  headerBar: ViewStyle;
  popup: ViewStyle;
  ellipsis: TextStyle;
  inbox: TextStyle;
  logout: TextStyle;
  menuOptions: ViewStyle;
}

const styles: Styles = {
  container: {backgroundColor: 'white', flex: 1},
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    width: width - 100,
  },
  headerBar: {
    height: 60,
    width: '100%',
    backgroundColor: '#5b3a5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popup: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 50,
  },
  ellipsis: {
    color: 'rgb(220,220,220)',
    fontSize: 26,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  inbox: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: 0.4,
  },
  logout: {
    fontSize: 20,
    paddingLeft: 10,
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  menuOptions: {
    marginTop: 50,
  },
};

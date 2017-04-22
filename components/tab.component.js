import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from '../styles/styles';

const TabComponent = props => {
  const routes = props.navigator.getCurrentRoutes();
  return (
    <View style={props.tab === 'create' ? styles.tabBar1 : styles.tabBar2}>
      <Icon
        color={props.tab === 'feed' ? 'black' : '#5e6977'}
        name='list'
        onPress={() => props.navigator.jumpTo(routes[2])}
        size={33}
        underlayColor='transparent' />
      <Icon
        color={props.tab === 'create' ? 'transparent' : '#5e6977'}
        name='add-circle-outline'
        onPress={() => props.tab === 'create' ? null : props.navigator.jumpTo(routes[1])}
        size={33}
        underlayColor='transparent' />
      <Icon
        color={props.tab === 'profile' ? 'black' : '#5e6977'}
        name='person'
        onPress={() => props.navigator.jumpTo(routes[0])}
        size={33}
        underlayColor='transparent' />
    </View>
  );
}

export default TabComponent;
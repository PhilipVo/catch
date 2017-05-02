import React from 'react';
import { StatusBar, TouchableHighlight, View } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from '../styles/styles';

const TabComponent = props => {
  const routes = props.mainNavigator.getCurrentRoutes();
  return (
    <View style={props.tab === 'create' ? styles.tab1 : styles.tab2}>
      <StatusBar hidden={props.hideStatusBar} />
      <Icon
        color={props.tab === 'feed' ? 'black' : 'gray'}
        name='list'
        onPress={() => {
          props.mainNavigator.jumpTo(routes[2])
        }}
        size={33}
        underlayColor='transparent' />
      <Icon
        color={props.tab === 'create' ? 'transparent' : 'gray'}
        name='add-circle-outline'
        onPress={() => props.tab === 'create' ?
          null : props.mainNavigator.jumpTo(routes[1])}
        size={33}
        underlayColor='transparent' />
      <Icon
        color={props.tab === 'account' ? 'black' : 'gray'}
        name='person'
        onPress={() => {
          props.mainNavigator.jumpTo(routes[0])
        }}
        size={33}
        underlayColor='transparent' />
    </View>
  );
}

export default TabComponent;
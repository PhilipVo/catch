import React from 'react';
import { StatusBar, StyleSheet, TouchableHighlight, View } from 'react-native';
import { Icon } from 'react-native-elements';

const TabComponent = props => {
  const routes = props.navigator.getCurrentRoutes();
  return (
    <View style={props.tab === 'create' ? styles.tab1 : styles.tab2}>
      <StatusBar hidden={props.hideStatusBar} />
      <Icon
        color={props.tab === 'feed' ? 'black' : 'gray'}
        name='list'
        onPress={() => {
          props.navigator.jumpTo(routes[2])
        }}
        size={33}
        underlayColor='transparent' />
      <Icon
        color={props.tab === 'create' ? 'transparent' : 'gray'}
        name='add-circle-outline'
        onPress={() => props.tab === 'create' ?
          null : props.navigator.jumpTo(routes[1])}
        size={33}
        underlayColor='transparent' />
      <Icon
        color={props.tab === 'account' ? 'black' : 'gray'}
        name='person'
        onPress={() => {
          props.navigator.jumpTo(routes[0])
        }}
        size={33}
        underlayColor='transparent' />
    </View>
  );
}

const styles = {
  tab1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tab2: {
    backgroundColor: 'floralwhite',
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
};

export default TabComponent;
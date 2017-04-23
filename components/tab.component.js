import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from '../styles/styles';

const TabComponent = props => {
  const routes = props.navigator.getCurrentRoutes();
  return (
    <View style={props.tab === 'create' ? styles.tabBar1 : styles.tabBar2}>
      <Icon
        color={props.tab === 'feed' ? 'black' : 'gray'}
        name='list'
        onPress={() => {
          console.log(routes)
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
        color={props.tab === 'profile' ? 'black' : 'gray'}
        name='person'
        onPress={() => {
          console.log(routes)
          props.navigator.jumpTo(routes[0])
        }
        }
        size={33}
        underlayColor='transparent' />
    </View>
  );
}

export default TabComponent;
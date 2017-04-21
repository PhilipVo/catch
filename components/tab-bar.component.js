import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from '../services/styles.service';

const TabBarComponent = props => {
  const routes = props.navigator.getCurrentRoutes();
  console.log(routes)
  return (
    props.tab === 'create' ?
      <View style={styles.footer}>
        <Icon
          color={'#5e6977'}
          name='list'
          onPress={() => props.navigator.jumpTo(routes[2])}
          size={33}
          underlayColor='transparent' />
        <TouchableHighlight style={{ bottom: 50 }} underlayColor='transparent' onPress={props.capture}>
          <View style={styles.cameraWhiteCircle} />
        </TouchableHighlight>
        <Icon
          color={'#5e6977'}
          name='person'
          onPress={() => props.navigator.jumpTo(routes[0])}
          size={33}
          underlayColor='transparent' />
      </View> :
      <View style={styles.footer}>
        <Icon
          color={props.tab === 'feed' ? '#6296f9' : '#5e6977'}
          name='list'
          onPress={() => props.navigator.jumpTo(routes[2])}
          size={33}
          underlayColor='transparent' />
        <Icon
          color={props.tab === 'create' ? '#6296f9' : '#5e6977'}
          name='add-circle-outline'
          onPress={() => props.navigator.jumpTo(routes[1])}
          size={33}
          underlayColor='transparent' />
        <Icon
          color={props.tab === 'profile' ? '#6296f9' : '#5e6977'}
          name='person'
          onPress={() => props.navigator.jumpTo(routes[0])}
          size={33}
          underlayColor='transparent' />
      </View>
  );
}

export default TabBarComponent;
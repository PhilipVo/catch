import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';

const TabComponent = props => {
  return (
    <View style={props.tab === 'camera' ? styles.tab1 : styles.tab2}>
      <Icon
        color={props.tab === 'feed' ? 'black' : 'gray'}
        name='calendar'
        onPress={() => {
          if (props.tab === 'feed') props.reset();
          else props.navigate('FeedNavigatorComponent');
        }}
        size={30}
        type='simple-line-icon'
        underlayColor='transparent' />
      <Icon
        color={props.tab === 'camera' ? 'transparent' : 'gray'}
        name='plus'
        onPress={() => { props.navigate('CameraComponent') }}
        size={30}
        type='simple-line-icon'
        underlayColor='transparent' />
      <Icon
        color={props.tab === 'account' ? 'black' : 'gray'}
        name='user'
        onPress={() => {
          if (props.tab === 'account') props.reset();
          else props.navigate('AccountNavigatorComponent')
        }}
        size={30}
        type='simple-line-icon'
        underlayColor='transparent' />
    </View>
  );
}

const styles = StyleSheet.create({
  tab1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tab2: {
    backgroundColor: '#F9F9F9',
    borderTopColor: 'black',
    borderTopWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

export default TabComponent;
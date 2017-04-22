import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { h4, Icon, Text } from 'react-native-elements';

import styles from '../styles/styles'

import user from './sample-user';

export default class UserComponent extends Component {
  componentDidMount() {
    console.log('mounted user');
  }

  componentWillUnMount() {
    console.log('unmounted user')
  }

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.avatarView}>
          <Image style={styles.avatarImage}
            source={{ uri: user.img }} />
        </View>
        <View style={styles.userView}>
          <Text style={styles.username} > {user.username}</Text>
          <View style={styles.paddingTopBottom}>
            <View style={styles.userCounts}>
              <Text style={{ fontSize: 16 }}>{user.friends}</Text>
              <Text style={{ fontSize: 16 }}>{user.events}</Text>
            </View>
            <View style={styles.userCounts}>
              <Text style={{ fontSize: 10 }}>Friends</Text>
              <Text style={{ fontSize: 10 }}>Events</Text>
            </View>
          </View>
          <Text style={styles.tag}>{user.tag}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Icon
            color='#5e6977'
            name='settings'
            onPress={() => { }}
            size={30}
            underlayColor='transparent' />
        </View>
      </View >
    );
  }
}
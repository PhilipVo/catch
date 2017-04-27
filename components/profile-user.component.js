import React, { Component } from 'react';
import { Image, TouchableHighlight, View } from 'react-native';
import { h4, Icon, Text } from 'react-native-elements';

import styles from '../styles/styles'

import user from '../samples/user';

export default class ProfileUserComponent extends Component {
  componentDidMount() {
    console.log('mounted user');
  }

  componentWillUnMount() {
    console.log('unmounted user')
  }

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View
          style={styles.profileUserView}>
          <TouchableHighlight
            TouchableHighlight
            underlayColor='transparent'
            onPress={() => this.props.setView('picture')}>
            <Image source={{ uri: user.img }} style={styles.profileUserImage} />
          </TouchableHighlight>
        </View>
        <View style={styles.userView}>
          <Text style={styles.username} > {user.username}</Text>
          <View style={{ paddingVertical: 10 }} >
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
            color='gray'
            name='settings'
            onPress={() => this.props.setView('settings')}
            size={30}
            underlayColor='transparent' />
        </View>
      </View >
    );
  }
}
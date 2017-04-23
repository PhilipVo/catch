import React, { Component } from 'react';
import { Image, TouchableHighlight, View } from 'react-native';
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
        <View
          style={styles.avatarView}>
          <TouchableHighlight
            TouchableHighlight
            underlayColor='transparent'
            onPress={() => {
              {/*this.props.navigator.jumpTo(this.props.navigator.getCurrentRoutes()[2])*/ }
              this.props.navigator.push({ component: 'AvatarComponent' })
            }}>
            <Image source={{ uri: user.img }} style={styles.avatarImage} />
          </TouchableHighlight>
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
            color='gray'
            name='settings'
            onPress={() => { }}
            size={30}
            underlayColor='transparent' />
        </View>
      </View >
    );
  }
}
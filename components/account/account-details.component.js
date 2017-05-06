import React, { Component } from 'react';
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import { h4, Icon, Text } from 'react-native-elements';

import user from '../../samples/user';

export default class AccountDetailsComponent extends Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View
          style={styles.avatarView}>
          <TouchableHighlight
            TouchableHighlight
            underlayColor='transparent'
            onPress={() => this.props.accountNavigator.push({component: 'AccountPictureComponent'})}>
            <Image source={{ uri: user.img }} style={styles.avatarImage} />
          </TouchableHighlight>
        </View>
        <View style={styles.view}>
          <Text style={styles.username} > {user.username}</Text>
          <View style={{ paddingVertical: 10 }} >
            <View style={styles.count}>
              <Text style={{ fontSize: 16 }}>{user.friends}</Text>
              <Text style={{ fontSize: 16 }}>{user.events}</Text>
            </View>
            <View style={styles.count}>
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
            onPress={() => this.props.accountNavigator.push({component: 'AccountSettingsComponent'})}
            size={30}
            underlayColor='transparent' />
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  avatarView: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center'
  },
  avatarImage: {
    borderRadius: 30,
    height: 60,
    width: 60
  },
  count: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tag: {
    fontSize: 12,
    textAlign: 'center'
  },
  username: {
    fontSize: 22,
    textAlign: 'center'
  },
  view: {
    flex: 3,
    justifyContent: 'center',
    paddingVertical: 10
  }
});
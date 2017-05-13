////////////////////////////////////////////////////////////
//                ProfileDetailsComponent
//  Top portion of user's profile component, containing the
//  user's details such as their avatar, number of friends 
//  and events, and tagline.
//  
//  Required props: goBack, user
////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

export default class ProfileDetailsComponent extends Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.avatarView}>
          <Icon
            name='angle-left'
            onPress={() => this.props.goBack()}
            size={33}
            style={{ alignSelf: 'flex-start', marginTop: -15, paddingLeft: 15 }}
            type='font-awesome'
            underlayColor='transparent' />
          <Image source={{ uri: this.props.user.img }} style={styles.avatarImage} />
        </View>
        <View style={styles.view}>
          <Text style={styles.username} > {this.props.user.username}</Text>
          <View style={{ paddingVertical: 10 }} >
            <View style={styles.count}>
              <Text style={{ fontSize: 16 }}>{this.props.user.friends}</Text>
              <Text style={{ fontSize: 16 }}>{this.props.user.events}</Text>
            </View>
            <View style={styles.count}>
              <Text style={{ fontSize: 10 }}>Friends</Text>
              <Text style={{ fontSize: 10 }}>Events</Text>
            </View>
          </View>
          <Text style={styles.tag}>{this.props.user.tag}</Text>
        </View>
        <View style={{ flex: 1 }} />
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
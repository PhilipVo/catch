////////////////////////////////////////////////////////////
//                ProfileDetailsComponent
//  Top portion of user's profile component, containing the
//  user's details such as their avatar, number of friends 
//  and events, and tagline.
//  
//                Required props
//  goBack: function to unmount component
//  user: JSON object containing user's details
////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

import http from '../../services/http.service';
import session from '../../services/session.service';

export default class ProfileDetailsComponent extends Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>

        <View style={styles.avatarView}>
          <Icon
            name='keyboard-arrow-left'
            onPress={() => this.props.goBack()}
            size={40}
            style={styles.angleLeft}
            underlayColor='transparent' />
          <Image
            source={{ uri: `${http.s3}/users/${this.props.user.username}` }}
            style={styles.avatarImage} />
        </View>

        <View style={styles.view}>
          <Text style={styles.username} > {this.props.user.username}</Text>
          {
            this.props.user.username === session.username ? null :
              <TouchableHighlight
                onPress={() => { }}
                style={styles.addContact}
                underlayColor='transparent' >
                {
                  this.props.user.isContact ?
                    <View style={styles.addContactView}>
                      <Text style={{ fontSize: 12 }}>Following</Text>
                    </View> :
                    <View style={styles.addContactView}>
                      <Text style={{ fontSize: 12 }}>Add Contact</Text>
                      <Icon name='add' size={15} />
                    </View>
                }
              </TouchableHighlight>
          }
          <View style={styles.count}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 16 }}>{this.props.user.contacts}</Text>
              <Text style={{ fontSize: 10 }}>Friends</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 16 }}>{this.props.events}</Text>
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
  addContact: {
    alignSelf: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: 'gray',
    marginTop: 5,
    padding: 5
  },
  addContactView: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  angleLeft: {
    alignSelf: 'flex-start',
    paddingLeft: 5
  },
  avatarView: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'flex-start'
  },
  avatarImage: {
    borderRadius: 30,
    height: 60,
    width: 60
  },
  count: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5
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
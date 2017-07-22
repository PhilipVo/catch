import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

import http from '../../services/http.service';
import session from '../../services/session.service';
import socket from '../../services/socket.service';

export default class ProfileDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  toggleContact = () => {
    if (!this.state.loading) {
      this.setState({ loading: true });
      if (this.props.user.isContact) {
        http.delete(`/api/contacts/${this.props.user.username}`)
          .then(() => {
            this.props.user.isContact = false;
            this.setState({ loading: false });
          }).catch(error => {
            this.setState({ loading: false });
            Alert.alert('Error', typeof error === 'string' ? error : 'Oops, something went wrong.');
          });
      } else {
        http.post('/api/contacts', JSON.stringify({ contact: this.props.user.username }))
          .then(() => {
            this.props.user.isContact = true;
            this.setState({ loading: false });
            socket.emit('contacted', { contact: this.props.user.username, username: session.username });
          }).catch(error => {
            this.setState({ loading: false });
            Alert.alert('Error', typeof error === 'string' ? error : 'Oops, something went wrong.');
          });
      }
    }
  }

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
            this.state.loading ? <ActivityIndicator style={styles.indicator} /> :
              this.props.user.username != session.username &&
              <TouchableHighlight
                onPress={this.toggleContact}
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
            <TouchableHighlight
              onPress={() => this.props.setEvent('friends', this.props.user.username)}
              underlayColor='transparent'>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 16 }}>{this.props.user.contacts}</Text>
                <Text style={{ fontSize: 10 }}>Friends</Text>
              </View>
            </TouchableHighlight>
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
    borderWidth: 1,
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
  indicator: {
    alignSelf: 'center',
    marginTop: 5
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
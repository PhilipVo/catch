import React, { Component } from 'react';
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';

import http from '../../services/http.service';
import session from '../../services/session.service';

export default class AccountDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { uri: `${http.s3}/users/${session.username}` };
  }

  refreshImage = () => {
    this.setState({ uri: null });
    this.setState({ uri: `${http.s3}/users/${session.username}` });
  }

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.avatarView}>
          {
            this.state.uri &&
            <TouchableHighlight
              underlayColor='transparent'
              onPress={() => this.props.navigate('AccountPictureComponent',
                { refreshImage: this.refreshImage })}>
              <Image
                source={{
                  cache: 'reload',
                  uri: this.state.uri
                }}
                style={styles.avatarImage} />
            </TouchableHighlight>
          }
        </View>
        <View style={styles.view}>
          <Text style={styles.username}>{session.username}</Text>
          <View style={{ paddingVertical: 10 }} >
            <View style={styles.count}>
              <TouchableHighlight
                onPress={() => this.props.navigate('AccountFriendsComponent')}
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
          </View>
          <Text style={styles.tag}>{this.props.user.tag}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Icon
            color='gray'
            name='settings'
            onPress={() => this.props.navigate('AccountSettingsComponent',
              {
                getMyInfo: this.props.getMyInfo,
                refreshImage: this.refreshImage
              })
            }
            size={30}
            type='simple-line-icon'
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
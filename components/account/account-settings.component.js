import React, { Component } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

import http from '../../services/http.service';
import session from '../../services/session.service';

export default class AccountSettingsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordError: null,
      passwords: {
        confirm: '',
        new: '',
        old: ''
      },
      saving: false,
      user: {
        email: '',
        tag: ''
      }
    }
  }

  changePassword = () => {

  }

  save = () => {

  }

  componentDidMount() {
    http.get('/api/get-my-settings')
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        {/* Header */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Icon
              name='angle-left'
              onPress={() => this.props.navigation.goBack()}
              size={40}
              type='font-awesome'
              undelayColor='transparent' />
          </View>
          <View style={{ flex: 10 }}>
            <Text style={styles.text}>Settings</Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>

        {/* Body */}
        <View style={styles.body}>

          {/* Picture */}
          <TouchableHighlight
            onPress={() => { }}
            style={styles.pictureContainer}
            underlayColor='transparent'>
            <Image source={{ uri: `${http.s3}/users/${session.username}` }} style={styles.picture} />
          </TouchableHighlight>
          <Text style={{ textAlign: 'center' }}>{session.username}</Text>

          {/* Email */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>Email</Text>
            <View style={styles.inputView}>
              <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                onChangeText={email => this.state.user.email = email}
                style={styles.inputText}
                value={this.state.user.email} />
            </View>

          </View>

          {/* Tag */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>Tagline</Text>
            <View style={styles.inputView}>
              <TextInput
                autoCapitalize='sentences'
                autoCorrect={true}
                onChangeText={tag => this.state.user.tag = tag}
                style={styles.inputText}
                value={this.state.user.tag} />
            </View>
          </View>

          {/* Picture */}
          <Text style={styles.text0}>Change Profile Picture</Text>

          {/* Password */}
          <Text style={styles.text1}>Change Password</Text>

          {/* Logout */}
          <Text
            onPress={() => {
              session.logout();
              this.props.screenProps.logout();
            }}
            style={styles.text1}>Logout</Text>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatarImage: {
    borderRadius: 30,
    height: 60,
    width: 60
  },
  body: {
    flex: 11,
    paddingHorizontal: 20
  },
  header: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginTop: 20
  },
  inputText: {
    fontSize: 16,
    height: 30,
    textAlign: 'center'
  },
  inputView: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5
  },
  picture: {
    borderRadius: 30,
    flex: 1
  },
  pictureContainer: {
    alignSelf: 'center',
    height: 60,
    width: 60
  },
  text: {
    fontSize: 16,
    textAlign: 'center'
  },
  text0: {
    fontWeight: 'bold',
    marginTop: 30
  },
  text1: {
    fontWeight: 'bold',
    marginTop: 10
  },
});

if (Platform.OS === 'android'){
  styles.inputText = {
    fontSize: 16,
    textAlign: 'center'
  };
  styles.inputView = undefined;
}
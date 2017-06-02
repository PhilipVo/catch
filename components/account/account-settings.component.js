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
      logoutModal: false,
      passwordError: null,
      passwords: {
        confirm: '',
        current: '',
        password: ''
      },
      passwordModal: false,
      saving: false,
      settings: {
        email: '',
        tag: ''
      },
      settingsError: null
    }
  }

  updatePassword = () => {
    if (!this.state.saving) {
      this.setState({
        passwordsError: null,
        saving: true
      });

      http.put('/api/users/update-password', JSON.stringify(this.state.passwords))
        .then(() => {
          this.setState({
            passwords: {
              confirm: '',
              current: '',
              new: ''
            },
            saving: false,
          });
        }).catch(error => {
          this.setState({
            passwordError: typeof error === 'string' ? error : 'Oops, something went wrong.',
            saving: false
          });
        });
    }
  }

  updateSettings = () => {
    if (!this.state.saving) {
      this.setState({
        saving: true,
        settingsError: null
      });

      http.put('/api/users/update-settings', JSON.stringify(this.state.settings))
      then(() => this.setState({ saving: false }))
        .catch(error => {
          this.setState({
            saving: false,
            settingsError: typeof error === 'string' ? error : 'Oops, something went wrong.'
          });
        });
    }
  }

  componentDidMount() {
    http.get('/api/get-my-settings')
      .then(data => {
        this.setState({
          settings: {
            email: data.email,
            tag: data.tag
          }
        });
      }).catch(() => { })
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
                onChangeText={email => this.state.settings.email = email}
                style={styles.inputText}
                value={this.state.settings.email} />
            </View>

          </View>

          {/* Tag */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>Tagline</Text>
            <View style={styles.inputView}>
              <TextInput
                autoCapitalize='sentences'
                autoCorrect={true}
                onChangeText={tag => this.state.settings.tag = tag}
                style={styles.inputText}
                value={this.state.settings.tag} />
            </View>
          </View>

          {/* Save button */}
          <Text
            onPress={this.save}
            style={this.state.saving ? styles.saving : styles.save}>
            {this.state.saving ? 'Saving...' : 'Save'}
          </Text>

          {/* Picture */}
          <Text style={styles.text0}>Change Profile Picture</Text>

          {/* Password */}
          <Text
            onPress={() => this.setState({ passwordModal: true })}
            style={styles.text1}>Change Password</Text>

          <Modal
            transparent={true}
            visible={this.state.passwordModal}
            onRequestClose={() => { alert("Modal has been closed.") }}>
            <View>
              <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={current => this.state.passwords.current = current}
                style={styles.inputText}
                value={this.state.passwords.current} />

              <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={password => this.state.passwords.password = password}
                style={styles.inputText}
                value={this.state.passwords.password} />

              <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={confirm => this.state.passwords.confirm = confirm}
                style={styles.inputText}
                value={this.state.passwords.confirm} />
            </View>
          </Modal>

          {/* Logout */}
          <Text
            onPress={() => {
              session.logout();
              this.props.screenProps.logout();
            }}
            style={styles.text1}>Logout</Text>

          <Modal
            animationType={'slide'}
            onRequestClose={() => { alert('Modal has been closed.') }}
            transparent={false}
            visible={this.state.modalVisible}
          >
            <View style={{ marginTop: 22 }}>
              <View>
                <Text>Hello World!</Text>

                <TouchableHighlight onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight>

              </View>
            </View>
          </Modal>

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
  save: {
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 5,
    fontWeight: 'bold',
    marginTop: 20,
    padding: 10
  },
  saving: {
    fontWeight: 'bold',
    marginTop: 20,
    padding: 10
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
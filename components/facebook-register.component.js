import React, { Component } from 'react';
import {
  Button,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { LoginManager } from 'react-native-fbsdk';

import session from '../services/session.service';

module.exports = class FacebookRegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      error: null,
    };

    this.user = {
      id: this.props.navigation.state.params.id,
      username: ''
    };
  }

  cancel = () => {
    LoginManager.logOut();
    this.props.navigation.dispatch(NavigationActions.reset({
      actions: [NavigationActions.navigate({
        routeName: 'LoginComponent'
      })],
      index: 0
    }));
  }

  facebookRegister = () => {
    if (!this.state.disabled) {
      this.setState({
        disbaled: true,
        error: null
      });

      session.facebookRegister(this.user)
        .then(() => this.props.screenProps.login())
        .catch(error => {
          this.setState({
            disabled: false,
            error: typeof error === 'string' ? error : 'Oops, something went wrong.'
          });
        });

    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Image
          source={require('../images/Background.png')}
          style={styles.backgroundImage}>
          <StatusBar barStyle='light-content' hidden={false} />
          <KeyboardAvoidingView
            behavior={'padding'}
            style={styles.keyboardAvoidingView}>
            <View>
              <Text style={styles.title}>Choose a username</Text>

              {/* Username */}
              <View>
                <Text style={styles.label0}>Username</Text>
                <View style={styles.inputBorder}>
                  <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={(username) => this.user.username = username}
                    style={styles.inputText} />
                </View>
              </View>

              {/* Error*/}
              {this.state.error && <Text style={styles.error}>{this.state.error}</Text>}

              {/* Register button*/}
              <TouchableHighlight
                onPress={this.facebookRegister}
                style={styles.loginButton}
                underlayColor='#f74434'>
                <Text style={styles.buttonText}>Finish</Text>
              </TouchableHighlight>

              {/* Facebook button */}
              <Text
                onPress={this.cancel}
                style={styles.cancelText}
                underlayColor='transparent'>
                Cancel
              </Text>

            </View>
          </KeyboardAvoidingView>
        </Image>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    alignSelf: 'stretch',
    flex: 1,
    width: null
  },
  bottomText: {
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: '500',
    textAlign: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  cancelText: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 16,
    padding: 15,
    textAlign: 'right'
  },
  divider: {
    backgroundColor: 'white',
    height: 0.5,
    width: 150
  },
  error: {
    backgroundColor: 'transparent',
    color: 'red',
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center'
  },
  facebookButton: {
    alignItems: 'center',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center'
  },
  facebookView: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  forgot: {
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: '500',
    padding: 15,
    textAlign: 'right'
  },
  inputBorder: {
    borderBottomColor: 'white',
    borderBottomWidth: 0.5
  },
  inputText: {
    color: 'white',
    fontSize: 16,
    height: 30
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  label0: {
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10
  },
  label1: {
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#f74434',
    borderRadius: 5,
    height: 40,
    marginTop: 15,
    justifyContent: 'center'
  },
  or: {
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'bold'
  },
  orView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15
  },
  redTextView: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10
  },
  redText: {
    backgroundColor: 'transparent',
    color: '#f74434',
    fontWeight: '900',
    textAlign: 'center'
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: 'Palatino',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
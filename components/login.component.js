import React, { Component } from 'react';
import {
  Button,
  Dimensions,
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

import session from '../services/session.service';

module.exports = class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      error: null,
      mode: 'login'
    };

    this.user = {
      email: '',
      password: '',
      username: ''
    };
  }

  login = () => {
    if (!this.state.disabled) {
      this.setState({
        disbaled: true,
        error: null
      });

      if (this.state.mode === 'login') {
        session.login(this.user)
          .then(() => this.props.screenProps.login())
          .catch(error => {
            console.log('error', error)
            this.setState({
              disabled: false,
              error: typeof error === 'string' ? error : 'Oops, something went wrong.'
            });
          });
      } else {
        session.register(this.user)
          .then(() => this.props.screenProps.login())
          .catch(error => {
            console.log('error', error)
            this.setState({
              disabled: false,
              error: typeof error === 'string' ? error : 'Oops, something went wrong.'
            });
          });
      }
    }
  }

  toggle = () => {
    this.state.mode === 'login' ?
      this.setState({ mode: 'register' }) :
      this.setState({ mode: 'login' });
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
              <Text style={styles.title} h2>Catch</Text>

              { // Username
                this.state.mode === 'register' &&
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
              }

              {/* Email */}
              <Text style={styles.label1}>Email</Text>
              <View style={styles.inputBorder}>
                <TextInput
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='email-address'
                  onChangeText={(email) => this.user.email = email}
                  style={styles.inputText} />
              </View>

              {/* Password */}
              <Text style={styles.label1}>Password</Text>
              <View style={styles.inputBorder}>
                <TextInput
                  autoCapitalize='none'
                  autoCorrect={false}
                  onChangeText={(password) => this.user.password = password}
                  style={styles.inputText}
                  secureTextEntry={true} />
              </View>

              {/* Error*/}
              {this.state.error && <Text style={styles.error}>{this.state.error}</Text>}

              {/* Forgot password */}
              <Text style={styles.forgot}>Forgot password?</Text>

              {/* Login button*/}
              <TouchableHighlight
                onPress={this.login}
                style={styles.loginButton}
                underlayColor='rgba(0,0,0,0.2)'>
                <Text style={styles.buttonText}>
                  {this.state.mode === 'login' ? 'Login' : 'Create Account'}
                </Text>
              </TouchableHighlight>

              {/* Facebook button */}
              <TouchableHighlight
                onPress={() => { }}
                style={styles.facebookButton}
                underlayColor='rgba(0,0,0,0.2)'>
                <View style={styles.facebookView}>
                  <Icon color='white' name='facebook-official' type='font-awesome' />
                  <Text style={styles.buttonText}>
                    {this.state.mode === 'login' ? '  Login' : '  Register'} with Facebook
                  </Text>
                </View>
              </TouchableHighlight>

              {/* Bottom text */}
              <Text onPress={this.toggle} style={styles.bottomText}>
                {
                  this.state.mode === 'login' ?
                    "Don't have an account? Press here to register." :
                    "Already have an account? Press here to login."
                }
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
    paddingTop: 20,
    textAlign: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  error: {
    backgroundColor: 'transparent',
    color: 'red',
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center'
  },
  label0: {
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'bold'
  },
  label1: {
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  facebookButton: {
    alignItems: 'center',
    backgroundColor: '#3b5998',
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
  loginButton: {
    alignItems: 'center',
    backgroundColor: '#f74434',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    marginBottom: 10
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: 'Palatino',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
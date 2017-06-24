import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import session from '../services/session.service';

module.exports = class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      error: null,
      facebookLoading: false,
      isNew: false,
      loading: false,
      mode: 'login'
    };

    this.user = {
      email: '',
      password: '',
      username: ''
    };
  }

  facebookLogin = () => {
    if (!this.state.disabled) {
      this.setState({
        disbaled: true,
        error: null,
        facebookLoading: true
      });

      LoginManager.logInWithReadPermissions(['public_profile']).then(result => {
        if (result.isCancelled) this.setState({ disabled: false, facebookLoading: false });
        else {
          const infoRequest = new GraphRequest('/me', null, (error, result) => {
            if (error) throw error.toString();
            else return session.facebookLogin({ id: result.id })
              .then(isNew => {
                if (isNew === true) {
                  this.props.navigation.dispatch(NavigationActions.reset({
                    actions: [NavigationActions.navigate({
                      params: { id: result.id },
                      routeName: 'FacebookRegisterComponent'
                    })],
                    index: 0
                  }));
                } else return this.props.screenProps.login();
              }).catch(error => {
                this.setState({
                  disabled: false,
                  error: typeof error === 'string' ? error : 'Oops, something went wrong.',
                  facebookLoading: false
                });
              });
          });

          new GraphRequestManager().addRequest(infoRequest).start();
        }
      }).catch(error => {
        this.setState({
          disabled: false,
          error: typeof error === 'string' ? error : 'Oops, something went wrong.',
          facebookLoading: false
        });
      });
    }
  }

  login = () => {
    if (!this.state.disabled) {
      this.setState({
        disbaled: true,
        error: null,
        loading: true
      });

      if (this.state.mode === 'login') {
        session.login(this.user)
          .then(() => this.props.screenProps.login())
          .catch(error => {
            this.setState({
              disabled: false,
              error: typeof error === 'string' ? error : 'Oops, something went wrong.',
              loading: true
            });
          });
      } else {
        session.register(this.user)
          .then(() => this.props.screenProps.login())
          .catch(error => {
            this.setState({
              disabled: false,
              error: typeof error === 'string' ? error : 'Oops, something went wrong.',
              loading: true
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

  componentWillMount(){
    if (Platform.OS === 'android'){
      styles.inputBorder = undefined;
      styles.inputText = {
        color: 'white',
        fontSize: 16
      };
    }
  }
  render() {
    console.log('login rendering');
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
              <Text style={styles.title}>Catch</Text>

              { // Username
                this.state.mode === 'register' &&
                <View>
                  <Text style={styles.label0}>Username</Text>
                  <View style={styles.inputBorder}>
                    {/* check Android prop below on iOS */}
                    <TextInput
                      underlineColorAndroid='white'
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
                {/* check Android prop below on iOS */}
                <TextInput
                  underlineColorAndroid='white'
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='email-address'
                  onChangeText={(email) => this.user.email = email}
                  style={styles.inputText} />
              </View>

              {/* Password */}
              <Text style={styles.label1}>Password</Text>
              <View style={styles.inputBorder}>
                {/* check Android prop below on iOS */}
                <TextInput
                  underlineColorAndroid='white'
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
                disabled={this.state.disabled}
                onPress={this.login}
                style={styles.loginButton}
                underlayColor='#f74434'>
                {
                  this.state.loading ? <ActivityIndicator color='white' /> :
                    <Text style={styles.buttonText}>
                      {this.state.mode === 'login' ? 'Login' : 'Create Account'}
                    </Text>
                }
              </TouchableHighlight>

              { //  Don't have an account?
                this.state.mode === 'login' ?
                  <View style={styles.redTextView}>
                    <Text style={styles.bottomText}>Don't have an account?  </Text>
                    <Text onPress={this.toggle} style={styles.redText} underlayColor='transparent'>
                      Register.
                    </Text>
                  </View> :
                  <View style={styles.redTextView}>
                    <Text style={styles.bottomText}>Already have an account?  </Text>
                    <Text onPress={this.toggle} style={styles.redText} underlayColor='transparent'>
                      Login.
                    </Text>
                  </View>
              }

              {/* Or */}
              <View style={styles.orView}>
                <View style={styles.divider} />
                <Text style={styles.or}>   or   </Text>
                <View style={styles.divider} />
              </View>

              {/* Facebook button */}
              <TouchableHighlight
                onPress={this.facebookLogin}
                style={styles.facebookButton}
                underlayColor='transparent'>
                <View style={styles.facebookView}>
                  {
                    this.state.facebookLoading ? <ActivityIndicator color='white' /> :
                      <Icon color='white' name='facebook-official' type='font-awesome' />
                  }
                  <Text style={styles.buttonText}>  Continue with Facebook</Text>
                </View>
              </TouchableHighlight>

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
    fontWeight: 'bold'
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
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
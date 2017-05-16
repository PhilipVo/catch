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
      error: null
    };

    this.user = {
      email: '',
      password: '',
      confirm: 'confirm'
    };
  }

  login = () => {
    this.props.screenProps.login();
    // const resetAction = NavigationActions.reset({
    //   actions: [
    //     NavigationActions.navigate({ routeName: 'NavigatorComponent' })
    //   ],
    //   index: 0
    // })

    // this.props.navigation.dispatch(resetAction);

    // if (!this.state.disabled) {
    //   this.setState({
    //     disabled: true,
    //     error: null
    //   });

    //   session.login(this.user)
    //     .then(() => this.props.navigation.reset( 'MainComponent' ))
    //     .catch(error => {
    //       if (typeof error !== 'string')
    //         error = 'Error encountered.';

    //       this.setState({
    //         disabled: false,
    //         error: error
    //       });
    //     });
    // }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Image
          source={require('../images/Background.png')}
          style={styles.backgroundImage}>
          <KeyboardAvoidingView
            behavior={'padding'}
            style={styles.keyboardAvoidingView}>
            <View>
              <Text style={styles.title} h2>Catch</Text>

              {/* Email */}
              <Text style={styles.emailLabel}>Email</Text>
              <View style={styles.inputBorder}>
                <TextInput
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='email-address'
                  onChangeText={(email) => this.user.email = email}
                  style={styles.inputText} />
              </View>

              {/* Password */}
              <Text style={styles.passwordLabel}>Password</Text>
              <View style={styles.inputBorder}>
                <TextInput
                  autoCapitalize='none'
                  autoCorrect={false}
                  onChangeText={(password) => this.user.password = password}
                  style={styles.inputText}
                  secureTextEntry={true} />
              </View>

              {/* Forgot password */}
              <Text style={styles.forgot}>Forgot password?</Text>
              {this.state.error && <Text>{this.state.error}</Text>}

              {/* Login button*/}
              <TouchableHighlight
                onPress={this.login}
                style={styles.loginButton}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableHighlight>

              {/* Facebook button */}
              <TouchableHighlight
                onPress={this.login}
                style={styles.facebookButton}>
                <View style={styles.facebookView}>
                  <Icon color='white' name='facebook-official' type='font-awesome' />
                  <Text style={styles.buttonText}>  Login with Facebook</Text>
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
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  emailLabel: {
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'bold'
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
  passwordLabel: {
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: 'Zapfino',
    fontSize: 40,
    textAlign: 'center'
  }
});
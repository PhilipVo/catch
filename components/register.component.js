import React, { Component } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import {
  Button,
  FormInput,
  FormLabel,
  FormValidationMessage,
  Text
} from 'react-native-elements';

import session from '../services/session.service';

module.exports = class RegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      error: null
    };

    this.user = {
      confirm: 'confirm',
      email: '',
      password: '',
      username: ''
    };
  }

  register = () => {
    if (!this.state.disabled) {
      this.setState({
        disabled: true,
        error: null
      });

      session.register(this.user)
        .then(() => this.props.navigator.resetTo({ component: 'MainComponent' }))
        .catch(error => {
          if (typeof error !== 'string')
            error = 'Error encountered.';

          this.setState({
            disabled: false,
            error: error
          });
        });
    }
  }

  render() {
    console.ignoredYellowBox = ['Warning: You are manually'];
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView style={styles.keyboardAvoidingView}
          behavior={'padding'}>
          <Text style={{ textAlign: 'center' }} h2>Catch</Text>
          <FormLabel>Username</FormLabel>
          <FormInput
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(username) => this.user.username = username} />
          <FormLabel>Email</FormLabel>
          <FormInput
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='email-address'
            onChangeText={(email) => this.user.email = email} />
          <FormLabel>Password</FormLabel>
          <FormInput
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(password) => this.user.password = password}
            secureTextEntry={true} />
          {this.state.error &&
            <FormValidationMessage labelStyle={{ textAlign: 'center' }}>
              {this.state.error}
            </FormValidationMessage>}
          <Button
            buttonStyle={{ marginTop: 10 }}
            backgroundColor='red'
            onPress={this.register}
            small
            title='Create Account' />
          <Button
            buttonStyle={{ marginTop: 10 }}
            backgroundColor='blue'
            icon={{ name: 'facebook-official', type: 'font-awesome' }}
            onPress={() => this.props.navigator.resetTo({ component: 'LoginComponent' })}
            small
            title='Login with Facebook' />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center'
  }
});
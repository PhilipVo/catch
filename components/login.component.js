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
import { NavigationActions } from 'react-navigation';

import session from '../services/session.service';

export default class LoginComponent extends Component {
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
    const resetAction = NavigationActions.reset({
      actions: [
        NavigationActions.navigate({ routeName: 'NavigatorComponent' })
      ],
      index: 0
    })

    this.props.navigation.dispatch(resetAction);

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
        <KeyboardAvoidingView
          behavior={'padding'}
          style={styles.keyboardAvoidingView}>
          <Text style={{ textAlign: 'center' }} h2>Catch</Text>
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
            backgroundColor='black'
            buttonStyle={{ marginTop: 10 }}
            onPress={this.login}
            small
            title='Login' />
          <Button
            backgroundColor='blue'
            buttonStyle={{ marginTop: 10 }}
            icon={{ name: 'facebook-official', type: 'font-awesome' }}
            onPress={() => this.props.navigation.reset('RegisterComponent')}
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
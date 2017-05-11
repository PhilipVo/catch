import React, { Component } from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';

import session from './services/session.service';

export default class Catch extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  componentWillMount() {
    AsyncStorage.getItem('catchToken')
      .then(catchToken => {
        if (catchToken) {
          session.setSession(catchToken);
          this.setState({ isLoggedIn: true });
        } else
          this.setState({ isLoggedIn: false });
      })
      .catch(error => console.log(error));
  }

  render() {
    console.ignoredYellowBox = [
      'Warning: BackAndroid',
      'Warning: View.propTypes',
      'Warning: Invalid argument supplied to oneOf'
    ];

    let Navigator;
    // Conditionally load components ('lazy loading'):
    if (this.state.isLoggedIn) {
      const AccountNavigatorComponent = require('./components/account/account-navigator.component');
      const CreateNavigatorComponent = require('./components/create/create-navigator.component');
      const FeedNavigatorComponent = require('./components/feed/feed-navigator.component');

      Navigator = require('react-navigation').TabNavigator(
        {
          AccountNavigatorComponent: { screen: AccountNavigatorComponent },
          CreateNavigatorComponent: { screen: CreateNavigatorComponent },
          FeedNavigatorComponent: { screen: FeedNavigatorComponent },
        },
        {
          headerMode: 'none',
          initialRouteName: 'FeedNavigatorComponent',
          navigationOptions: { tabBarVisible: false }
        });
    } else {
      const LoginComponent = require('./components/login.component');
      const RegisterComponent = require('./components/register.component');
      const WelcomeComponent = require('./components/welcome.component');

      Navigator = require('react-navigation').StackNavigator(
        {
          LoginComponent: { screen: LoginComponent },
          RegisterComponent: { screen: RegisterComponent },
          WelcomeComponent: { screen: WelcomeComponent }
        },
        {
          headerMode: 'none'
        });
    }

    return (
      this.state.isLoggedIn ?
        <Navigator screenProps={{ logout: () => this.setState({ isLoggedIn: false }) }} /> :
        <Navigator screenProps={{ login: () => this.setState({ isLoggedIn: true }) }} />
    );
  }
}


AppRegistry.registerComponent('Catch', () => Catch);

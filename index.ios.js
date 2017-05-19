import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, Image } from 'react-native';

import session from './services/session.service';

export default class Catch extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: undefined };
  }

  componentWillMount() {
    AsyncStorage.getItem('catchToken')
      .then(catchToken => {
        if (catchToken) {
          session.setSession(catchToken)
            .then(() => this.setState({ isLoggedIn: true }))
            .catch(error => { });
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
    if (this.state.isLoggedIn === true) {
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
    } else if (this.state.isLoggedIn === false) {
      const LoginComponent = require('./components/login.component');

      Navigator = require('react-navigation').StackNavigator(
        {
          LoginComponent: { screen: LoginComponent },
        },
        {
          cardStyle: { backgroundColor: 'white' },
          headerMode: 'none'
        });
    }

    return (
      this.state.isLoggedIn === true ?
        <Navigator screenProps={{ logout: () => this.setState({ isLoggedIn: false }) }} /> :
        this.state.isLoggedIn === false ?
          <Navigator screenProps={{ login: () => this.setState({ isLoggedIn: true }) }} /> :
          <Image style={{ flex: 1, width: null }} source={require('./images/splash.png')} />
    );
  }
}

AppRegistry.registerComponent('Catch', () => Catch);

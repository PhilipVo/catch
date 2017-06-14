import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, Image } from 'react-native';

import session from './services/session.service';

console.ignoredYellowBox = [
  'Warning: BackAndroid',
  'Warning: View.propTypes',
  'Warning: Invalid argument supplied to oneOf'
];

export default class Catch extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: undefined };
  }

  componentDidMount() {
    AsyncStorage.getItem('catchToken')
      .then(catchToken => {
        if (catchToken) {
          session.setSession(catchToken)
            .then(() => this.setState({ isLoggedIn: true }))
            .catch(() => { });
        } else
          this.setState({ isLoggedIn: false });
      })
      .catch(() => { });
  }

  componentWillUpdate(nextProps, nextState) {
    // Conditionally load components ('lazy loading'):
    if (nextState.isLoggedIn === true) {
      const AccountNavigatorComponent = require('./components/account/account-navigator.component');
      const CreateNavigatorComponent = require('./components/create/create-navigator.component');
      const FeedNavigatorComponent = require('./components/feed/feed-navigator.component');

      this.Navigator = require('react-navigation').TabNavigator(
        {
          AccountNavigatorComponent: { screen: AccountNavigatorComponent },
          CreateNavigatorComponent: { screen: CreateNavigatorComponent },
          FeedNavigatorComponent: { screen: FeedNavigatorComponent },
        },
        {
          headerMode: 'none',
          initialRouteName: 'FeedNavigatorComponent',
          navigationOptions: { tabBarVisible: false }
        }
      );

      this.screenProps = { logout: () => this.setState({ isLoggedIn: false }) };
    } else if (nextState.isLoggedIn === false) {
      const LoginComponent = require('./components/login.component');

      this.Navigator = require('react-navigation').StackNavigator(
        {
          LoginComponent: { screen: LoginComponent },
        },
        {
          cardStyle: { backgroundColor: 'white' },
          headerMode: 'none'
        }
      );

      this.screenProps = { login: () => this.setState({ isLoggedIn: true }) };
    }
  }

  render() {
    return (
      this.state.isLoggedIn === true ?
        <this.Navigator screenProps={this.screenProps} /> :
        this.state.isLoggedIn === false ?
          <this.Navigator screenProps={this.screenProps} /> :
          <Image style={{ flex: 1, width: null }} source={require('./images/splash.png')} />
    );
  }
}

AppRegistry.registerComponent('Catch', () => Catch);

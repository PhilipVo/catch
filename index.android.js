import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, Image } from 'react-native';

import session from './services/session.service';

console.ignoredYellowBox = [
  'Warning: Accessing',
  'Warning: BackAndroid',
  'Warning: checkPropTypes',
  'Warning: View.propTypes',
  'Warning: Invalid argument supplied to oneOf'
];

export default class Catchx extends Component {
  constructor(props) {
    super(props);

    // Modes:
    // 0 - loading
    // 1 - logged in
    // 2 - logged out
    // 3 - new user
    this.state = { mode: 0 };
  }

  componentDidMount() {
    AsyncStorage.getItem('catchToken')
      .then(catchToken => {
        if (catchToken) {
          session.setSession(catchToken)
            .then(() => this.setState({ mode: 1 }))
            .catch(() => { });
        } else
          this.setState({ mode: 2 });
      }).catch(() => { });
  }

  componentWillUpdate(nextProps, nextState) {
    // Conditionally load components ('lazy loading'):
    if (nextState.mode === 1) {
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

      this.screenProps = { logout: () => this.setState({ mode: 2 }) };
    } else if (nextState.mode === 2) {
      const FacebookRegisterComponent = require('./components/facebook-register.component');
      const LoginComponent = require('./components/login.component');

      this.Navigator = require('react-navigation').StackNavigator(
        {
          FacebookRegisterComponent: { screen: FacebookRegisterComponent },
          LoginComponent: { screen: LoginComponent }
        },
        {
          cardStyle: { backgroundColor: 'white' },
          headerMode: 'none',
          initialRouteName: 'LoginComponent'
        }
      );

      this.screenProps = {
        login: () => this.setState({ mode: 1 }),
        register: () => this.setState({ mode: 3 })
      };
    } else if (nextState.mode === 3) {
      const FTUEComponent = require('./components/ftue.component');

      this.Navigator = require('react-navigation').StackNavigator(
        {
          FTUEComponent: { screen: FTUEComponent },
        },
        {
          cardStyle: { backgroundColor: 'white' },
          headerMode: 'none',
          initialRouteName: 'FTUEComponent'
        }
      );

      this.screenProps = { login: () => this.setState({ mode: 1 }) };
    }
  }

  render() {
    return (
      this.state.mode === 0 ?
        <Image style={{ flex: 1, width: null }} source={require('./images/splash.png')} /> :
        <this.Navigator screenProps={this.screenProps} />
    );
  }
}

AppRegistry.registerComponent('Catchx', () => Catchx);

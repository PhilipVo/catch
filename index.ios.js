import React, { Component } from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LoginComponent from './components/login.component';
import NavigatorComponent from './components/navigator.component';
import RegisterComponent from './components/register.component';
import WelcomeComponent from './components/welcome.component';

import session from './services/session.service';

export default class Catch extends Component {
  constructor() {
    super();
    this.state = { initialComponent: 'LoginComponent' };
  }

  // componentDidMount() {
  //   AsyncStorage.getItem('catchToken')
  //     .then(catchToken => {
  //       if (catchToken) {
  //         session.setSession(catchToken);
  //         this.setState({ initialComponent: 'NavigatorComponent' });
  //       } else
  //         this.setState({ initialComponent: 'LoginComponent' });
  //     })
  //     .catch(error => console.log(error));
  // }

  render() {
    console.ignoredYellowBox = ['Warning: BackAndroid'];

    const Navigator = StackNavigator(
      {
        LoginComponent: { screen: LoginComponent },
        NavigatorComponent: { screen: NavigatorComponent },
        RegisterComponent: { screen: RegisterComponent },
        WelcomeComponent: { screen: WelcomeComponent }
      },
      {
        headerMode: 'none'
      }
    );

    return (
      this.state.initialComponent ? <Navigator /> : <NavigatorComponent />
    );
  }
}


AppRegistry.registerComponent('Catch', () => Catch);

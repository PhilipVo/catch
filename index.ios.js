import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  Navigator
} from 'react-native';

import LoginComponent from './components/login.component';
import NavigatorComponent from './components/navigator.component';
import RegisterComponent from './components/register.component';
import WelcomeComponent from './components/welcome.component';

import session from './services/session.service';

export default class Catch extends Component {
  constructor() {
    super();
    this.state = { initialComponent: null };
  }

  componentDidMount() {
    AsyncStorage.getItem('catchToken')
      .then(catchToken => {
        if (catchToken) {
          session.setSession(catchToken);
          this.setState({ initialComponent: 'NavigatorComponent' });
        }
      })
      .catch(error => console.log(error));
  }

  renderScene(route, navigator) {
    switch (route.component) {
      case 'LoginComponent': return <LoginComponent navigator={navigator} />
      case 'NavigatorComponent': return <NavigatorComponent navigator={navigator} />
      case 'RegisterComponent': return <RegisterComponent navigator={navigator} />
      case 'WelcomeComponent': return <WelcomeComponent navigator={navigator} />
    }
  }

  render() {
    return (
      this.state.initialComponent ?
        <Navigator
          initialRoute={{ component: this.state.initialComponent }}
          renderScene={(route, navigator) => this.renderScene(route, navigator)}
          configureScene={(route, routeStack) => Navigator.SceneConfigs.FadeAndroid}
        /> :
        <NavigatorComponent />
    );
  }
}

AppRegistry.registerComponent('Catch', () => Catch);

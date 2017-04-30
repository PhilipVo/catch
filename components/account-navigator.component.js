import React, { Component } from 'react';
import { Navigator } from 'react-native';

import AccountComponent from './account.component';
import AccountPictureComponent from './account-picture.component';
import AccountSettingsComponent from './account-settings.component';

export default class AccountNavigatorComponent extends Component {
  configureScene(route, routeStack) {
    // if (route.component === 'AvatarComponent')
    // return Navigator.SceneConfigs.SwipeFromLeft;

    return {
      animationInterpolators: {
        into: r => r.opacity = 1,
        out: r => r.opacity = 1,
      },
      defaultTransitionVelocity: null,
      gestures: null,
      springFriction: null,
      springTension: 20000
    };
  }

  renderScene(route, navigator) {
    switch (route.component) {
      case 'AccountComponent':
        return <AccountComponent
          mainNavigator={this.props.navigator}
          navigator={navigator} />
      case 'AccountPictureComponent':
        return <AccountPictureComponent
          mainNavigator={this.props.navigator}
          navigator={navigator} />
      case 'AccountSettingsComponent':
        return <AccountSettingsComponent
          mainNavigator={this.props.navigator}
          navigator={navigator} />
      default:
        return <AccountComponent
          mainNavigator={this.props.navigator}
          navigator={navigator} />
    };
  }

  render() {
    return (
      <Navigator
        configureScene={this.configureScene}
        initialRoute={{ component: 'AccountComponent' }}
        renderScene={this.renderScene}
      />
    );
  }
}
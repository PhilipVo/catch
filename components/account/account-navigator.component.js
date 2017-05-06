import React, { Component } from 'react';
import { Navigator } from 'react-native';

import AccountComponent from './account.component';
import AccountPictureComponent from './account-picture.component';
import AccountSettingsComponent from './account-settings.component';

export default class AccountNavigatorComponent extends Component {
  configureScene(route, routeStack) {
    if (route.component === 'AccountPictureComponent' ||
      route.component === 'AccountSettingsComponent')
      return Navigator.SceneConfigs.HorizontalSwipeJump;

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

  renderScene = (route, accountNavigator) => {
    switch (route.component) {
      case 'AccountComponent':
        return <AccountComponent
          navigator={this.props.navigator}
          accountNavigator={accountNavigator} />
      case 'AccountPictureComponent':
        return <AccountPictureComponent
          navigator={this.props.navigator}
          accountNavigator={accountNavigator} />
      case 'AccountSettingsComponent':
        return <AccountSettingsComponent
          navigator={this.props.navigator}
          accountNavigator={accountNavigator} />
      default:
        return <AccountComponent
          navigator={this.props.navigator}
          accountNavigator={accountNavigator} />
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
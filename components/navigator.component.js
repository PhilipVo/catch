import React, { Component } from 'react';
import { Navigator } from 'react-native';

import AccountNavigatorComponent from './account/account-navigator.component';
import CreateNavigatorComponent from './create/create-navigator.component';
import FeedNavigatorComponent from './feed/feed-navigator.component';

export default class NavigatorComponent extends Component {
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
      case 'AccountNavigatorComponent':
        return <AccountNavigatorComponent navigator={navigator} />
      case 'CreateNavigatorComponent':
        return <CreateNavigatorComponent navigator={navigator} />
      case 'FeedNavigatorComponent':
        return <FeedNavigatorComponent navigator={navigator} />
      default:
        return <FeedNavigatorComponent navigator={navigator} />
    };
  }

  render() {
    const initialRouteStack = [
      { component: 'AccountNavigatorComponent' },
      { component: 'CreateNavigatorComponent' },
      { component: 'FeedNavigatorComponent' }
    ];

    return (
      <Navigator
        configureScene={this.configureScene}
        initialRouteStack={initialRouteStack}
        renderScene={this.renderScene}
      />
    );
  }
}
import React, { Component } from 'react';
import { Navigator } from 'react-native';

import FeedComponent from './feed.component';
import ProfileComponent from '../common/profile.component';

export default class FeedNavigatorComponent extends Component {
  configureScene(route, routeStack) {
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

  renderScene = (route, feedNavigator) => {
    switch (route.component) {
      case 'FeedComponent':
        return <FeedComponent
          feedNavigator={feedNavigator}
          navigator={this.props.navigator} />
      case 'ProfileComponent':
        return <ProfileComponent
          _navigator={feedNavigator}
          navigator={this.props.navigator}
          tabComponent={route.tabComponent}
          user={route.user} />
      default:
        return <FeedComponent
          feedNavigator={feedNavigator}
          navigator={this.props.navigator} />
    };
  }

  render() {
    return (
      <Navigator
        configureScene={this.configureScene}
        initialRoute={{ component: 'FeedComponent' }}
        renderScene={this.renderScene}
      />
    );
  }
}
import React, { Component } from 'react';
import { Navigator } from 'react-native';

import CreateComponent from './create.component';
import FeedComponent from './feed.component';
import ProfileComponent from './profile.component';

export default class MainComponent extends Component {
  configureScene(route, routeStack) {
    return {
      gestures: null,
      defaultTransitionVelocity: null,
      springFriction: null,
      springTension: 20000,
      animationInterpolators: {
        into: r => r.opacity = 1,
        out: r => r.opacity = 1,
      }
    };
  }

  renderScene(route, navigator) {
    switch (route.component) {
      case 'CreateComponent': return <CreateComponent navigator={navigator} />
      case 'FeedComponent': return <FeedComponent navigator={navigator} />
      case 'ProfileComponent': return <ProfileComponent navigator={navigator} />
      default: return <FeedComponent navigator={navigator} />
    }
  }

  render() {
    const initialRouteStack = [
      { component: 'ProfileComponent' },
      { component: 'CreateComponent' },
      { component: 'FeedComponent' }
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
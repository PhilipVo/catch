import React, { Component } from 'react';
import { Navigator } from 'react-native';

import FeedComponent from './feed.component';

export default class FeedNavigatorComponent extends Component {
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

  renderScene = (route, navigator) => {
    switch (route.component) {
      case 'FeedComponent':
        return <FeedComponent
          mainNavigator={this.props.navigator}
          navigator={navigator} />
      default:
        return <FeedComponent
          mainNavigator={this.props.navigator}
          navigator={navigator} />
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
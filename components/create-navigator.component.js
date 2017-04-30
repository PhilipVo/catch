import React, { Component } from 'react';
import { Navigator } from 'react-native';

import CreateComponent from './create.component';

export default class CreateNavigatorComponent extends Component {
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
      case 'CreateComponent':
        return <CreateComponent navigator={navigator} />
      default:
        return <CreateComponent navigator={navigator} />
    };
  }

  render() {
    return (
      <Navigator
        configureScene={this.configureScene}
        initialRoute={{ component: 'CreateComponent' }}
        renderScene={this.renderScene}
      />
    );
  }
}
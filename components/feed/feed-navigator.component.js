import React, { Component } from 'react';
import { Navigator } from 'react-native';

import FeedComponent from './feed.component';
import StoryComponent from '../common/story.component';

export default class FeedNavigatorComponent extends Component {
  configureScene(route, routeStack) {
    if (route.component === 'StoryComponent')
      return Navigator.SceneConfigs.VerticalUpSwipeJump;

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
      case 'StoryComponent':
        return <StoryComponent
          feedNavigator={feedNavigator}
          selected={route.selected} />
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
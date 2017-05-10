import React, { Component } from 'react';
// import { Navigator } from 'react-native';
import { TabNavigator } from 'react-navigation';

import AccountNavigatorComponent from './account/account-navigator.component';
import CreateNavigatorComponent from './create/create-navigator.component';
import FeedNavigatorComponent from './feed/feed-navigator.component';
import TabComponent from './common/tab.component';

export default class NavigatorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'feed'
    };
  }

  componentDidMount() {
    console.log('routestack:', this.refs.navigator.getCurrentRoutes())
  }

  configureScene(route, routeStack) {
    // if (route.component === 'AvatarComponent')
    // return Navigator.SceneConfigs.SwipeFromLeft;

    console.log('routestack', routeStack)

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
    console.log('renderscene', navigator.getCurrentRoutes())
    console.log('rendering component:', route.component)
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

    return TabNavigator({
      AccountNavigatorComponent: { screen: AccountNavigatorComponent },
      CreateNavigatorComponent: { screen: CreateNavigatorComponent },
      FeedNavigatorComponent: { screen: FeedNavigatorComponent },
    });

  }
}
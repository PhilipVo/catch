import React, { Component } from 'react';
import { Text } from 'react-native';
import { TabNavigator } from 'react-navigation';

import AccountNavigatorComponent from './account/account-navigator.component';
import CreateNavigatorComponent from './create/create-navigator.component';
import FeedNavigatorComponent from './feed/feed-navigator.component';
import TabComponent from './common/tab.component';

class HiComponent extends Component {
  static navigationOptions = {
    title: 'Home',
    tabBarVisible: false
  };

  render() {
    return (
      <Text>Hi</Text>
    );
  }
}

class ByeComponent extends Component {
  static navigationOptions = {
    tabBarLabel: 'Bye'
  }

  render() {
    return (
      <Text>Bye</Text>
    );
  }
}

// export default class NavigatorComponent extends Component {
//   // constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     tab: 'feed'
//   //   };
//   // }

//   // componentDidMount() {
//   //   console.log('routestack:', this.refs.navigator.getCurrentRoutes())
//   // }

//   // configureScene(route, routeStack) {
//   //   // if (route.component === 'AvatarComponent')
//   //   // return Navigator.SceneConfigs.SwipeFromLeft;

//   //   console.log('routestack', routeStack)

//   //   return {
//   //     animationInterpolators: {
//   //       into: r => r.opacity = 1,
//   //       out: r => r.opacity = 1,
//   //     },
//   //     defaultTransitionVelocity: null,
//   //     gestures: null,
//   //     springFriction: null,
//   //     springTension: 20000
//   //   };
//   // }

//   // renderScene(route, navigator) {
//   //   console.log('renderscene', navigator.getCurrentRoutes())
//   //   console.log('rendering component:', route.component)
//   //   switch (route.component) {
//   //     case 'AccountNavigatorComponent':
//   //       return <AccountNavigatorComponent navigator={navigator} />
//   //     case 'CreateNavigatorComponent':
//   //       return <CreateNavigatorComponent navigator={navigator} />
//   //     case 'FeedNavigatorComponent':
//   //       return <FeedNavigatorComponent navigator={navigator} />
//   //     default:
//   //       return <FeedNavigatorComponent navigator={navigator} />
//   //   };
//   // }

//   render() {
//     const initialRouteStack = [
//       { component: 'AccountNavigatorComponent' },
//       { component: 'CreateNavigatorComponent' },
//       { component: 'FeedNavigatorComponent' }
//     ];

//     return TabNavigator({
//       HiComponent: { screen: HiComponent },
//       // CreateNavigatorComponent: { screen: CreateNavigatorComponent },
//       // FeedNavigatorComponent: { screen: FeedNavigatorComponent },
//     });

//   }
// }

export default TabNavigator({
  FeedNavigatorComponent: { screen: FeedNavigatorComponent },
  CreateNavigatorComponent: { screen: CreateNavigatorComponent },
  AccountNavigatorComponent: { screen: AccountNavigatorComponent },
}, {
    headerMode: 'none',
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      showLabel: false
    },
    navigationOptions: {
      tabBarVisible: false

    }
  });
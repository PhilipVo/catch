import React, { Component } from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import FeedComponent from './feed.component';
import ProfileComponent from '../common/profile.component';

module.exports = class FeedNavigatorComponent extends Component {
  render() {
    const FeedNavigator = StackNavigator(
      {
        FeedComponent: { screen: FeedComponent },
        ProfileComponent: { screen: ProfileComponent }
      },
      {
        cardStyle: { backgroundColor: 'white' },
        headerMode: 'none',
        initialRouteName: 'FeedComponent'
      }
    );

    return (
      <FeedNavigator
        ref={nav => this.navigator = nav}
        screenProps={{
          navigate: this.props.navigation.navigate,
          reset: () => this.navigator.dispatch(NavigationActions.reset({
            actions: [NavigationActions.navigate({ routeName: 'FeedComponent' })],
            index: 0
          }))
        }} />
    );
  }
}
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import FeedComponent from './feed.component';
import ProfileComponent from '../common/profile.component';

module.exports = class FeedNavigatorComponent extends Component {
  render() {
    const FeedNavigator = StackNavigator({
      FeedComponent: { screen: FeedComponent },
      ProfileComponent: { screen: ProfileComponent }
    }, {
        headerMode: 'none'
      });

    return (
      <FeedNavigator screenProps={{ navigate: this.props.navigation.navigate }} />
    );
  }
}


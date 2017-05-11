import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

import AccountComponent from './account.component';
import AccountPictureComponent from './account-picture.component';
import AccountSettingsComponent from './account-settings.component';

module.exports = class AccountNavigatorComponent extends Component {
  render() {
    const AccountNavigator = StackNavigator(
      {
        AccountComponent: { screen: AccountComponent }
      }, {
        headerMode: 'none'
      });

    return (
      <AccountNavigator screenProps={{ navigate: this.props.navigation.navigate }} />
    );
  }
}
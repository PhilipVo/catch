import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

import AccountComponent from './account.component';
import AccountPictureComponent from './account-picture.component';
import AccountSettingsComponent from './account-settings.component';
import ProfileComponent from '../common/profile.component';

module.exports = class AccountNavigatorComponent extends Component {
  render() {
    const AccountNavigator = StackNavigator(
      {
        AccountComponent: { screen: AccountComponent },
        AccountPictureComponent: { screen: AccountPictureComponent },
        AccountSettingsComponent: { screen: AccountSettingsComponent },
        ProfileComponent: { screen: ProfileComponent }
      },
      {
        cardStyle: { backgroundColor: 'white' },
        headerMode: 'none',
        initialRouteName: 'AccountComponent'
      }
    );

    return (
      <AccountNavigator
        screenProps={{
          logout: this.props.screenProps.logout,
          navigate: this.props.navigation.navigate
        }} />
    );
  }
}
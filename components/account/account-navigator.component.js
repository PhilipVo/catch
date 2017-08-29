import React, { Component } from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';

import AccountComponent from './account.component';
import AccountPictureComponent from './account-picture.component';
import AccountSettingsComponent from './account-settings.component';
import ProfileComponent from '../common/profile.component';
import TabComponent from '../common/tab.component';

module.exports = class AccountNavigatorComponent extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <AccountNavigator
        ref={nav => this.navigator = nav}
        screenProps={{
          logout: this.props.screenProps.logout,
          navigate: this.props.navigation.navigate,
          tabComponent: <TabComponent
            navigate={this.props.navigation.navigate}
            reset={() => this.navigator.dispatch(NavigationActions.reset({
              actions: [NavigationActions.navigate({ routeName: 'AccountComponent' })],
              index: 0
            }))}
            tab='account' />
        }} />
    );
  }
}

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
import React, { Component } from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';

import AccountComponent from './account.component';
import AccountFriendsComponent from './account-friends.component';
import AccountPictureComponent from './account-picture.component';
import AccountSettingsComponent from './account-settings.component';
import ProfileComponent from '../common/profile.component';

import navigation from '../../services/navigation.service';

module.exports = class AccountNavigatorComponent extends Component {
	componentDidMount() {
		navigation._navigate = this.props.navigation.navigate;

		navigation.resetAccount = () => {
			this.navigator.dispatch(NavigationActions.reset({
				actions: [NavigationActions.navigate({ routeName: 'AccountComponent' })],
				index: 0
			}));
		};
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<AccountNavigator ref={nav => this.navigator = nav} />
		);
	}
}

const AccountNavigator = StackNavigator(
	{
		AccountComponent: { screen: AccountComponent },
		AccountFriendsComponent: { screen: AccountFriendsComponent },
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
import React, { Component } from 'react';
import { NavigationActions, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import FeedComponent from './feed.component';
import ProfileComponent from '../common/profile.component';
import TabComponent from '../common/tab.component';

import ResetService from '../../services/reset.service';

module.exports = class FeedNavigatorComponent extends Component {
	componentDidMount() {
		ResetService.resetFeed = this.reset;
	}

	shouldComponentUpdate() {
		return false;
	}

	reset = () => this.navigator.dispatch(NavigationActions.reset({
		actions: [NavigationActions.navigate({ routeName: 'FeedComponent' })],
		index: 0
	}));

	render() {
		return (
			<FeedNavigator
				ref={nav => this.navigator = nav}
				screenProps={{
					logout: this.props.screenProps.logout,
					navigate: this.props.navigation.navigate,
					tabComponent: <TabComponent
						navigate={this.props.navigation.navigate}
						reset={this.reset}
						tab='feed' />
				}} />
		);
	}
}

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